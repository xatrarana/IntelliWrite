/**
 * Array of routes that are accessible to public
 * These routes do not require authentication
 * @type {string[]}
 */
export const publicRoutes = [
    "/"
]

/**
 * Array of routes that are requried authentication
 * These routes require authentication
 * @type {string[]}
 */
export const authRoutes = [
    "/auth/login",
    "/auth/register",
    "/auth/error"
]

/**
 * The prefix for API authentication routes
 * These routes are used for API authentication purposes
 * @type {string}
 */
export const apiAuthPrefix = "/api/auth"


export const DEFAULT_LOGIN_REDIRECT_URL = "/settings"