import dotenv from 'dotenv';

// "import.meta.env" not available here.
dotenv.config();

export const env = {
  PORT: Number(process.env.VITE_WS_PORT || 8081),
};
