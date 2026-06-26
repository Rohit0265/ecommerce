import { getAuth } from "@hono/clerk-auth";
import { createMiddleware } from "hono/factory";
export const shouldBeUser = createMiddleware(async (c, next) => {
    const auth = getAuth(c);
    if (!auth?.userId) {
        return c.json({
            message: "You are not logged in.",
        });
    }
    c.set("userId", auth.userId);
    await next();
});
export const shouldBeAdmin = createMiddleware(async (c, next) => {
    const auth = getAuth(c);
    if (!auth?.userId) {
        return c.json({
            message: "You are not logged in.",
        });
    }
    c.set("userId", auth.userId);
    const claims = auth.sessionClaims;
    if (claims?.metadata?.role !== "admin") {
        return c.json({ success: false, message: "Unauthorized" });
    }
    await next();
});
