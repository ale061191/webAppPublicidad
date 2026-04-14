import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const createTotem = mutation({
  args: {
    name: v.string(),
    serial: v.string(),
    location: v.string(),
    status: v.union(v.literal("online"), v.literal("offline"), v.literal("maintenance")),
    lastSync: v.string(),
    latency: v.optional(v.string()),
    previewUrl: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const id = await ctx.db.insert("totems", args);
    return id;
  },
});

export const updateTotem = mutation({
  args: {
    id: v.id("totems"),
    name: v.optional(v.string()),
    serial: v.optional(v.string()),
    location: v.optional(v.string()),
    status: v.optional(v.union(v.literal("online"), v.literal("offline"), v.literal("maintenance"))),
    lastSync: v.optional(v.string()),
    latency: v.optional(v.string()),
    previewUrl: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const { id, ...updates } = args;
    await ctx.db.patch(id, updates);
  },
});

export const deleteTotem = mutation({
  args: { id: v.id("totems") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});

export const createMedia = mutation({
  args: {
    name: v.string(),
    type: v.union(v.literal("video"), v.literal("image")),
    format: v.string(),
    size: v.string(),
    duration: v.optional(v.string()),
    resolution: v.string(),
    thumbnailUrl: v.string(),
    tags: v.array(v.string()),
    isActive: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    const id = await ctx.db.insert("media", { ...args, isActive: args.isActive ?? false });
    return id;
  },
});

export const updateMedia = mutation({
  args: {
    id: v.id("media"),
    name: v.optional(v.string()),
    type: v.optional(v.union(v.literal("video"), v.literal("image"))),
    format: v.optional(v.string()),
    size: v.optional(v.string()),
    duration: v.optional(v.string()),
    resolution: v.optional(v.string()),
    thumbnailUrl: v.optional(v.string()),
    tags: v.optional(v.array(v.string())),
    isActive: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    const { id, ...updates } = args;
    await ctx.db.patch(id, updates);
  },
});

export const deleteMedia = mutation({
  args: { id: v.id("media") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});

export const createPlaylist = mutation({
  args: {
    name: v.string(),
    totemId: v.optional(v.id("totems")),
    items: v.array(v.id("media")),
    isActive: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    const id = await ctx.db.insert("playlists", { ...args, isActive: args.isActive ?? false });
    return id;
  },
});

export const updatePlaylist = mutation({
  args: {
    id: v.id("playlists"),
    name: v.optional(v.string()),
    totemId: v.optional(v.id("totems")),
    items: v.optional(v.array(v.id("media"))),
    isActive: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    const { id, ...updates } = args;
    await ctx.db.patch(id, updates);
  },
});

export const deletePlaylist = mutation({
  args: { id: v.id("playlists") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});

export const createUser = mutation({
  args: {
    name: v.string(),
    email: v.string(),
    role: v.optional(v.union(v.literal("admin"), v.literal("editor"), v.literal("viewer"))),
    image: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const id = await ctx.db.insert("users", args);
    return id;
  },
});

export const updateUser = mutation({
  args: {
    id: v.id("users"),
    name: v.optional(v.string()),
    email: v.optional(v.string()),
    role: v.optional(v.union(v.literal("admin"), v.literal("editor"), v.literal("viewer"))),
    image: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const { id, ...updates } = args;
    await ctx.db.patch(id, updates);
  },
});

export const deleteUser = mutation({
  args: { id: v.id("users") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});

export const toggleMediaActive = mutation({
  args: { id: v.id("media") },
  handler: async (ctx, args) => {
    const media = await ctx.db.get(args.id);
    if (media) {
      await ctx.db.patch(args.id, { isActive: !media.isActive });
    }
  },
});

export const togglePlaylistActive = mutation({
  args: { id: v.id("playlists") },
  handler: async (ctx, args) => {
    const playlist = await ctx.db.get(args.id);
    if (playlist) {
      await ctx.db.patch(args.id, { isActive: !playlist.isActive });
    }
  },
});