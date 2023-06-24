import { selector } from 'recoil';
import { mapSelectAtom, addressNameAtom } from '../atoms/mapSelectAtom';

export const setMapSelect = selector({
  key: 'setMapSelect',
  set: ({ set }, newValue) => {
    set(mapSelectAtom, newValue);
  },
  get: ({ get }) => {
    return get(mapSelectAtom);
  },
});

export const getMapSelect = selector({
  key: 'getMapSelect',
  get: ({ get }) => {
    return get(mapSelectAtom);
  },
});

export const setAddressSelect = selector({
  key: 'setAddressSelect',
  set: ({ set }, newValue) => {
    set(addressNameAtom, newValue);
  },
  get: ({ get }) => {
    return get(addressNameAtom);
  },
});

export const getAddressSelect = selector({
  key: 'getAddressSelect',
  get: ({ get }) => {
    return get(addressNameAtom);
  },
});
