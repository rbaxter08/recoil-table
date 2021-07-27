import { useRecoilValue, useSetRecoilState } from 'recoil';
import { act } from '@testing-library/react-hooks';
import { renderRecoilHook, MOCK_DATA, MockDataType } from '../testHelpers';
import { useTable } from '../../index';

describe('Rows', () => {
  test('get rows', () => {
    const { result } = renderRecoilHook(() => {
      const tableInstance = useTable<MockDataType>('test-table');
      const setData = useSetRecoilState(tableInstance.dataAtom);
      const rows = useRecoilValue(tableInstance.selectRows);
      return { setData, rows };
    });

    act(() => {
      result.current.setData(MOCK_DATA);
    });

    expect(result.current.rows).toMatchObject({
      rows: MOCK_DATA.slice(0, 10),
      total: MOCK_DATA.length,
    });
  });
});

describe('Rows - manualControl: true', () => {
  test('get rows', () => {
    const { result } = renderRecoilHook(() => {
      const tableInstance = useTable<MockDataType>('test-table', {
        manualControl: true,
      });
      const setData = useSetRecoilState(tableInstance.dataAtom);
      const rows = useRecoilValue(tableInstance.selectRows);
      return { setData, rows };
    });

    act(() => {
      result.current.setData(MOCK_DATA);
    });

    expect(result.current.rows).toMatchObject({
      rows: MOCK_DATA,
      total: MOCK_DATA.length,
    });
  });

  test.skip('// todo sort order asc/desc', () => {});

  test.skip('// todo pageination order / page total when manual', () => {});

  test.skip('// todo prepared rows', () => {});
});
