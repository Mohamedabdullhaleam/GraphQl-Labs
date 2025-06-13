import jwt from "jsonwebtoken";

const JWT_SECRET =
  "8cc8ebf6cd10c1f34f273d6b83d803e46bf3aa1754ef2227a36904afa4ca819d";

export const authMiddleware = async ({ req }) => {
  console.log("=== Auth Middleware Start ===");
  console.log("Request Headers:", req.headers);

  // Get the token from the Authorization header
  const authHeader = req.headers.authorization;
  console.log("Auth Header:", authHeader);

  if (!authHeader) {
    console.log("No authorization header found");
    return { req };
  }

  try {
    // Extract the token from "Bearer <token>"
    const token = authHeader.split(" ")[1];
    console.log("Extracted Token:", token);

    if (!token) {
      console.log("No token found in authorization header");
      return { req };
    }

    // Verify the token
    const decoded = jwt.verify(token, JWT_SECRET);
    console.log("Decoded Token:", decoded);

    // Add the user to the request
    req.user = decoded;
    console.log("User added to request:", req.user);
    console.log("=== Auth Middleware End ===");

    return { req };
  } catch (error) {
    console.error("Token verification error:", error.message);
    console.log("=== Auth Middleware End with Error ===");
    return { req };
  }
};
