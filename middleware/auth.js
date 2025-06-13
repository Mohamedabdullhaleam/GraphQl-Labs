import jwt from "jsonwebtoken";

const JWT_SECRET =
  "8cc8ebf6cd10c1f34f273d6b83d803e46bf3aa1754ef2227a36904afa4ca819d";

export const authMiddleware = {
  async authMiddleware({ req }) {
    const authHeader = req.headers.authorization || "";
    const token = authHeader.replace("Bearer ", "");

    if (!token) {
      return { user: null };
    }

    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      return { user: decoded };
    } catch (error) {
      return { user: null };
    }
  },
};
