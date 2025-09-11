/// <reference types="vite/client" />

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

interface ImportMetaEnv {
  VITE_BASE_API_URL: string;
  /**
   * firebase config json
   */
  VITE_FIREBASE_CONFIG: string;
}