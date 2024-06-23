module.exports = {
  MONGODB_URL: process.env.MONGODB_URL,
  SERVER_TYPE: process.env.NODE_ENV,
  JWT_SECRET: process.env.JWT_SECRET,
  IS_PRODUCTION: process.env.NODE_ENV === "production",
  SERVER_PORT: process.env.PORT,
};
