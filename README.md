# Remote Dev

[![Build and Deploy](https://github.com/anmolshah80/rmtdev/actions/workflows/deploy_production.yml/badge.svg)](https://github.com/anmolshah80/rmtdev/actions/workflows/deploy_production.yml)

- Install and configure vite-tsconfig-paths to use absolute paths for imports

  - To use absolute paths while importing the files inside `src` folder, install `vite-tsconfig-paths` as a dev dependency

  ```bash
  npm install -D vite-tsconfig-paths
  ```

  - Add _paths_ key to `tsconfig.app.json`

  ```json
  {
    "compilerOptions": {
      ...all other options

      "paths": {
        "@/*": ["./src/*"]
      }
    }
  }
  ```

  - Call `tsconfigPaths` inside the _plugins_ array in `vite.config.ts`

  ```ts
  import { defineConfig } from 'vite';
  import react from '@vitejs/plugin-react';
  import tsconfigPaths from 'vite-tsconfig-paths';

  export default defineConfig({
    plugins: [tsconfigPaths(), react()],
  });
  ```

  - References
    - [Streamlining Absolute Imports in React with TypeScript and Vite](https://dev.to/mizanrifat/streamlining-absolute-imports-in-react-with-typescript-and-vite-2bpp)
    - [Absolute path in Vite project React TS (alias)](https://gist.github.com/luciaaldana/7343c77b56e02a1ab7ed2903c01a843d)

-
