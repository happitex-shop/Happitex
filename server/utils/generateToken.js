import jwt from 'jsonwebtoken';

const generateToken = (res, userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: '30d'
  });

  // Set JWT as HTTP-Only cookie (optional but more secure, or just return it in JSON)
  // For this build, returning in JSON is easier for React Context auth flow if not using credentials
  return token;
};

export default generateToken;
