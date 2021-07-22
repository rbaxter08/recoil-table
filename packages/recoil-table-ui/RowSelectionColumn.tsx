import Checkbox from '@material-ui/core/Checkbox';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { TableInstance } from 'recoil-table';

export function RecoilTableRowSelectionCell({
  row,
  tableInstance,
}: {
  row: any;
  tableInstance: TableInstance;
}) {
  const setSelectedRows = useSetRecoilState(tableInstance.selectedRowsAtom);
  const fullRow = useRecoilValue(tableInstance.selectFullRowById(row.id));
  return (
    <Checkbox
      checked={!!fullRow.isSelected}
      onChange={(_, checked) =>
        setSelectedRows((prev: any) => ({ ...prev, [row.id]: checked }))
      }
    />
  );
}

export function getRowSelectionCol(tableInstance: any) {
  return {
    Header: '',
    id: 'selection',
    renderCell: (row: any) => (
      <RecoilTableRowSelectionCell row={row} tableInstance={tableInstance} />
    ),
  };
}
