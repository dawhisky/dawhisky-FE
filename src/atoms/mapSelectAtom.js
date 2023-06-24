import { atom } from 'recoil';

export const mapSelectAtom = atom({
  key: 'mapSelect',
  default: 0,
});

export const addressNameAtom = atom({
  key: 'addressName',
  default: '',
});
