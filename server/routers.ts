import { z } from "zod";
import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { protectedProcedure, publicProcedure, router } from "./_core/trpc";
import { createWorkbenchSnapshot, getWorkbenchState, listWorkbenchSnapshots, saveWorkbenchState } from "./db";

const stateInput = z.object({ state: z.string().max(500_000) });
const snapshotInput = z.object({ label: z.string().trim().min(1).max(160), state: z.string().max(500_000) });

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return { success: true } as const;
    }),
  }),
  workbench: router({
    current: protectedProcedure.query(({ ctx }) => getWorkbenchState(ctx.user.id)),
    save: protectedProcedure.input(stateInput).mutation(({ ctx, input }) => saveWorkbenchState(ctx.user.id, input.state)),
    snapshot: protectedProcedure.input(snapshotInput).mutation(({ ctx, input }) => createWorkbenchSnapshot(ctx.user.id, input.label, input.state)),
    snapshots: protectedProcedure.query(({ ctx }) => listWorkbenchSnapshots(ctx.user.id)),
  }),
});

export type AppRouter = typeof appRouter;
