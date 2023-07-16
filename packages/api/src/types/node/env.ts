declare global {
  namespace NodeJS {
    interface ProcessEnv {
      JWT_SECRET: string;
      MONOCLE_DATABASE_URL: string;
      PORT?: string;
      NODE_ENV?: "development" | "production";
    }
  }
}

export {};
