import React, { useEffect } from "react";

import {
  HuddleIframe,
  huddleIframeApp,
  HuddleAppEvent,
} from "@huddle01/huddle01-iframe";
import { iframeConfig } from "~/store/iframe.config";

const IFrameComponent = () => {
  useEffect(() => {
    huddleIframeApp.on(HuddleAppEvent.PEER_JOIN, () => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      huddleIframeApp.methods.changeAvatarUrl(
        "https://i.imgur.com/0X0X0X0.png"
      );
    });
  }, []);

  return <HuddleIframe key="huddle01-iframe" config={iframeConfig} />;
};

export default IFrameComponent;
