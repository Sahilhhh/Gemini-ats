
import { useContext } from 'react';
import { DataContext } from '../context/DataContext';

export const useAppContext = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within a DataProvider');
  }
  return context;
};
