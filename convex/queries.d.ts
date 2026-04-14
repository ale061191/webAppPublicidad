export declare const getTotems: import("convex/server").RegisteredQuery<"public", {}, Promise<{
    _id: import("convex/values").GenericId<"totems">;
    _creationTime: number;
    latency?: string | undefined;
    previewUrl?: string | undefined;
    name: string;
    serial: string;
    location: string;
    status: "online" | "offline" | "maintenance";
    lastSync: string;
}[]>>;
export declare const getMedia: import("convex/server").RegisteredQuery<"public", {}, Promise<{
    _id: import("convex/values").GenericId<"media">;
    _creationTime: number;
    duration?: string | undefined;
    isActive?: boolean | undefined;
    name: string;
    type: "image" | "video";
    format: string;
    size: string;
    resolution: string;
    thumbnailUrl: string;
    tags: string[];
}[]>>;
export declare const getPlaylists: import("convex/server").RegisteredQuery<"public", {}, Promise<{
    _id: import("convex/values").GenericId<"playlists">;
    _creationTime: number;
    isActive?: boolean | undefined;
    totemId?: import("convex/values").GenericId<"totems"> | undefined;
    name: string;
    items: import("convex/values").GenericId<"media">[];
}[]>>;
export declare const getUsers: import("convex/server").RegisteredQuery<"public", {}, Promise<{
    _id: import("convex/values").GenericId<"users">;
    _creationTime: number;
    role?: "admin" | "editor" | "viewer" | undefined;
    image?: string | undefined;
    name: string;
    email: string;
}[]>>;
export declare const getActiveMedia: import("convex/server").RegisteredQuery<"public", {}, Promise<{
    _id: import("convex/values").GenericId<"media">;
    _creationTime: number;
    duration?: string | undefined;
    isActive?: boolean | undefined;
    name: string;
    type: "image" | "video";
    format: string;
    size: string;
    resolution: string;
    thumbnailUrl: string;
    tags: string[];
}[]>>;
export declare const getOnlineTotems: import("convex/server").RegisteredQuery<"public", {}, Promise<{
    _id: import("convex/values").GenericId<"totems">;
    _creationTime: number;
    latency?: string | undefined;
    previewUrl?: string | undefined;
    name: string;
    serial: string;
    location: string;
    status: "online" | "offline" | "maintenance";
    lastSync: string;
}[]>>;
//# sourceMappingURL=queries.d.ts.map