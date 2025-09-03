import { withAuth } from "next-auth/middleware";

export default withAuth({
  callbacks: {
    authorized: ({ token, req }) => {
      const path = req.nextUrl.pathname;
      
      // Admin routes require SUPER_ADMIN
      if (path.startsWith('/admin')) {
        return token?.role === 'SUPER_ADMIN';
      }
      
      return !!token;
    },
  },
});

export const config = { matcher: ["/admin/:path*"] };