export declare const shouldBeUser: import("hono").MiddlewareHandler<{
    Variables: {
        userId: string;
    };
}, string, {}, Response>;
export declare const shouldBeAdmin: import("hono").MiddlewareHandler<{
    Variables: {
        userId: string;
    };
}, string, {}, Response>;
//# sourceMappingURL=authMiddleware.d.ts.map