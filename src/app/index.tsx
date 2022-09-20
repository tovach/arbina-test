import { FC, useEffect } from 'react';

import { ActionsTable } from '@components/actionsTable';
import { useAppSelector, useAsyncActions, useTableActions } from '@hooks/store';

import '@app/styles/index.css';

export const App: FC = () => {
  const url = '/mock/index.json';

  const { fetchUserActions } = useAsyncActions();
  const { findActionByInput } = useTableActions();

  const { errorStatus, items, loadingStatus } = useAppSelector((state) => state.tableSlice);

  useEffect(() => {
    fetchUserActions(url);
  }, []);

  if (!loadingStatus && errorStatus?.length) {
    return <h3>{errorStatus}</h3>;
  }

  return <ActionsTable items={items} onSearch={findActionByInput} loading={loadingStatus} />;
};
