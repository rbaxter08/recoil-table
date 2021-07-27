import React from 'react';
import { RecoilRoot, useRecoilValue, useSetRecoilState } from 'recoil';
import { renderHook, act } from '@testing-library/react-hooks';
import { useTable } from '../index';

type Data = {
  id: number;
  name: string;
};

const data: Data[] = [
  { id: 0, name: 'jeff' },
  { id: 1, name: 'rob' },
  { id: 2, name: 'bob' },
  { id: 3, name: 'jeff' },
  { id: 4, name: 'rob' },
  { id: 5, name: 'bob' },
  { id: 6, name: 'jeff' },
  { id: 7, name: 'rob' },
  { id: 8, name: 'bob' },
  { id: 9, name: 'jeff' },
  { id: 10, name: 'rob' },
  { id: 11, name: 'bob' },
];

test('gets rows', () => {
  const wrapper = ({ children }: any) => <RecoilRoot>{children}</RecoilRoot>;
  const { result } = renderHook(
    () => {
      const tableInstance = useTable<Data>('test-table');
      const setData = useSetRecoilState(tableInstance.dataAtom);
      const rows = useRecoilValue(tableInstance.selectRows);
      return { setData, rows };
    },
    { wrapper },
  );

  act(() => {
    result.current.setData(data);
  });

  expect(result.current.rows).toMatchObject({
    rows: data.slice(0, 10),
    total: data.length,
  });
});

test('manual: gets rows', () => {
  const wrapper = ({ children }: any) => <RecoilRoot>{children}</RecoilRoot>;
  const { result } = renderHook(
    () => {
      const tableInstance = useTable<Data>('test-table', {
        manualControl: true,
      });
      const setData = useSetRecoilState(tableInstance.dataAtom);
      const rows = useRecoilValue(tableInstance.selectRows);
      return { setData, rows };
    },
    { wrapper },
  );

  act(() => {
    result.current.setData(data);
  });

  expect(result.current.rows).toMatchObject({
    rows: data,
    total: data.length,
  });
});
true;
