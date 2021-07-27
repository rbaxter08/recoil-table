import { RecoilState, RecoilValueReadOnly, DefaultValue } from 'recoil';

export type AtomFamily = <T>(key: string) => RecoilState<T>;
export type SelectorFamily = <T>(key: string) => RecoilState<T>;
export type ReadOnlySelectorFamily = <T>(key: string) => RecoilValueReadOnly<T>;

export function guardRecoilDefaultValue(
  candidate: any,
): candidate is DefaultValue {
  if (candidate instanceof DefaultValue) return true;
  return false;
}
