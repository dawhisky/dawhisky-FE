import { selector } from 'recoil';
import { whiskySelectAtom, categorySelectAtom } from '../atoms/whiskySelectAtom';

export const setWhiskySelect = selector({
  key: 'setWhiskySelect',
  set: ({ set }, newValue) => {
    set(whiskySelectAtom, newValue);
  },
  get: ({ get }) => {
    return get(whiskySelectAtom);
  },
});

export const getWhiskySelect = selector({
  key: 'getWhiskySelect',
  get: ({ get }) => {
    return get(whiskySelectAtom);
  },
});
