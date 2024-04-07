import { authMiddleware, redirectToSignIn } from "@clerk/nextjs";
import { rateLimitMiddleware } from "./middlewares/rateLimit";
import { NextResponse } from "next/server";

const rateLimitRoutes = ["/api/contact", "/api/newsletter"];

export default authMiddleware({
  publicRoutes: [
    "/",
    "/about",
    "/contact",
    "/articles",
    "/gallery",
    "/events",
    "/events/:id",
    "/terms-and-conditions",
    "/privacy-policy",
    "/api/webhook/clerk",
    "/api/gallery",
    "/api/users",
    "/api/contact",
    "/api/newsletter",
    "/api/blocked",
  ],
  ignoredRoutes: ["api/webhook/clerk", "/api/gallery", "/api/users"],
  async afterAuth(auth, req, evt) {
    // Handle users who aren't authenticated
    if (!auth.userId && !auth.isPublicRoute) {
      return redirectToSignIn({ returnBackUrl: req.url });
    }

    if (rateLimitRoutes.some((route) => new RegExp(route).test(req.url))) {
      const isBlocked = await rateLimitMiddleware(req);

      return isBlocked
        ? NextResponse.next()
        : NextResponse.json(
            {
              message:
                "Your request has been rate limited. Please try again after sometime!",
            },
            {
              status: 423,
            }
          );
    }

    // Continue with the request if authenticated
    return NextResponse.next();
  },
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
