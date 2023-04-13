import React, { useEffect } from "react";
import { usePromptCameraDevice } from "~/store/stream.atom";

const GridContainer = () => {
  const { promptFn } = usePromptCameraDevice();

  useEffect(() => {
    promptFn();
  }, [promptFn]);

  return <div>GridContainer</div>;
};

export default GridContainer;
