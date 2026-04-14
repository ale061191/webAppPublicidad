export declare const createTotem: import("convex/server").RegisteredMutation<"public", {
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
    duration?: string | undefined;
    isActive?: boolean | undefined;
    name: string;
    type: "image" | "video";
    format: string;
    size: string;
    resolution: string;
    thumbnailUrl: string;
    tags: string[];
}, Promise<import("convex/values").GenericId<"media">>>;
export declare const updateMedia: import("convex/server").RegisteredMutation<"public", {
    name?: string | undefined;
    type?: "image" | "video" | undefined;
    format?: string | undefined;
    size?: string | undefined;
    duration?: string | undefined;
    resolution?: string | undefined;
    thumbnailUrl?: string | undefined;
    tags?: string[] | undefined;
    isActive?: boolean | undefined;
    id: import("convex/values").GenericId<"media">;
}, Promise<void>>;
export declare const deleteMedia: import("convex/server").RegisteredMutation<"public", {
    id: import("convex/values").GenericId<"media">;
}, Promise<void>>;
export declare const createPlaylist: import("convex/server").RegisteredMutation<"public", {
    isActive?: boolean | undefined;
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
export declare const createUser: import("convex/server").RegisteredMutation<"public", {
    role?: "admin" | "editor" | "viewer" | undefined;
    image?: string | undefined;
    name: string;
    email: string;
}, Promise<import("convex/values").GenericId<"users">>>;
export declare const updateUser: import("convex/server").RegisteredMutation<"public", {
    name?: string | undefined;
    email?: string | undefined;
    role?: "admin" | "editor" | "viewer" | undefined;
    image?: string | undefined;
    id: import("convex/values").GenericId<"users">;
}, Promise<void>>;
export declare const deleteUser: import("convex/server").RegisteredMutation<"public", {
    id: import("convex/values").GenericId<"users">;
}, Promise<void>>;
export declare const toggleMediaActive: import("convex/server").RegisteredMutation<"public", {
    id: import("convex/values").GenericId<"media">;
}, Promise<void>>;
export declare const togglePlaylistActive: import("convex/server").RegisteredMutation<"public", {
    id: import("convex/values").GenericId<"playlists">;
}, Promise<void>>;
//# sourceMappingURL=mutations.d.ts.map