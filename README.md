# Recoil Table

**A lightweight and flexible table state manager built using Recoil.**

## Purpose

**Recoil Table** is an expirmental package that is intended to make managing the state of a table or grid simple by providing an easy way to access and modify that state from anywhere in your application.

By leveraging Recoil your components can access the table state from anywhere in your application under the `RecoilRoot` and listen only to the parts of the state that are necessary for them to render.

It is headless and does not provide any UI components, just the tools to manage the underlying state of the table.

# Getting Started

## Installation

Coming soon

## RecoilRoot

Because **Recoil Table** is built using Recoil, the `RecoilRoot` must appear somewhere in the parent tree. If you are unfamiliar with Recoil, you may find it useful to explore their docs and go through the [basic tutorial](https://recoiljs.org/docs/basic-tutorial/intro)

```tsx
import React from 'react';
import { RecoilRoot } from 'recoil';

function App() {
  return (
    <RecoilRoot>
      <MyApp />
    </RecoilRoot>
  );
}
```

## Atoms and Selectors

At it's core, **Recoil Table** is simply a collection of Recoil Atom and Selector Families.
Use them in combination with any of the hooks provided by Recoil (`useRecoilValue`, `useRecoilState`, etc...) and pass them a key that is **unique** to the table state you wish to access.

```tsx
import { useRecoilValue } from 'recoil';
import { columnAtom } from 'recoil-table';

function TableColumns() {
  // access columns for table1
  const columns = useRecoilValue(columnAtom('table1'));

  return (
    <TableRow>
      {columns.map((column) => (
        <TableCell>{column.Header}</TableCell>
      ))}
    </TableRow>
  );
}
```

## useTable

**Recoil Table** provides a `useTable` hook, which will forward the **unique** table key to all the Atom and Selector Families for you.

```tsx
import { useRecoilValue } from 'recoil';
import { useTable } from 'recoil-table';

function TableColumns() {
  const { columnAtom } = useTable('table1');
  const columns = useRecoilValue(columnAtom);

  return (
    <TableRow>
      {columns.map((column) => (
        <TableCell>{column.Header}</TableCell>
      ))}
    </TableRow>
  );
}
```

## Complex Example

This is a rough look at what a more complete Table may look like and can be found [here](https://github.com/rbaxter08/recoil-table/blob/main/packages/client/src/RecoilTable.tsx)

```tsx
const COLUMNS = [
  {
    Header: 'Age',
    accessor: 'age',
  },
  {
    Header: 'Visits',
    accessor: 'visits',
  },
  {
    Header: 'Status',
    accessor: 'status',
  },
];

function RecoilTable() {
  const tableInstance = useTable<Data>('table1');
  const { dataAtom, columnAtom } = tableInstance;
  const setData = useSetRecoilState(dataAtom);
  const setColumns = useSetRecoilState(columnAtom);

  React.useEffect(() => {
    setColumns(COLUMNS);
  }, [setColumns, tableInstance]);

  React.useEffect(() => {
    async function fetchData() {
      const data = await asyncDataFetch();
      setData(data.data);
    }
    fetchData();
  }, [setData]);

  return (
    <>
      <RecoilTable>
        <RecoilTableHeader tableInstance={tableInstance} />
        <RecoilTableBody tableInstance={tableInstance} rowSelection />
      </RecoilTable>
      <RecoilTablePagination tableInstance={tableInstance} />
    </>
  );
}
```

```tsx
//RecoilTableHeader.tsx
function RecoilTableHeader({ tableInstance }) {
  const columns = useRecoilValue(tableInstance.columnAtom);
  return (
    <TableHead>
      <TableRow>
        {columns.map((column) => (
          <TableHeaderCell column={column} tableInstance={tableInstance} />
        ))}
      </TableRow>
    </TableHead>
  );
}
```

```tsx
// RecoilTableBody.tsx
function RecoilTableBody({ tableInstance, rowSelection }) {
  const { rows } = useRecoilValue(tableInstance.selectRows);
  return (
    <TableBody>
      {rows.map((row) => (
        <TableRow
          row={row}
          tableInstance={tableInstance}
          rowSelection={rowSelection}
        />
      ))}
    </TableBody>
  );
}
```
