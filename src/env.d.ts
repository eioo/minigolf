interface ImportMetaEnv extends Readonly<Record<string, string>> {
  readonly VITE_WS_PORT: string;
  readonly VITE_WS_HOST: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
