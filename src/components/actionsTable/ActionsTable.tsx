import { FC } from 'react';

import { Icon, InputGroup } from '@blueprintjs/core';
import { Cell, Column, Table2, TableLoadingOption } from '@blueprintjs/table';
import { UserAction } from '@types';

type ActionsTableProps = {
  items: UserAction[];
  onSearch: (str: string) => void;
  loading: boolean;
};

export const ActionsTable: FC<ActionsTableProps> = ({ items, onSearch, loading }) => {
  const numRows = items.length;

  const userCell = (rowIndex: number) => <Cell>{`${items[rowIndex].username}`}</Cell>;
  const actionCell = (rowIndex: number) => <Cell>{`${items[rowIndex].action}`}</Cell>;
  const timestampCell = (rowIndex: number) => (
    <Cell>{`${items[rowIndex].action_createad_at}`}</Cell>
  );

  return (
    <>
      <div style={{ margin: '20px 0' }}>
        <InputGroup
          type='search'
          placeholder='Search'
          leftElement={<Icon icon='search' />}
          onChange={(e) => onSearch(e.currentTarget.value)}
        />
      </div>
      <div>
        {numRows === 0 && !loading ? (
          <h3>Not Found</h3>
        ) : (
          <Table2
            numRows={numRows}
            columnWidths={[200, 300, 310]}
            loadingOptions={loading ? [TableLoadingOption.CELLS] : []}
          >
            <Column name='User' cellRenderer={userCell} />
            <Column name='Action' cellRenderer={actionCell} />
            <Column name='Timestamp' cellRenderer={timestampCell} />
          </Table2>
        )}
      </div>
    </>
  );
};
