import { query } from "./_generated/server";
import { v } from "convex/values";

export const getClients = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("clients").collect();
  },
});

export const getTotems = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("totems").collect();
  },
});

export const getMedia = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("media").collect();
  },
});

export const getPlaylists = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("playlists").collect();
  },
});

export const getUsers = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("users").collect();
  },
});

export const getActiveMedia = query({
  args: {},
  handler: async (ctx) => {
    const allMedia = await ctx.db.query("media").collect();
    return allMedia.filter((m: any) => m.isActive);
  },
});

export const getOnlineTotems = query({
  args: {},
  handler: async (ctx) => {
    const allTotems = await ctx.db.query("totems").collect();
    return allTotems.filter((t: any) => t.status === "online");
  },
});

export const getUserByEmail = query({
  args: { email: v.string() },
  handler: async (ctx, args) => {
    const users = await ctx.db.query("users").collect();
    return users.find((u: any) => u.email === args.email);
  },
});

export const getCurrentUser = query({
  args: {},
  handler: async (ctx) => {
    const users = await ctx.db.query("users").collect();
    return users[0];
  },
});