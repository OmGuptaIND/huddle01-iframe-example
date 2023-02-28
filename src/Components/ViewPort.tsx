import React from "react";
import { useHuddleViewportActive } from "~/store/viewport.atoms";
import HuddleView from "./HuddleView";

const ViewPort = () => {
  const { active } = useHuddleViewportActive();

  if (active) {
    return <HuddleView />;
  }

  return (
    <div className="grid place-content-center text-base font-bold text-custom1">
      <p>Click on Huddle01 for Custom Viewport For Huddle01 Iframe</p>
    </div>
  );
};

export default ViewPort;
