/// <reference types="vite/client" />

interface ImportMetaEnv {
  VITE_BASE_API_URL: string;
  /**
   * firebase config json
   */
  VITE_FIREBASE_CONFIG: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}