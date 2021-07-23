import { atomFamily, RecoilState, RecoilValueReadOnly } from 'recoil';

export type AtomFamily = <T>(key: string) => RecoilState<T>;
export type SelectorFamily = <T>(key: string) => RecoilState<T>;
export type ReadOnlySelectorFamily = <T>(key: string) => RecoilValueReadOnly<T>;

export const dataState: AtomFamily = atomFamily<any, string>({
  key: 'table-data',
  default: [],
});
