export const ROUTE_URL = {
    AUTH: {
        INDEX: "/auth",
        LOGIN: "login",
        REGISTER: "register",
    },
    ADMIN: {
        INDEX: "/admin",

        MANAGER: {
            USERS: "/admin/users",
            METERS: "/admin/meters",
            LOCATION: "/admin/locations",
            MEASUREMENT: "/admin/measurements",
            INVOICE: "/admin/invoices",
        },
    },
    USER: {
        INDEX: "/",
        HOME: "home",
        MEASUREMENT: "/user/measurements",
        SETTING: "settings",
    },
};

export const API_URL = {
    AUTH: {
        LOGIN: "/auth/login",
        REGISTER: "/auth/register",
        LOGOUT: "/auth/logout",
    },
    USER: {
        INDEX: "/user",
        SEARCH: "/search",
    },

    METER: {
        INDEX: "/meter",
        ASSIGN: "/assign",
    },

    ADDRESS: {
        INDEX: "/address",
        ADD: "/add",
    },

    LOCATION: {
        INDEX: "/location",
    },
    MEASUREMENT: {
        INDEX: "/measurement",
        SETUP: "/set-up",
    },
    INVOICE: {
        INDEX: "/invoice",
    },
    EMAIL: {
        INDEX: "/email",
        SEND_ALL: "/send-all",
    },
    STATS: {
        INDEX: "/stats",
        MONTHLY: "/monthly-consumption",
    },
};
