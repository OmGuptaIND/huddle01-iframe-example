import { huddleIframeApp } from "@huddle01/huddle01-iframe";
import { useAtomValue, useSetAtom } from "jotai";
import React from "react";
import { roomIdMapAtom, setRoomIdMapAtom } from "~/store/iframe.atom";
import {
  meAtom,
  removeRedirectUrlAtom,
  setRedirectUrlAtom,
} from "~/store/me.atom";
import { useHuddleViewportActive } from "~/store/viewport.atoms";
import { api } from "~/utils/api";

const Sidebar = () => {
  const { active, toggle } = useHuddleViewportActive();
  const setRoomIdMap = useSetAtom(setRoomIdMapAtom);
  const roomIdMap = useAtomValue(roomIdMapAtom);
  const displayName = useAtomValue(meAtom).displayName;
  const setRedirectUrl = useSetAtom(setRedirectUrlAtom);
  const removeRedirectUrl = useSetAtom(removeRedirectUrlAtom);

  const roomCreator = api.roomRouter.createHuddleIframeRoom.useMutation({
    onSuccess: (data) => {
      setRoomIdMap("huddleRoom", {
        roomId: data.roomId,
        meetingLink: data.meetingLink,
      });

      joinRoomCreator.mutate({
        roomId: data.roomId,
        displayName,
        userType: "host",
      });
    },
    onError: (error) => {
      alert("Error Creating Room");
      console.error({ error });
    },
  });

  const joinRoomCreator = api.roomRouter.createJoinRoomHandler.useMutation({
    onSuccess: (data) => {
      setRedirectUrl(data.redirectUrl);

      setTimeout(() => {
        toggle("mount");
      }, 1000);
    },
    onError: (error) => {
      alert("Error Getting Join Room TOKEN");
      console.error({ error });
    },
  });

  const handleHuddleView = () => {
    if (active) {
      removeRedirectUrl();
      toggle("unmount");
    }

    if (!active) {
      if (roomIdMap["huddleRoom"]) {
        toggle("mount");
        return;
      }

      roomCreator.mutate({
        title: "TEST_MEETING",
        roomLocked: true,
      });
    }
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
