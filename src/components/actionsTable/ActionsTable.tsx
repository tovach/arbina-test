import { FC, useState } from 'react';

import { InputGroup } from '@blueprintjs/core';
import { Cell, Column, Table2 } from '@blueprintjs/table';
import { UserAction } from '@types';

type ActionsTableProps = {
  items: UserAction[];
};

export const ActionsTable: FC<ActionsTableProps> = ({ items }) => {
  const [data, setData] = useState<UserAction[]>(items);

  const numRows = data.length;
  const findByInput = (input: string, arr: UserAction[]) => {
    const result = arr.filter((obj) => Object.values(obj).some((value) => value.includes(input)));
    setData(result);
  };

  const userCell = (rowIndex: number) => <Cell>{`${data[rowIndex].username}`}</Cell>;
  const actionCell = (rowIndex: number) => <Cell>{`${data[rowIndex].action}`}</Cell>;
  const timestampCell = (rowIndex: number) => <Cell>{`${data[rowIndex].action_createad_at}`}</Cell>;
  return (
    <>
      <Table2 numRows={numRows} columnWidths={[200, 300, 310]}>
        <Column name='User' cellRenderer={userCell} />
        <Column name='Action' cellRenderer={actionCell} />
        <Column name='Timestamp' cellRenderer={timestampCell} />
      </Table2>

      <div style={{ display: 'flex', alignItems: 'center', gap: '50px' }}>
        <InputGroup onChange={(e) => findByInput(e.currentTarget.value, data)} width='30px' />
        <h3>Search</h3>
      </div>
    </>
  );
};
