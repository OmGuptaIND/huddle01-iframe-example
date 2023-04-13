import { atom } from "jotai";

import { useSetAtom } from "jotai/react";

interface DeviceState {
  mediaDevices: MediaDeviceInfo[];
  loading: boolean;
  permission: "granted" | "denied" | "prompt";
  error?: {
    message: unknown | null;
    blocked: boolean;
  };
}

export type IStreamMap = Map<string, IStreamController<IStreamAppData>>;

export type IStreamController<T> = {
  stream: MediaStream;
  appData?: T;
};

export type IStreamAppData = {
  type: "cam" | "mic" | "screen";
};

export const camAtom = atom<DeviceState>({
  mediaDevices: [],
  loading: true,
  permission: "prompt",
});

export const camPermissionAtom = atom<DeviceState["permission"]>(
  (get) => get(camAtom).permission
);

export const videoStreamMapAtom = atom<IStreamMap>(
  new Map<string, IStreamController<IStreamAppData>>()
);

export const promptCameraDevice = atom(null, async (get, set) => {
  const permissionState = get(camPermissionAtom);

  if (permissionState === "prompt") {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then(async (stream) => {
        stream.getTracks().forEach((track) => track.stop());

        const devices = await navigator.mediaDevices.enumerateDevices();

        console.log({ devices });

        set(camAtom, {
          mediaDevices: [],
          loading: false,
          permission: "granted",
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }
});

export const usePromptCameraDevice = () => {
  const promptFn = useSetAtom(promptCameraDevice);
  return {
    promptFn,
  };
};
