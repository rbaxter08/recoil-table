# Recoil Table

**A lightweight and flexible table state manager built using Recoil.**

## Purpose

**Recoil Table** is an **experimental** package that is intended to make managing the state of a table or grid simple.

By leveraging Recoil your components can access the table state from anywhere in your application under the `RecoilRoot` and listen only to the parts of the state that are necessary for them to render.

It is headless and does not provide any UI components, just the tools to manage the underlying state of the table.

# Getting Started

## Installation

```
npm i recoil-table recoil

yarn add recoil-table recoil
```

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
import { columnsAtom } from 'recoil-table';

function TableColumns() {
  // access columns for table1
  const columns = useRecoilValue(columnsAtom('table1'));

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
  const { columnsAtom } = useTable('table1');
  const columns = useRecoilValue(columnsAtom);

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
  const { dataAtom, columnTemplatesAtom } = tableInstance;
  const setData = useSetRecoilState(dataAtom);
  const setColumns = useSetRecoilState(columnTemplatesAtom);

  React.useEffect(() => {
    setColumns(COLUMNS);
  }, [setColumns, tableInstance]);

  React.useEffect(() => {
    async function fetchData() {
      const response = await asyncDataFetch();
      setData(response.data);
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
  const columns = useRecoilValue(tableInstance.columnsAtom);
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
  const { rows } = useRecoilValue(tableInstance.rowsAtom);
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

## Create you own selectors

Because you can import all of the atoms from **RecoilTable** you can also use them to create your own selectors.
This is useful if you want to implement a custom selector that is specific to your use case and maybe isn't supported by the library. For more information on writing selectors check the Recoil docs.

```tsx
import { dataAtom } from 'recoil-table';

export const myCustomAtomFamily = selectorFamily<any[], string>({
  key: 'my-custom-atom',
  get:
    (tableKey) =>
    ({ get }) => {
      const data = get(dataAtom(tableKey));
      // some logic
      return ...
    },
});

```

## API

The following is a list of all exported Atoms. Atoms can either be imported directly, or accessed via the tableInstance returned from the `useTable` hook.

Atoms can be used with the hooks provided from Recoil like so:

```tsx
import {useRecoilValue, useSetRecoilState. useRecoilState} from 'recoil';
import { columnTemplatesAtom, useTable } from 'recoil-table';

...

// access from direct import
const columns = useRecoilValue(columnTemplatesAtom('table1'));

// or from useTable hook

const tableInstance = useTable('table1');
const columns = useRecoilValue(tableInstance.columnTemplates);
const setColumns = useSetRecoilState(tableInstance.columnTemplates);
const [columns, setColumns] = useRecoilState(tableInstance.columnTemplates);
```

Some Atoms may be marked as **ReadOnly** and should **only** be used with `useRecoilValue`.
Trying to setState on those atoms will result in `undefined` behaviors.

### Columns

- ```
  columnTemplatesAtom: RecoilState<Column[]>
  ```

  - Set or get list of original column definitions

&nbsp;

- ```
  columnsAtom
  ```
  - Gets the list of columns that should be visible on the table
  - ReadOnly

&nbsp;

- ```ts
  columnHideAtom: (columnId: string) => RecoilState<boolean>
  ```

  - True if the column with the given ID is visible

&nbsp;

- ```
  columnSortAtom: (columnId: string) => {
      isSorted: boolean,
      isDesc: boolean,
    }
  ```
  - Get the sort state of a specific column
  - Should NOT be used to `set` the column state. Use `selectSort` to `set` instead.
  - ReadOnly

&nbsp;

- ```
  sortAtom: RecoilState<{ columnId: string, isDesc: boolean }>,
  ```
  - Get or Set which column is actively being sorted
  - RecoilTable currently only supports single column sort

&nbsp;

### Data and Rows

- ```
  dataAtom: Object[]
  ```

  - Get or Set the original data for the table

  &nbsp;

- ```
  rowsAtom: Row[]
  ```

  - Get the list of rows that should be displayed on the table
  - This is a subset of the original Data that has been Sorted and Paginated
  - ReadOnly

&nbsp;

- ```
  selectedRowsAtom: Record<RowId, boolean>
  ```
  - Get or Set the list of currently selected Rows

&nbsp;

- ```ts
  rowSelectionAtom:  (rowId: string) => RecoilState<boolean>
  ```
  - Get the current selection state for a given row
  - ReadOnly

&nbsp;

### Pagination

- ```ts
  pageAtom: RecoilState<{
    page: 0,
    rowsPerPage: 10,
  }>
  ```
  - Get or Set the pagination state
  - page - current page

&nbsp;

### TableConfig

- ```
  configAtom: config
  ```
  - Get or Set the options for the table
  - ```
    manualControl: boolean
    ```
    - default `false`
    - if True, `rows` will skip Pagination and Sorting and return the Data
    - Why not just use dataAtom? Because rows also assigns each row a unique ID needed for selection.
