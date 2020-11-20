import {ModuleWithProviders, NgModule, Optional, SkipSelf} from "@angular/core";
import {CommonModule} from "@angular/common";
import {NbAuthJWTToken, NbAuthModule, NbPasswordAuthStrategy, NbTokenLocalStorage} from "@nebular/auth";
import {NbRoleProvider, NbSecurityModule} from "@nebular/security";

import {throwIfAlreadyLoaded} from "./module-import-guard";
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {AuthInterceptor} from "./interceptors/HttpInterceptor";
import {LayoutService} from "./services/general/layout.service";
import {FormBuilder} from "@angular/forms";
import {environment} from "../../environments/environment";
import {RoleProvider} from "./providers/role.provider";
import {AccessControlService} from "./services/general/access-control.service";

const socialLinks = [
    {
        url: "https://github.com/akveo/nebular",
        target: "_blank",
        icon: "github",
    },
    {
        url: "https://www.facebook.com/akveo/",
        target: "_blank",
        icon: "facebook",
    },
    {
        url: "https://twitter.com/akveo_inc",
        target: "_blank",
        icon: "twitter",
    },
];

const DATA_SERVICES = [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
];

export const NB_CORE_PROVIDERS = [
    ...DATA_SERVICES,
    ...NbAuthModule.forRoot({
        strategies: [
            NbPasswordAuthStrategy.setup({
                name: "email",
                token: {
                    class: NbAuthJWTToken,
                    key: "token"
                },
                baseEndpoint: environment.serverUrl,
                login: {
                    redirect: {
                        success: "/pages/dashboard",
                        failure: null
                    },
                    endpoint: "/auth/login"
                },
                logout: {
                    redirect: {
                        success: "/auth/login",
                        failure: null
                    },
                    endpoint: "/auth/logout"
                }
            })
        ],
        forms: {
            login: {
                socialLinks: socialLinks,
            },
            register: {
                socialLinks: socialLinks,
            },
        },
    }).providers,
    NbSecurityModule.forRoot({
        accessControl: AccessControlService.access,
    }).providers,
    {
        provide: NbRoleProvider, useClass: RoleProvider,
    },
    FormBuilder,
    LayoutService,
    NbTokenLocalStorage
];

@NgModule({
    imports: [
        CommonModule,
    ],
    exports: [
        NbAuthModule,
    ],
    declarations: [],
})
export class CoreModule {
    constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
        throwIfAlreadyLoaded(parentModule, "CoreModule");
    }

    static forRoot(): ModuleWithProviders<CoreModule> {
        return {
            ngModule: CoreModule,
            providers: [
                ...NB_CORE_PROVIDERS,
            ],
        };
    }
}
