import { authMiddleware, redirectToSignIn } from "@clerk/nextjs";
import { rateLimitMiddleware } from "./middlewares/rateLimit";
import { NextResponse } from "next/server";
import { HttpStatusCode } from "axios";
import { isUserAllowed } from "./middlewares/userAllowed";

const rateLimitRoutes = ["/api/contact", "/api/newsletter"];

export default authMiddleware({
  publicRoutes: [
    "/",
    "/about",
    "/contact",
    "/articles",
    "/gallery",
    "/rider-diaries",
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

    if (auth.userId) {
      const isAllowed = await isUserAllowed(req, auth.userId);

      return isAllowed
        ? NextResponse.next()
        : NextResponse.json(
            {
              message:
                "Your account is temporarily suspended. Please contact the VikinX support team for assistance.",
            },
            { status: HttpStatusCode.BadRequest }
          );
    }

    if (rateLimitRoutes.some((route) => new RegExp(route).test(req.url))) {
      const isAllowed = await rateLimitMiddleware(req);

      return isAllowed
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
