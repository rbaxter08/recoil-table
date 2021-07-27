import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { act } from '@testing-library/react-hooks';
import {
  renderRecoilHook,
  MOCK_DATA,
  MOCK_COLUMNS,
  MockDataType,
} from '../testHelpers';
import { useTable } from '../../index';

describe('Sort', () => {
  test('Updates columnSortState and sortedColumnIdState', () => {
    const { result } = renderRecoilHook(() => {
      const tableInstance = useTable<MockDataType>('test-table');
      const setData = useSetRecoilState(tableInstance.dataAtom);
      const setColumns = useSetRecoilState(tableInstance.columnAtom);
      const [sort, setSort] = useRecoilState(tableInstance.selectSort);
      const columnSortState = useRecoilValue(
        tableInstance.columnSortState('col1'),
      );
      return { setData, setColumns, sort, setSort, columnSortState };
    });

    expect(result.current.sort).toStrictEqual({ columnId: '', isDesc: false });
    expect(result.current.columnSortState).toStrictEqual({
      isSorted: false,
      isDesc: false,
    });

    act(() => {
      result.current.setData(MOCK_DATA);
      // @ts-ignore
      result.current.setColumns(MOCK_COLUMNS);
      result.current.setSort({ columnId: 'col1', isDesc: true });
    });

    expect(result.current.sort).toStrictEqual({
      columnId: 'col1',
      isDesc: true,
    });
    expect(result.current.columnSortState).toStrictEqual({
      isSorted: true,
      isDesc: true,
    });

    act(() => {
      result.current.setSort({ columnId: 'col1', isDesc: false });
    });

    expect(result.current.sort).toStrictEqual({
      columnId: 'col1',
      isDesc: false,
    });
    expect(result.current.columnSortState).toStrictEqual({
      isSorted: true,
      isDesc: false,
    });
  });
});
