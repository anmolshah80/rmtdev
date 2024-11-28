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

- Create a custom hook `useSearchQuery` in `lib/hooks.ts` that takes in _searchText_ as an argument to fetch job item data from an API, manage loading, error and data states, and return them in an object
- Implement a job search feature that dynamically fetches job listings from an API as users type in the search input
- Create `handleErrors.ts` file under _lib_ folder to move the switch case statements used to throw errors based on API response status codes
- Focus on the search input field by typing the `/` (forward slash) key
- Create a custom hook `useJobItem` in `lib/hooks.ts` to fetch an individual job item data from the API, manage loading, error and data states, and return them in a tuple
- Create a custom hook `useDebounce` in `lib/hooks.ts` to delay the execution of state update until a specified time period has passed without any further changes to the input value, to reduce the unnecessary network requests
  - Source: [useDebounce](https://usehooks.com/usedebounce)
- Change the fetch to `React Query` to _cache_ the fetch requests for _job list_ and individual _job item_ data
- Add pagination to render `seven` _job items_ per _page_
- Implement sorting to `sort` the search results based on their _relevance score_ or the _recency_ of the _job item_
- Use the `useMemo` hook to _memoize_ the sorted _search results,_ and recompute only when either the **job list** array changes or the **sorting method** is updated
- Use the `Context API` to create a `BookmarksContext` that wraps the `App` component, exposing the method to add _job ids_ in _bookmarks_
- Save the bookmarked _job ids_ to `localStorage`
- Create a generic `useLocalStorage` custom hook in `lib/hooks.ts` that takes in _key_ and _initialValue_ as arguments and saves the data in `localStorage`
- Create a generic `useJobItems` custom hook in `lib/hooks.ts` that takes in _ids_ as an argument and runs concurrent queries to fetch the data for the number of job ids present in the _ids_ array
- Populate the job items fetched using `useJobItems` hook in `BookmarksPopover` component
- Create a generic `useOnClickOutside` custom hook that takes in an _array of refs_ and a _handler function_ as **arguments** and attaches a click event listener to invoke the handler function for all click events outside those refs
- Create `ActiveJobIdContext` to share the _active job id_ state everywhere it is being used in the application
- Create `useActiveJobIdContext` to throw an error if the component is not being wrapped with `ActiveJobIdContextProvider`
- Create a portal using react-dom `createPortal` function to render the `BookmarksPopover` component into the document body instead of the `Header` component
- Close bookmarks popover upon clicking the slash key or focusing on the search input field
- Create `SearchTextContextProvider` to move search related states and functions from the App component
- Create `JobItemsContextProvider` to move job items related states and functions from the App component
