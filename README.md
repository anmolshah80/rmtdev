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

  - You can now import components or other files under the `src` directory following the `@` symbol. For instance, if you have a component under `src/components/container/header/Header.tsx`, you can import it using

  ```tsx
  import Header from '@/components/container/header/Header';

  ...all other codes
  ```

  - References
    - [Streamlining Absolute Imports in React with TypeScript and Vite](https://dev.to/mizanrifat/streamlining-absolute-imports-in-react-with-typescript-and-vite-2bpp)
    - [Absolute path in Vite project React TS (alias)](https://gist.github.com/luciaaldana/7343c77b56e02a1ab7ed2903c01a843d)

- Create a custom hook `useJobItems` in `lib/hooks.ts` to fetch job item data from an API, manage loading, error and data states, and return them in an object
- Implement a job search feature that dynamically fetches job listings from an API as users type in the search input
- Create `handleErrors.ts` file under _lib_ folder to move the switch case statements used to throw errors based on API response status codes
- Focus on the search input field by typing the `/` (forward slash) key
- Create a custom hook `useJobItem` in `lib/hooks.ts` to fetch an individual job item data from the API, manage loading, error and data states, and return them in a tuple
- Create a custom hook `useDebounce` in `lib/hooks.ts` to delay the execution of state update until a specified time period has passed without any further changes to the input value, to reduce the unnecessary network requests
  - Source: [useDebounce](https://usehooks.com/usedebounce)
