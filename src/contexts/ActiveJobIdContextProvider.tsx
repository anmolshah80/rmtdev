import { createContext } from 'react';

import { useActiveJobId } from '@/lib/hooks';

type TActiveIdContext = {
  activeJobId: number | null;
};

type ActiveJobIdContextProviderProps = {
  children: React.ReactNode;
};

export const ActiveJobIdContext = createContext<TActiveIdContext | null>(null);

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
