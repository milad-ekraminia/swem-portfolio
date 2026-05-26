import { store } from '@/store/store';
import { Provider } from 'react-redux';

export const ReduxStoreProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return <Provider store={store}>{children as any}</Provider>;
};
