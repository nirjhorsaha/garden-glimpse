import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

import { getCurrentUser } from "./services/AuthServices";

const AuthRoutes = ["/login", "/signup"];

type Role = keyof typeof roleBasedRoutes;

// Routes accessible by regular users & admin users
const roleBasedRoutes = {
    user: [/^\/profile/],
    admin: [/^\/admin/],
};


export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // console.log({pathname});

    const userData = await getCurrentUser();
    const user = userData?.data
    // console.log('middleware user', user)

    if (!user) {
        if (AuthRoutes.includes(pathname)) {
            return NextResponse.next();
        } else {
            return NextResponse.redirect(
                new URL(`/login?redirect=${pathname}`, request.url),
            );
        }
    }

    // If the user is authenticated, check their role for access to specific routes.
    if (user?.role && roleBasedRoutes[user?.role as Role]) {
        const routes = roleBasedRoutes[user?.role as Role];

        if (routes.some((route) => pathname.match(route))) {
            return NextResponse.next();
        }
    }

    // Redirect to home if access is denied.
    return NextResponse.redirect(new URL("/", request.url));
}

// Routes to apply the middleware
export const config = {
    matcher: ["/profile", "/admin", "/login", "/register"],
};
