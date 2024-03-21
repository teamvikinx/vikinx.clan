import { authMiddleware, redirectToSignIn } from '@clerk/nextjs';
import { fetchUser } from './lib/actions/users.action';
import { redirect } from 'next/navigation';

// See https://clerk.com/docs/references/nextjs/auth-middleware
// for more information about configuring your Middleware

export default authMiddleware({
    publicRoutes: [
        '/',
        '/about',
        '/contact',
        '/articles',
        '/api/webhook/clerk',
    ],
    ignoredRoutes: ['api/webhook/clerk'],
    async afterAuth(auth, req, evt) {
        // handle users who aren't authenticated
        if (!auth.userId && !auth.isPublicRoute) {
            return redirectToSignIn({ returnBackUrl: req.url });
        }
    },
});

export const config = {
    matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};
