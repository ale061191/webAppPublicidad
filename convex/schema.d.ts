declare const _default: import("convex/server").SchemaDefinition<{
    users: import("convex/server").TableDefinition<import("convex/values").VObject<{
        role?: "admin" | "editor" | "viewer" | undefined;
        image?: string | undefined;
        name: string;
        email: string;
    }, {
        name: import("convex/values").VString<string, "required">;
        email: import("convex/values").VString<string, "required">;
        role: import("convex/values").VUnion<"admin" | "editor" | "viewer" | undefined, [import("convex/values").VLiteral<"admin", "required">, import("convex/values").VLiteral<"editor", "required">, import("convex/values").VLiteral<"viewer", "required">], "optional", never>;
        image: import("convex/values").VString<string | undefined, "optional">;
    }, "required", "name" | "email" | "role" | "image">, {
        email: ["email", "_creationTime"];
    }, {}, {}>;
    totems: import("convex/server").TableDefinition<import("convex/values").VObject<{
        latency?: string | undefined;
        previewUrl?: string | undefined;
        name: string;
        serial: string;
        location: string;
        status: "online" | "offline" | "maintenance";
        lastSync: string;
    }, {
        name: import("convex/values").VString<string, "required">;
        serial: import("convex/values").VString<string, "required">;
        location: import("convex/values").VString<string, "required">;
        status: import("convex/values").VUnion<"online" | "offline" | "maintenance", [import("convex/values").VLiteral<"online", "required">, import("convex/values").VLiteral<"offline", "required">, import("convex/values").VLiteral<"maintenance", "required">], "required", never>;
        lastSync: import("convex/values").VString<string, "required">;
        latency: import("convex/values").VString<string | undefined, "optional">;
        previewUrl: import("convex/values").VString<string | undefined, "optional">;
    }, "required", "name" | "serial" | "location" | "status" | "lastSync" | "latency" | "previewUrl">, {
        serial: ["serial", "_creationTime"];
    }, {}, {}>;
    media: import("convex/server").TableDefinition<import("convex/values").VObject<{
        duration?: string | undefined;
        isActive?: boolean | undefined;
        name: string;
        type: "image" | "video";
        format: string;
        size: string;
        resolution: string;
        thumbnailUrl: string;
        tags: string[];
    }, {
        name: import("convex/values").VString<string, "required">;
        type: import("convex/values").VUnion<"image" | "video", [import("convex/values").VLiteral<"video", "required">, import("convex/values").VLiteral<"image", "required">], "required", never>;
        format: import("convex/values").VString<string, "required">;
        size: import("convex/values").VString<string, "required">;
        duration: import("convex/values").VString<string | undefined, "optional">;
        resolution: import("convex/values").VString<string, "required">;
        thumbnailUrl: import("convex/values").VString<string, "required">;
        tags: import("convex/values").VArray<string[], import("convex/values").VString<string, "required">, "required">;
        isActive: import("convex/values").VBoolean<boolean | undefined, "optional">;
    }, "required", "name" | "type" | "format" | "size" | "duration" | "resolution" | "thumbnailUrl" | "tags" | "isActive">, {}, {}, {}>;
    playlists: import("convex/server").TableDefinition<import("convex/values").VObject<{
        isActive?: boolean | undefined;
        totemId?: import("convex/values").GenericId<"totems"> | undefined;
        name: string;
        items: import("convex/values").GenericId<"media">[];
    }, {
        name: import("convex/values").VString<string, "required">;
        totemId: import("convex/values").VId<import("convex/values").GenericId<"totems"> | undefined, "optional">;
        items: import("convex/values").VArray<import("convex/values").GenericId<"media">[], import("convex/values").VId<import("convex/values").GenericId<"media">, "required">, "required">;
        isActive: import("convex/values").VBoolean<boolean | undefined, "optional">;
    }, "required", "name" | "isActive" | "totemId" | "items">, {}, {}, {}>;
}, true>;
export default _default;
//# sourceMappingURL=schema.d.ts.map