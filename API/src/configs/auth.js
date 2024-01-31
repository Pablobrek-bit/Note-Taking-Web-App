module.exports = {
  jwt: {
    secret: process.env.SECRET_AUTH || 'default',
    expiresIn: '1d',
  },
};
