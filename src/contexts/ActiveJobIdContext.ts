import { createContext } from 'react';

type TActiveJobIdContext = {
  activeJobId: number | null;
};

export const ActiveJobIdContext = createContext<TActiveJobIdContext | null>(
  null,
);
