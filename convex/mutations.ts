import { mutation } from "./_generated/server";
import { v } from "convex/values";

// === CLIENTS ===
export const createClient = mutation({
  args: {
    name: v.string(),
    businessName: v.string(),
    email: v.string(),
    phone: v.optional(v.string()),
    address: v.optional(v.string()),
    logoUrl: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const id = await ctx.db.insert("clients", {
      ...args,
      isActive: true,
      createdAt: new Date().toISOString(),
    });
    return id;
  },
});

export const updateClient = mutation({
  args: {
    id: v.id("clients"),
    name: v.optional(v.string()),
    businessName: v.optional(v.string()),
    email: v.optional(v.string()),
    phone: v.optional(v.string()),
    address: v.optional(v.string()),
    logoUrl: v.optional(v.string()),
    isActive: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    const { id, ...updates } = args;
    await ctx.db.patch(id, updates);
  },
});

export const deleteClient = mutation({
  args: { id: v.id("clients") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});

// === TOTEMS ===
export const createTotem = mutation({
  args: {
    name: v.string(),
    serial: v.string(),
    location: v.string(),
    status: v.union(v.literal("online"), v.literal("offline"), v.literal("maintenance")),
    lastSync: v.string(),
    latency: v.optional(v.string()),
    previewUrl: v.optional(v.string()),
    clientId: v.optional(v.id("clients")),
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
    clientId: v.optional(v.id("clients")),
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

// === MEDIA ===
export const createMedia = mutation({
  args: {
    name: v.string(),
    type: v.union(v.literal("video"), v.literal("image")),
    format: v.string(),
    size: v.string(),
    duration: v.optional(v.string()),
    resolution: v.string(),
    thumbnailUrl: v.optional(v.string()),
    url: v.optional(v.string()),
    tags: v.array(v.string()),
    clientId: v.optional(v.id("clients")),
    isGlobal: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    const { url, clientId, isGlobal, ...rest } = args;
    const id = await ctx.db.insert("media", { 
      ...rest,
      isActive: false,
      thumbnailUrl: args.thumbnailUrl || "",
      url: url || "",
      clientId: clientId,
      isGlobal: isGlobal || false,
    });
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
    url: v.optional(v.string()),
    tags: v.optional(v.array(v.string())),
    isActive: v.optional(v.boolean()),
    clientId: v.optional(v.id("clients")),
    isGlobal: v.optional(v.boolean()),
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

export const toggleMediaActive = mutation({
  args: { id: v.id("media") },
  handler: async (ctx, args) => {
    const media = await ctx.db.get(args.id);
    if (media) {
      await ctx.db.patch(args.id, { isActive: !media.isActive });
    }
  },
});

// === PLAYLISTS ===
export const createPlaylist = mutation({
  args: {
    name: v.string(),
    totemId: v.optional(v.id("totems")),
    items: v.array(v.id("media")),
    clientId: v.optional(v.id("clients")),
  },
  handler: async (ctx, args) => {
    const id = await ctx.db.insert("playlists", { 
      ...args, 
      isActive: false,
    });
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

// === USERS ===
export const createUser = mutation({
  args: {
    name: v.string(),
    email: v.string(),
    role: v.optional(v.union(v.literal("admin"), v.literal("editor"), v.literal("viewer"))),
    image: v.optional(v.string()),
    clientId: v.optional(v.id("clients")),
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