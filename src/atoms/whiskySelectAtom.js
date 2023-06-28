import { atom } from 'recoil';

export const whiskySelectAtom = atom({
  key: 'whiskySelect',
  default: 0,
});

export const categorySelectAtom = atom({
  key: 'categorySelect',
  default: '',
});
