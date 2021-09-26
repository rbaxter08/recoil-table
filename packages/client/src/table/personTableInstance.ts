import { createTableInstance, TableInstance } from 'recoil-table';
import { Data } from '../TableUtils';

export const personTableInstance = createTableInstance<Data>('person-table');

export type PersonTableInstance = TableInstance<Data>;
