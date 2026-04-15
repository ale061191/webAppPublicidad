export declare const createClient: import("convex/server").RegisteredMutation<"public", {
    phone?: string | undefined;
    address?: string | undefined;
    logoUrl?: string | undefined;
    name: string;
    businessName: string;
    email: string;
}, Promise<import("convex/values").GenericId<"clients">>>;
export declare const updateClient: import("convex/server").RegisteredMutation<"public", {
    name?: string | undefined;
    businessName?: string | undefined;
    email?: string | undefined;
    phone?: string | undefined;
    address?: string | undefined;
    logoUrl?: string | undefined;
    isActive?: boolean | undefined;
    id: import("convex/values").GenericId<"clients">;
}, Promise<void>>;
export declare const deleteClient: import("convex/server").RegisteredMutation<"public", {
    id: import("convex/values").GenericId<"clients">;
}, Promise<void>>;
export declare const createTotem: import("convex/server").RegisteredMutation<"public", {
    clientId?: import("convex/values").GenericId<"clients"> | undefined;
    latency?: string | undefined;
    previewUrl?: string | undefined;
    name: string;
    serial: string;
    location: string;
    status: "online" | "offline" | "maintenance";
    lastSync: string;
}, Promise<import("convex/values").GenericId<"totems">>>;
export declare const updateTotem: import("convex/server").RegisteredMutation<"public", {
    name?: string | undefined;
    clientId?: import("convex/values").GenericId<"clients"> | undefined;
    serial?: string | undefined;
    location?: string | undefined;
    status?: "online" | "offline" | "maintenance" | undefined;
    lastSync?: string | undefined;
    latency?: string | undefined;
    previewUrl?: string | undefined;
    id: import("convex/values").GenericId<"totems">;
}, Promise<void>>;
export declare const deleteTotem: import("convex/server").RegisteredMutation<"public", {
    id: import("convex/values").GenericId<"totems">;
}, Promise<void>>;
export declare const createMedia: import("convex/server").RegisteredMutation<"public", {
    clientId?: import("convex/values").GenericId<"clients"> | undefined;
    duration?: string | undefined;
    thumbnailUrl?: string | undefined;
    url?: string | undefined;
    isGlobal?: boolean | undefined;
    name: string;
    type: "image" | "video";
    format: string;
    size: string;
    resolution: string;
    tags: string[];
}, Promise<import("convex/values").GenericId<"media">>>;
export declare const updateMedia: import("convex/server").RegisteredMutation<"public", {
    name?: string | undefined;
    isActive?: boolean | undefined;
    type?: "image" | "video" | undefined;
    clientId?: import("convex/values").GenericId<"clients"> | undefined;
    format?: string | undefined;
    size?: string | undefined;
    duration?: string | undefined;
    resolution?: string | undefined;
    thumbnailUrl?: string | undefined;
    url?: string | undefined;
    tags?: string[] | undefined;
    isGlobal?: boolean | undefined;
    id: import("convex/values").GenericId<"media">;
}, Promise<void>>;
export declare const deleteMedia: import("convex/server").RegisteredMutation<"public", {
    id: import("convex/values").GenericId<"media">;
}, Promise<void>>;
export declare const toggleMediaActive: import("convex/server").RegisteredMutation<"public", {
    id: import("convex/values").GenericId<"media">;
}, Promise<void>>;
export declare const createPlaylist: import("convex/server").RegisteredMutation<"public", {
    clientId?: import("convex/values").GenericId<"clients"> | undefined;
    totemId?: import("convex/values").GenericId<"totems"> | undefined;
    name: string;
    items: import("convex/values").GenericId<"media">[];
}, Promise<import("convex/values").GenericId<"playlists">>>;
export declare const updatePlaylist: import("convex/server").RegisteredMutation<"public", {
    name?: string | undefined;
    isActive?: boolean | undefined;
    totemId?: import("convex/values").GenericId<"totems"> | undefined;
    items?: import("convex/values").GenericId<"media">[] | undefined;
    id: import("convex/values").GenericId<"playlists">;
}, Promise<void>>;
export declare const deletePlaylist: import("convex/server").RegisteredMutation<"public", {
    id: import("convex/values").GenericId<"playlists">;
}, Promise<void>>;
//# sourceMappingURL=mutations.d.ts.map