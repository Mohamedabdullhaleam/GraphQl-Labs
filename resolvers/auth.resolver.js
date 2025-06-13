import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import Member from "../models/member.model.js";

const JWT_SECRET =
  "8cc8ebf6cd10c1f34f273d6b83d803e46bf3aa1754ef2227a36904afa4ca819d";

export const authResolvers = {
  Query: {
    me: async (_, __, { req }) => {
      console.log("=== Me Resolver Start ===");
      console.log("Request context:", req);
      console.log("User from request:", req.user);

      if (!req.user) {
        console.log("No user found in request context");
        throw new Error("Not authenticated");
      }

      try {
        const member = await Member.findById(req.user.memberId);
        console.log("Found member:", member);

        if (!member) {
          console.log("Member not found in database");
          throw new Error("Member not found");
        }

        console.log("=== Me Resolver End Success ===");
        return member;
      } catch (error) {
        console.error("Error in me resolver:", error);
        console.log("=== Me Resolver End with Error ===");
        throw new Error("Error fetching current member: " + error.message);
      }
    },
  },
  Mutation: {
    registerMember: async (_, { name, email, password }) => {
      try {
        const existingMember = await Member.findOne({ email });
        if (existingMember) {
          throw new Error("Email already registered");
        }

        const membershipNumber = `MEM${Date.now()}`;

        const hashedPassword = await bcrypt.hash(password, 10);

        const newMember = new Member({
          name,
          email,
          password: hashedPassword,
          membershipNumber,
          joinDate: new Date(),
        });

        const savedMember = await newMember.save();

        // Generate JWT token
        const token = jwt.sign({ memberId: savedMember._id }, JWT_SECRET, {
          expiresIn: "24h",
        });

        return {
          token,
          member: savedMember,
        };
      } catch (error) {
        throw new Error("Error registering member: " + error.message);
      }
    },

    login: async (_, { email, password }) => {
      try {
        // Find member
        const foundMember = await Member.findOne({ email });
        if (!foundMember) {
          throw new Error("Member not found");
        }

        // Verify password
        const validPassword = await bcrypt.compare(
          password,
          foundMember.password
        );
        if (!validPassword) {
          throw new Error("Invalid password");
        }

        // Generate JWT token
        const token = jwt.sign({ memberId: foundMember._id }, JWT_SECRET, {
          expiresIn: "24h",
        });

        return {
          token,
          member: foundMember,
        };
      } catch (error) {
        throw new Error("Error logging in: " + error.message);
      }
    },
  },
};
