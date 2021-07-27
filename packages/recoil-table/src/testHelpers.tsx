import { RecoilRoot } from 'recoil';
import { renderHook } from '@testing-library/react-hooks';

export function renderRecoilHook<TProps, TResult>(
  callback: (props: TProps) => TResult,
) {
  const wrapper = ({ children }: any) => <RecoilRoot>{children}</RecoilRoot>;
  return renderHook(callback, { wrapper });
}

export type MockDataType = {
  id: number;
  name: string;
};

export const MOCK_DATA: MockDataType[] = [
  { id: 0, name: 'jeff' },
  { id: 1, name: 'rob' },
  { id: 2, name: 'bob' },
  { id: 3, name: 'jeff' },
  { id: 4, name: 'rob' },
  { id: 5, name: 'bob' },
  { id: 6, name: 'jeff' },
  { id: 7, name: 'rob' },
  { id: 8, name: 'bob' },
  { id: 9, name: 'jeff' },
  { id: 10, name: 'rob' },
  { id: 11, name: 'bob' },
];
