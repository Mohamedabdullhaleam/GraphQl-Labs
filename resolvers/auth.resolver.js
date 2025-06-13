import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import Member from "../models/member.model.js";

const JWT_SECRET =
  "8cc8ebf6cd10c1f34f273d6b83d803e46bf3aa1754ef2227a36904afa4ca819d";

export const authResolvers = {
  Mutation: {
    registerMember: async (_, { name, email, password }) => {
      try {
        const existingMember = await Member.findOne({ email });
        if (existingMember) {
          throw new Error("Email already registered");
        }

        const membershipNumber = `MEM${Date.now()}`;

        const hashedPassword = await bcrypt.hash(password, 10);

        const member = new Member({
          name,
          email,
          password: hashedPassword,
          membershipNumber,
          joinDate: new Date(),
        });

        const savedMember = await member.save();

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
        const member = await Member.findOne({ email });
        if (!member) {
          throw new Error("Member not found");
        }

        // Verify password
        const validPassword = await bcrypt.compare(password, member.password);
        if (!validPassword) {
          throw new Error("Invalid password");
        }

        // Generate JWT token
        const token = jwt.sign({ memberId: member._id }, JWT_SECRET, {
          expiresIn: "24h",
        });

        return {
          token,
          member,
        };
      } catch (error) {
        throw new Error("Error logging in: " + error.message);
      }
    },
  },
};
