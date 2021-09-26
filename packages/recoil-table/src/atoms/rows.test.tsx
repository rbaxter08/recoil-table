import { useRecoilValue, useSetRecoilState } from 'recoil';
import { act } from '@testing-library/react-hooks';
import { renderRecoilHook, MOCK_DATA, MockDataType } from '../testHelpers';
import { createTableInstance } from '..';

describe('Rows', () => {
  const tableInstance = createTableInstance<MockDataType>('test-table');

  test('get rows', () => {
    const { result } = renderRecoilHook(() => {
      const setData = useSetRecoilState(tableInstance.dataAtom);
      const rows = useRecoilValue(tableInstance.selectRows);
      return { setData, rows };
    });

    act(() => {
      result.current.setData({
        items: MOCK_DATA.items,
        total: MOCK_DATA.total,
      });
    });

    expect(result.current.rows).toMatchObject({
      rows: MOCK_DATA.items.slice(0, 10),
      total: MOCK_DATA.total,
    });
  });
});

describe('Rows - manualControl: true', () => {
  const tableInstance = createTableInstance<MockDataType>('test-table', {
    manualControl: true,
  });
  test('get rows', () => {
    const { result } = renderRecoilHook(() => {
      const setData = useSetRecoilState(tableInstance.dataAtom);
      const rows = useRecoilValue(tableInstance.selectRows);
      return { setData, rows };
    });

    act(() => {
      result.current.setData({
        items: MOCK_DATA.items,
        total: MOCK_DATA.total,
      });
    });

    expect(result.current.rows).toMatchObject({
      rows: MOCK_DATA,
      total: MOCK_DATA.total,
    });
  });

  test.skip('// todo sort order asc/desc', () => {});

  test.skip('// todo pageination order / page total when manual', () => {});

  test.skip('// todo prepared rows', () => {});
});
