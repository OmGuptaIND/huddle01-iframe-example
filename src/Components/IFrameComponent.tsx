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
        "https://images.unsplash.com/photo-1575936123452-b67c3203c357?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8&w=1000&q=80"
      );
    });
  }, []);

  return <HuddleIframe key="huddle01-iframe" config={iframeConfig} />;
};

export default IFrameComponent;
