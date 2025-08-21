import { ActiveJobIdContext } from '@/contexts/ActiveJobIdContext';

import { useActiveJobId } from '@/lib/hooks';

type ActiveJobIdContextProviderProps = {
  children: React.ReactNode;
};

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
