import { useRecoilValue } from 'recoil';
import { useTable } from 'recoil-table';

export function SortMeta({
  tableKey,
  options,
}: {
  tableKey: string;
  options: any;
}) {
  const { sortState } = useTable(tableKey, options);
  const sort = useRecoilValue(sortState);
  return <div>Sort: {JSON.stringify(sort)}</div>;
}
