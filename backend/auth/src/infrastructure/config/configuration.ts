export default () => ({
  database: {
    url: process.env.DB_URL || 'postgres://user:pass@localhost:5432/inlaze_auth',
  },
  jwt: {
    secret: process.env.JWT_SECRET || '7404EEB2456DD8B548A24022F05A08A39DDE3A48AD36D74F7CE2294B8134563B',
    expiresIn: process.env.JWT_EXPIRES_IN || '1h',
  },
});
