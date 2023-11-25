import { atom } from "recoil";

export const loanState = atom({
    key: 'loanState', // unique ID (with respect to other atoms/selectors)
    default: []
  });
