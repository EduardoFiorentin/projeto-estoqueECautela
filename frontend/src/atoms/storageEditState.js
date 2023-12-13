import { atom } from "recoil";

export const storageEditState = atom({
    key: 'storageEditStatee', // unique ID (with respect to other atoms/selectors)
    default: {}
  });
