import { createContext } from 'react';

import { useActiveJobId } from '@/lib/hooks';

type TActiveJobIdContext = {
  activeJobId: number | null;
};

type ActiveJobIdContextProviderProps = {
  children: React.ReactNode;
};

export const ActiveJobIdContext = createContext<TActiveJobIdContext | null>(
  null,
);

const ActiveJobIdContextProvider = ({
  children,
}: ActiveJobIdContextProviderProps) => {
  const activeJobId = useActiveJobId();

  return (
    <ActiveJobIdContext.Provider value={{ activeJobId }}>
      {children}
    </ActiveJobIdContext.Provider>
  );
};

export default ActiveJobIdContextProvider;
