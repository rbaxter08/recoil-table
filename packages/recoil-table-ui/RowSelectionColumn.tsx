import Checkbox from '@material-ui/core/Checkbox';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { Row, TableInstance } from 'recoil-table';

interface Props<T> {
  row: Row<T>;
  tableInstance: TableInstance<T>;
}

export function RecoilTableRowSelectionCell<T>({
  row,
  tableInstance,
}: Props<T>) {
  const setSelectedRows = useSetRecoilState(tableInstance.selectSelectedRows);
  const isSelected = useRecoilValue(tableInstance.rowSelectionState(row.id));
  return (
    <Checkbox
      checked={isSelected}
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
