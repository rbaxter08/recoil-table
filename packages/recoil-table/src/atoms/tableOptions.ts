import { atomFamily } from 'recoil';

export interface TableOptions {
  manualControl?: boolean;
}

const initState: TableOptions = {
  manualControl: false,
};

export const tableOptionsState = atomFamily<TableOptions, string>({
  key: 'recable-table-options-state',
  default: initState,
});
