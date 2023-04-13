import { atom } from "jotai";

export const meAtom = atom<{
  displayName: string;
  redirectUrl: string;
}>({
  displayName: "OmG",
  redirectUrl: "",
});

export const getRedirectUrlAtom = atom((get) => get(meAtom).redirectUrl);

export const setRedirectUrlAtom = atom(
  null,
  (get, set, redirectUrl: string) => {
    set(meAtom, (prev) => ({
      ...prev,
      redirectUrl,
    }));
  }
);

export const removeRedirectUrlAtom = atom(null, (get, set) => {
  set(meAtom, (prev) => ({
    ...prev,
    redirectUrl: "",
  }));
});
