export default () => ({
  database: {
    url: process.env.DB_URL || 'postgres://user:pass@localhost:5432/inlaze_projects',
  },
  jwt: {
    secret: process.env.JWT_SECRET || 'secret',
    expiresIn: process.env.JWT_EXPIRES_IN || '1h',
  },
});
