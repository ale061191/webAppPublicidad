import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  clients: defineTable({
    name: v.string(),
    businessName: v.string(),
    email: v.string(),
    phone: v.optional(v.string()),
    address: v.optional(v.string()),
    logoUrl: v.optional(v.string()),
    isActive: v.optional(v.boolean()),
    createdAt: v.string(),
  }).index("email", ["email"]),

  users: defineTable({
    name: v.string(),
    email: v.string(),
    role: v.optional(v.union(v.literal("admin"), v.literal("editor"), v.literal("viewer"))),
    image: v.optional(v.string()),
    clientId: v.optional(v.id("clients")),
  }).index("email", ["email"]),

  totems: defineTable({
    name: v.string(),
    serial: v.string(),
    location: v.string(),
    status: v.union(v.literal("online"), v.literal("offline"), v.literal("maintenance")),
    lastSync: v.string(),
    latency: v.optional(v.string()),
    previewUrl: v.optional(v.string()),
    clientId: v.optional(v.id("clients")),
  }).index("serial", ["serial"]),

  media: defineTable({
    name: v.string(),
    type: v.union(v.literal("video"), v.literal("image")),
    format: v.string(),
    size: v.string(),
    duration: v.optional(v.string()),
    resolution: v.string(),
    thumbnailUrl: v.string(),
    url: v.string(),
    tags: v.array(v.string()),
    isActive: v.optional(v.boolean()),
    clientId: v.optional(v.id("clients")),
    isGlobal: v.optional(v.boolean()),
  }),

  playlists: defineTable({
    name: v.string(),
    totemId: v.optional(v.id("totems")),
    items: v.array(v.id("media")),
    isActive: v.optional(v.boolean()),
    clientId: v.optional(v.id("clients")),
  }),
});