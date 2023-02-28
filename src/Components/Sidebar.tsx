import React from "react";
import { useHuddleViewportActive } from "~/store/viewport.atoms";

const Sidebar = () => {
  const { active, toggle } = useHuddleViewportActive();

  const handleHuddleView = () => {
    if (active) toggle("unmount");
    else if (!active) toggle("mount");
  };

  return (
    <div className="h-screen bg-secondary">
      <div className="flex h-1/6 flex-col gap-8 bg-custom2 pl-2 pt-4">
        <div className="flex items-center justify-between pr-2">
          <p className="text-base font-semibold text-white">Test123</p>
          <p>{"< / >"}</p>
        </div>
        <div className="mr-2 cursor-pointer rounded-sm bg-white text-center text-base font-semibold text-black shadow-lg hover:opacity-80">
          Invite People
        </div>
      </div>

      <div className="m-2 cursor-pointer rounded-md p-2 text-sm font-semibold text-custom1 transition-all duration-300 hover:bg-black hover:shadow-md">
        <div onClick={handleHuddleView} className="flex items-center gap-2">
          <p>{"=>"}</p>
          <p>Huddle01</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
