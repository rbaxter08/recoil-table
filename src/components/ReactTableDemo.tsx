import ReactTable from './ReactTableUI';
export default function ReactTableDemo({ columns, data }: any) {
  return (
    <div style={{ marginTop: 40 }}>
      <span>ReactTable</span>
      <ReactTable columns={columns} data={data} />
    </div>
  );
}
