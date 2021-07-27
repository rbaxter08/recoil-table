import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { act } from '@testing-library/react-hooks';
import { renderRecoilHook, MOCK_DATA, MockDataType } from '../testHelpers';
import { useTable } from '../../index';

describe('Selected Rows', () => {
  test('Updates selectedRowsState and rowSelectionState', () => {
    const { result } = renderRecoilHook(() => {
      const tableInstance = useTable<MockDataType>('test-table');
      const setData = useSetRecoilState(tableInstance.dataAtom);
      const [selectedRows, setSelectedRows] = useRecoilState(
        tableInstance.selectSelectedRows,
      );
      const rowSelectedState = useRecoilValue(
        tableInstance.rowSelectionState('0'),
      );
      return { setData, setSelectedRows, selectedRows, rowSelectedState };
    });

    expect(result.current.selectedRows).toStrictEqual({});
    expect(result.current.rowSelectedState).toBeFalsy();

    act(() => {
      result.current.setData(MOCK_DATA);
      result.current.setSelectedRows({ '0': true });
    });

    expect(result.current.selectedRows).toStrictEqual({ '0': true });
    expect(result.current.rowSelectedState).toBeTruthy();

    act(() => {
      result.current.setSelectedRows({ '0': false });
    });

    expect(result.current.selectedRows).toStrictEqual({ '0': false });
    expect(result.current.rowSelectedState).toBeFalsy();
  });
});
