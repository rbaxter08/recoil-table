import Checkbox from '@material-ui/core/Checkbox';

export function RecoilTableRowSelectionCell({ row }: any) {
  return <Checkbox checked={row.isSelected} />;
}

export const RowSelectionColumn = {
  Header: '',
  id: 'selection',
  renderCell: (row: any) => <RecoilTableRowSelectionCell row={row} />,
};
