import { atomWithStorage } from "jotai/utils";
import { atom } from "jotai";

export const roomIdMapAtom = atomWithStorage<
  Record<
    string,
    {
      roomId: string;
      meetingLink: string;
    }
  >
>("roomData", {});

export const setRoomIdMapAtom = atom(
  null,
  (
    get,
    set,
    roomName: string,
    data: { roomId: string; meetingLink: string }
  ) => {
    const roomMap = get(roomIdMapAtom);

    if (roomMap[roomName]) {
      console.error("Room already exists");
      return;
    }
    set(roomIdMapAtom, (prev) => ({
      ...prev,
      [roomName]: {
        roomId: data.roomId,
        meetingLink: data.meetingLink,
      },
    }));
  }
);

export const setNewRoomIdMapAtom = atom(
  null,
  (
    get,
    set,
    data: { roomName: string; roomId: string; meetingLink: string }
  ) => {
    set(roomIdMapAtom, (prev) => ({ ...prev, [data.roomName]: data }));
  }
);
