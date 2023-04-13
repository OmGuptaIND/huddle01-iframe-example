import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:6969/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
});

export type ICreateRoomResp = {
  message: string;
  data: {
    roomId: string;
    meetingLink?: string;
  };
};

export const createHuddleRoom = async () => {
  try {
    const payload = await api.post<ICreateRoomResp>("/create-iframe-room", {
      title: "Test Room",
    });

    const { data } = payload;

    return data;
  } catch (error) {
    console.error({ error });
    return null;
  }
};

export const createJoinRoom = async (roomId: string) => {
  try {
    const payload = await api.post<ICreateRoomResp>("/join-room-token", {
      roomId,
    });

    const { data } = payload;

    return data;
  } catch (error) {
    console.error({ error });
    return null;
  }
};
