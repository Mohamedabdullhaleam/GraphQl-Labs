import Member from "../models/member.model.js";

export const memberResolvers = {
  Query: {
    getMembers: async () => {
      try {
        const members = await Member.find();
        return members;
      } catch (error) {
        throw new Error("Error fetching members: " + error.message);
      }
    },
    getMember: async (_, { id }) => {
      try {
        const member = await Member.findById(id);
        if (!member) {
          throw new Error("Member not found");
        }
        return member;
      } catch (error) {
        throw new Error("Error fetching member: " + error.message);
      }
    },
  },
};
