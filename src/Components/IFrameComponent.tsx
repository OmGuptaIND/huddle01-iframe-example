import React, { useEffect } from "react";

import {
  HuddleIframe,
  huddleIframeApp,
  HuddleAppEvent,
  type IframeConfig,
} from "@huddle01/huddle01-iframe";

import { useAtomValue } from "jotai";
import { getRedirectUrlAtom } from "~/store/me.atom";

const IFrameComponent = () => {
  const redirectUrl = useAtomValue(getRedirectUrlAtom);

  useEffect(() => {
    huddleIframeApp.on(HuddleAppEvent.PEER_JOIN, () => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      huddleIframeApp.methods.changeAvatarUrl(
        "https://i.imgur.com/0X0X0X0.png"
      );
    });
  }, []);

  const iframeConfig: IframeConfig = {
    roomUrl: redirectUrl,
    width: "100%",
    noBorder: false, // false by default
  };

  return <HuddleIframe key="huddle01-iframe" config={iframeConfig} />;
};

export default IFrameComponent;
