import { atomFamily } from 'recoil';

export interface TableOptions {
  manualControl?: boolean;
}

const initState: TableOptions = {
  manualControl: false,
};

export const configState = atomFamily<TableOptions, string>({
  key: 'recable-config-state',
  default: initState,
});
