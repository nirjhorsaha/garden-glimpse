/* eslint-disable prettier/prettier */
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

import { getCurrentUser } from "./services/AuthServices";

const AuthRoutes = ["/login", "/signup"];

type Role = keyof typeof roleBasedRoutes;

const roleBasedRoutes = {
    user: [/^\/profile/, /^\/post/],
    admin: [/^\/admin/],
};

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // console.log({pathname});

    const user = await getCurrentUser();
    // console.log({user})

    if (!user) {
        if (AuthRoutes.includes(pathname)) {
            return NextResponse.next();
        } else {
            return NextResponse.redirect(
                new URL(`/login?redirect=${pathname}`, request.url),
            );
        }
    }

    if (user?.role && roleBasedRoutes[user?.role as Role]) {
        const routes = roleBasedRoutes[user?.role as Role];

        if (routes.some((route) => pathname.match(route))) {
            return NextResponse.next();
        }
    }

    return NextResponse.redirect(new URL("/", request.url));
}

export const config = {
    matcher: ["/profile", "/post/:page*", "/admin", "/login", "/register"],
};
