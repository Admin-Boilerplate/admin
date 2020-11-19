import {NbMenuItem} from "@nebular/theme";
import {marker} from "@biesbjerg/ngx-translate-extract-marker";
import {Translate} from "../@core/services/general/translate.service";

export const MENU_ITEMS: NbMenuItem[] = [
    {
        title: Translate.this(marker("Dashboard")),
        icon: "home-outline",
        link: "/pages/dashboard",
        home: true,
    },
    {
        title: Translate.this(marker("Users")),
        icon: "person-outline",
        children: [
            {
                title: Translate.this(marker("List of users")),
                link: "/pages/users"
            },
            {
                title: Translate.this(marker("Create user")),
                link: "/pages/users/create"
            }
        ]
    },
    {
        title: Translate.this(marker("Auth")),
        icon: "lock-outline",
        children: [
            {
                title: Translate.this(marker("Login")),
                link: "/auth/login",
            },
            {
                title: Translate.this(marker("Register")),
                link: "/auth/register",
            },
            {
                title: Translate.this(marker("Request Password")),
                link: "/auth/request-password",
            },
            {
                title: Translate.this(marker("Reset Password")),
                link: "/auth/reset-password",
            },
        ],
    },
];
