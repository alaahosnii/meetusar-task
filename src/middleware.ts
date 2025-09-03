import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(req: NextRequest) {
    const token = req.cookies.get('meetusartoken')?.value    
    const { pathname } = req.nextUrl
    // if not logged in and trying to access dashboard, go to login
    if (!token && pathname === '/') {
        return NextResponse.redirect(new URL('/login', req.url))
    }


    // if logged in and trying to access login, go to dashboard
    if (token && pathname === '/login') {
        return NextResponse.redirect(new URL('/', req.url))
    }

    return NextResponse.next()
}

export const config = {
    matcher: ['/', '/login']
}
