import { TRPCError } from "@trpc/server";
import axios from "axios";
import { z } from "zod";
import { env } from "~/env.mjs";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const TokenType = {
  ERC20: "ERC20",
  ERC721: "ERC721",
  ERC1155: "ERC1155",
  SPL: "SPL",
  BEP20: "BEP20",
  BEP721: "BEP721",
  BEP1155: "BEP1155",
  COSMOS: "COSMOS",
  TEZOS: "TEZOS",
  POAP: "POAP",
  LENS: "LENS",
  CYBERCONNECT: "CYBERCONNECT",
};

export const Chain = {
  ETHEREUM: "ETHEREUM",
  POLYGON: "POLYGON",
  SOLANA: "SOLANA",
  COSMOS: "COSMOS",
  TEZOS: "TEZOS",
  BSC: "BSC",
};

export const TokenGatingConditionType = {
  HAVE_HANDLE: "HAVE_HANDLE",
  FOLLOW_HANDLE: "FOLLOW_HANDLE",
  COLLECT_POST: "COLLECT_POST",
  MIRROR_POST: "MIRROR_POST",
};

export const roomSchema = z.object({
  title: z.string(),
  description: z.string().min(1).max(100).optional(),
  startTime: z.string().optional(),
  expiryTime: z.string().optional(),
  hostWallets: z.array(z.string()).optional(),
  roomLocked: z.boolean().default(true),
  muteOnEntry: z.boolean().optional(),
  videoOnEntry: z.boolean().optional(),
  tokenType: z
    .enum([
      TokenType.ERC20,
      TokenType.ERC721,
      TokenType.ERC1155,
      TokenType.SPL,
      TokenType.BEP20,
      TokenType.BEP721,
      TokenType.BEP1155,
      TokenType.COSMOS,
      TokenType.TEZOS,
      TokenType.LENS,
      TokenType.POAP,
      TokenType.CYBERCONNECT,
    ])
    .optional(),

  contractAddress: z.array(z.string()).optional(),

  chain: z
    .enum([
      Chain.ETHEREUM,
      Chain.COSMOS,
      Chain.SOLANA,
      Chain.TEZOS,
      Chain.POLYGON,
      Chain.BSC,
    ])
    .optional(),

  conditionType: z
    .enum([
      TokenGatingConditionType.COLLECT_POST,
      TokenGatingConditionType.FOLLOW_HANDLE,
      TokenGatingConditionType.HAVE_HANDLE,
      TokenGatingConditionType.MIRROR_POST,
    ])
    .optional(),

  conditionValue: z.string().optional(),
});

export const roomOutputDataSchema = z.object({
  roomId: z.string().min(1, {
    message: "Room Id is Necessary",
  }),
  meetingLink: z.string().optional(),
});

export const roomOutputSchema = z.object({
  message: z.string(),
  data: roomOutputDataSchema.optional(),
  code: z.enum(["INVALID_TOKEN_GATING_DATA", "ERROR_CREATING_ROOM"]).optional(),
});

const joinRoomOutputSchema = z.object({
  token: z.string(),
  hostUrl: z.string(),
  redirectUrl: z.string(),
});

export type IJoinRoomOutputSchema = z.infer<typeof joinRoomOutputSchema>;

export type IRoomResponseSchema = z.infer<typeof roomOutputSchema>;

export const joinRoomSchema = z.object({
  roomId: z.string(),
  displayName: z
    .string()
    .min(1, {
      message: "Display name must be at least 1 character",
    })
    .optional(),
  userType: z.enum(["host", "guest"]).default("guest"),
  avatarUrl: z
    .string()
    .min(1, {
      message: "Avatar url must be at least 1 character",
    })
    .optional(),
  guestAsHost: z.boolean().default(false),
});

export type IJoinRoomSchema = z.infer<typeof joinRoomSchema>;

export const roomRouter = createTRPCRouter({
  createHuddleIframeRoom: publicProcedure
    .input(roomSchema)
    .mutation(async ({ input }) => {
      try {
        const room = await axios.post<IRoomResponseSchema>(
          `${env.NEXT_PUBLIC_HUDDLE_URL}/create-iframe-room`,
          input,
          {
            headers: {
              "x-api-key": env.HUDDLE_API_KEY,
            },
          }
        );

        const { data: roomData } = room;

        if (
          !roomData ||
          roomData.code ||
          !roomData.data ||
          !roomData.data.meetingLink
        ) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: roomData.code,
          });
        }

        return {
          roomId: roomData.data?.roomId,
          meetingLink: roomData.data?.meetingLink,
        };
      } catch (error) {
        console.error({ error });

        throw new TRPCError({
          code: "BAD_REQUEST",
          cause: error,
          message: "Error creating room",
        });
      }
    }),

  createJoinRoomHandler: publicProcedure
    .input(joinRoomSchema)
    .mutation(async ({ input }) => {
      try {
        const joinRoomToken = await axios.post<IJoinRoomOutputSchema>(
          `${env.NEXT_PUBLIC_HUDDLE_URL}/join-room-token`,
          input,
          {
            headers: {
              "x-api-key": env.HUDDLE_API_KEY,
            },
          }
        );

        const { data: joinToken } = joinRoomToken;

        const { token, redirectUrl, hostUrl } = joinToken;

        return {
          token,
          redirectUrl,
          hostUrl,
        };
      } catch (error) {
        console.error({ error });

        throw new TRPCError({
          code: "BAD_REQUEST",
          cause: error,
          message: "Error creating Join Room Token",
        });
      }
    }),
});
