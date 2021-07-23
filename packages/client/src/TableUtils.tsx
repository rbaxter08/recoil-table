import namor from 'namor';
import { Column } from 'recoil-table';

const range = (len: number) => {
  const arr = [];
  for (let i = 0; i < len; i++) {
    arr.push(i);
  }
  return arr;
};

const newPerson = () => {
  const statusChance = Math.random();
  return {
    firstName: namor.generate({ words: 1, numbers: 0 }),
    lastName: namor.generate({ words: 1, numbers: 0 }),
    age: Math.floor(Math.random() * 30),
    visits: Math.floor(Math.random() * 100),
    progress: Math.floor(Math.random() * 100),
    status:
      statusChance > 0.66
        ? 'relationship'
        : statusChance > 0.33
        ? 'complicated'
        : 'single',
  };
};

export default function makeData(...lens: any[]) {
  // @ts-ignore
  const makeDataLevel = (depth = 0) => {
    const len = lens[depth];
    return range(len).map((d) => {
      return {
        ...newPerson(),
        subRows: lens[depth + 1] ? makeDataLevel(depth + 1) : undefined,
      };
    });
  };

  return makeDataLevel();
}

export const DATA = makeData(200);

export function asyncDataFetch(page?: number, rowsPerPage?: number) {
  return new Promise<{ data: any[]; total: number }>((res) => {
    if (page !== undefined && rowsPerPage !== undefined) {
      const start = rowsPerPage * page;
      const end = start + rowsPerPage - 1;
      res({ data: DATA.slice(start, end), total: DATA.length });
    } else {
      res({ data: DATA, total: DATA.length });
    }
  });
}

export type Data = {
  id: string;
  foo: number;
};

export const COLUMNS: Column<Data>[] = [
  {
    Header: 'Age',
    accessor: 'age',
    sortable: true,
  },
  {
    Header: 'Visits',
    accessor: 'visits',
    sortable: true,
  },
  {
    Header: 'Status',
    accessor: 'status',
  },
  {
    Header: 'Profile Progress',
    accessor: 'progress',
  },
];
