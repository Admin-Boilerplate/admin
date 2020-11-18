import {NbMenuItem} from "@nebular/theme";

export const MENU_ITEMS: NbMenuItem[] = [
    {
        title: "Dashboard",
        icon: "home-outline",
        link: "/pages/dashboard",
        home: true,
    },
    {
        title: "Χρήστες",
        icon: "person-outline",
        children: [
            {
                title: "Λίστα χρηστών",
                link: "/pages/users"
            },
            {
                title: "Δημιουργία χρήστη",
                link: "/pages/users/create"
            }
        ]
    },
    {
        title: "Auth",
        icon: "lock-outline",
        children: [
            {
                title: "Login",
                link: "/auth/login",
            },
            {
                title: "Register",
                link: "/auth/register",
            },
            {
                title: "Request Password",
                link: "/auth/request-password",
            },
            {
                title: "Reset Password",
                link: "/auth/reset-password",
            },
        ],
    },
];
