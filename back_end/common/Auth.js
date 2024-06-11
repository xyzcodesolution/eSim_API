const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const SALT_ROUND = 10;

const hashpassword = async (password) => {
  let salt = await bcrypt.genSalt(SALT_ROUND);
  let hash = await bcrypt.hash(password, salt);
  return hash;
};

const hashcompare = async (password, hash) => {
  return await bcrypt.compare(password, hash);
};

const createToken = async (payload) => {
  const options = {
    expiresIn: '1h', // Token expiry time
  };
  const secret = process.env.JWT_SECRET;
  try {
    let token = await jwt.sign(payload, secret, options);
    return token;
  } catch (error) {
    console.error("Error generating JWT token:", error);
    throw new Error("Failed to generate JWT token");
  }
};

module.exports = { hashpassword, hashcompare, createToken };
