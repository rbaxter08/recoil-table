# Redux Toolkit

**A lightweight and flexible table state manager built using Recoil.**

## Purpose

The **Recoil Table** package is intended to make managing the state of a table or grid simple by providing an easy way to access and modify that state from anywhere in your application.

By leveraging Recoil, you can listen to only the part of the table state that is necessary for your component to render and you can do so anywhere in your application under the `RecoilRoot`

# Getting Started

## Installation

```bash
# NPM
npm install recoil-table

# Yarn
yarn add recoil-table
```

## RecoilRoot

Because **Recoil Table** is built using Recoil the `RecoilRoot` must appear somewhere in the parent tree. If you are unfamiliar with Recoil, you may find it useful to read their [basic tutorial](https://recoiljs.org/docs/basic-tutorial/intro)

```ts
import React from 'react';
import { RecoilRoot } from 'recoil';

function App() {
  return (
    <RecoilRoot>
      <CharacterCounter />
    </RecoilRoot>
  );
}
```

## Atoms and Selectors

At it's core, **Recoil Table** is simply a collection of Recoil AtomFamilys and SelectorFamilys.
Use them in combination with any of the hooks provided by Recoil (`useRecoilValue`, `useRecoilState`, etc...) and pass them a key that is **unique** to the table state you wish to access.

```ts
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

**Recoil Table** provides a `useTable` hook which will forward the **unique** table key to all the Atom and Selector Familys for you.

```ts
import { useRecoilValue } from 'recoil';
import { useTable } from 'recoil-table';

function TableColumns() {
  const tableInstance = useTable('table1');
  const columns = useRecoilValue(tableInstance.columnAtom);

  return (
    <TableRow>
      {columns.map((column) => (
        <TableCell>{column.Header}</TableCell>
      ))}
    </TableRow>
  );
}
```
