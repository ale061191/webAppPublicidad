import { ConvexReactClient } from "convex/react";

const convexAddress = process.env.NEXT_PUBLIC_CONVEX_URL || "https://peaceful-curlew-702.convex.cloud";

export const convex = new ConvexReactClient(convexAddress);