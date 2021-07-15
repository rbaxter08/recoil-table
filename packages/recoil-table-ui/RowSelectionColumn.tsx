import Checkbox from '@material-ui/core/Checkbox';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { useTable, Options } from 'recoil-table';

export function RecoilTableRowSelectionCell({ row, tableKey, options }: any) {
  const { selectFullRowById, selectedRowsAtom } = useTable(tableKey, options);
  const setSelectedRows = useSetRecoilState(selectedRowsAtom);
  const fullRow = useRecoilValue(selectFullRowById(row.id));
  return (
    <Checkbox
      checked={!!fullRow.isSelected}
      onChange={(_, checked) =>
        setSelectedRows((prev: any) => ({ ...prev, [row.id]: checked }))
      }
    />
  );
}

export function getRowSelectionCol(tableKey: string, options: Options) {
  return {
    Header: '',
    id: 'selection',
    renderCell: (row: any) => (
      <RecoilTableRowSelectionCell
        row={row}
        tableKey={tableKey}
        options={options}
      />
    ),
  };
}
