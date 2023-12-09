import { atom } from "recoil";

export const loanEditState = atom({
    key: 'loanEditState', // unique ID (with respect to other atoms/selectors)
    default: {}
  });
