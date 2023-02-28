import { atom, useAtom } from "jotai";

export const huddleViewportActive = atom(false);

export const useHuddleViewportActive = () => {
  const [active, setActive] = useAtom(huddleViewportActive);

  const toggle = (value: "unmount" | "mount") => {
    if (value === "mount") setActive(true);
    else if (value === "unmount") setActive(false);
  };

  return {
    active,
    toggle,
  };
};
