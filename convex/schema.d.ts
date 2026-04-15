declare const _default: import("convex/server").SchemaDefinition<{
    clients: import("convex/server").TableDefinition<import("convex/values").VObject<{
        phone?: string | undefined;
        address?: string | undefined;
        logoUrl?: string | undefined;
        isActive?: boolean | undefined;
        name: string;
        businessName: string;
        email: string;
        createdAt: string;
    }, {
        name: import("convex/values").VString<string, "required">;
        businessName: import("convex/values").VString<string, "required">;
        email: import("convex/values").VString<string, "required">;
        phone: import("convex/values").VString<string | undefined, "optional">;
        address: import("convex/values").VString<string | undefined, "optional">;
        logoUrl: import("convex/values").VString<string | undefined, "optional">;
        isActive: import("convex/values").VBoolean<boolean | undefined, "optional">;
        createdAt: import("convex/values").VString<string, "required">;
    }, "required", "name" | "businessName" | "email" | "phone" | "address" | "logoUrl" | "isActive" | "createdAt">, {
        email: ["email", "_creationTime"];
    }, {}, {}>;
    users: import("convex/server").TableDefinition<import("convex/values").VObject<{
        role?: "admin" | "editor" | "viewer" | undefined;
        image?: string | undefined;
        clientId?: import("convex/values").GenericId<"clients"> | undefined;
        name: string;
        email: string;
    }, {
        name: import("convex/values").VString<string, "required">;
        email: import("convex/values").VString<string, "required">;
        role: import("convex/values").VUnion<"admin" | "editor" | "viewer" | undefined, [import("convex/values").VLiteral<"admin", "required">, import("convex/values").VLiteral<"editor", "required">, import("convex/values").VLiteral<"viewer", "required">], "optional", never>;
        image: import("convex/values").VString<string | undefined, "optional">;
        clientId: import("convex/values").VId<import("convex/values").GenericId<"clients"> | undefined, "optional">;
    }, "required", "name" | "email" | "role" | "image" | "clientId">, {
        email: ["email", "_creationTime"];
    }, {}, {}>;
    totems: import("convex/server").TableDefinition<import("convex/values").VObject<{
        clientId?: import("convex/values").GenericId<"clients"> | undefined;
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
        clientId: import("convex/values").VId<import("convex/values").GenericId<"clients"> | undefined, "optional">;
    }, "required", "name" | "clientId" | "serial" | "location" | "status" | "lastSync" | "latency" | "previewUrl">, {
        serial: ["serial", "_creationTime"];
    }, {}, {}>;
    media: import("convex/server").TableDefinition<import("convex/values").VObject<{
        isActive?: boolean | undefined;
        clientId?: import("convex/values").GenericId<"clients"> | undefined;
        duration?: string | undefined;
        isGlobal?: boolean | undefined;
        name: string;
        type: "image" | "video";
        format: string;
        size: string;
        resolution: string;
        thumbnailUrl: string;
        url: string;
        tags: string[];
    }, {
        name: import("convex/values").VString<string, "required">;
        type: import("convex/values").VUnion<"image" | "video", [import("convex/values").VLiteral<"video", "required">, import("convex/values").VLiteral<"image", "required">], "required", never>;
        format: import("convex/values").VString<string, "required">;
        size: import("convex/values").VString<string, "required">;
        duration: import("convex/values").VString<string | undefined, "optional">;
        resolution: import("convex/values").VString<string, "required">;
        thumbnailUrl: import("convex/values").VString<string, "required">;
        url: import("convex/values").VString<string, "required">;
        tags: import("convex/values").VArray<string[], import("convex/values").VString<string, "required">, "required">;
        isActive: import("convex/values").VBoolean<boolean | undefined, "optional">;
        clientId: import("convex/values").VId<import("convex/values").GenericId<"clients"> | undefined, "optional">;
        isGlobal: import("convex/values").VBoolean<boolean | undefined, "optional">;
    }, "required", "name" | "isActive" | "type" | "clientId" | "format" | "size" | "duration" | "resolution" | "thumbnailUrl" | "url" | "tags" | "isGlobal">, {}, {}, {}>;
    playlists: import("convex/server").TableDefinition<import("convex/values").VObject<{
        isActive?: boolean | undefined;
        clientId?: import("convex/values").GenericId<"clients"> | undefined;
        totemId?: import("convex/values").GenericId<"totems"> | undefined;
        name: string;
        items: import("convex/values").GenericId<"media">[];
    }, {
        name: import("convex/values").VString<string, "required">;
        totemId: import("convex/values").VId<import("convex/values").GenericId<"totems"> | undefined, "optional">;
        items: import("convex/values").VArray<import("convex/values").GenericId<"media">[], import("convex/values").VId<import("convex/values").GenericId<"media">, "required">, "required">;
        isActive: import("convex/values").VBoolean<boolean | undefined, "optional">;
        clientId: import("convex/values").VId<import("convex/values").GenericId<"clients"> | undefined, "optional">;
    }, "required", "name" | "isActive" | "clientId" | "totemId" | "items">, {}, {}, {}>;
}, true>;
export default _default;
//# sourceMappingURL=schema.d.ts.map