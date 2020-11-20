/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import {Component, Inject, Injector, OnInit} from "@angular/core";
import {Helpers} from "./@core/services/general/helpers.service";
import {LocalStorageService} from "ngx-webstorage";
import {Title} from "@angular/platform-browser";
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import {filter, map, switchMap} from "rxjs/operators";
import { merge } from "rxjs";
import {NgxSpinnerService} from "ngx-spinner";
import {Loading} from "./@core/services/general/loading.service";
import {TranslateService} from "@ngx-translate/core";
import {Translate} from "./@core/services/general/translate.service";
import {DOCUMENT} from "@angular/common";
import {BreadcrumbService} from "angular-crumbs";

@Component({
    selector: "ngx-app",
    template: `
        <ngx-spinner><span class=\"text-white\">Loading...</span></ngx-spinner>
        <router-outlet></router-outlet>
    `,
})
export class AppComponent implements OnInit {

    constructor(
        private router: Router,
        private injector: Injector,
        private title: Title,
        @Inject(DOCUMENT) private doc,
        private translateService: TranslateService,
        private spinner: NgxSpinnerService,
        private ls: LocalStorageService,
        private breadcrumbService: BreadcrumbService,
        private activatedRoute: ActivatedRoute
        ) {
    }

    ngOnInit() {
        const navEvents = this.router.events.pipe(
            filter((event) => event instanceof NavigationEnd)
        );

        this._setLanguage();

        merge(this.translateService.onLangChange, navEvents)
            .pipe(
                map(() => {
                    let route = this.activatedRoute;
                    while (route.firstChild) {
                        route = route.firstChild;
                    }
                    return route;
                }),
                filter((route) => route.outlet === "primary"),
                switchMap((route) => route.data)
            )
            .subscribe((event: any) => {
                const title = event.title;
                if (title) {
                    this.title.setTitle("Admin | " + Translate.this(title));
                }
            });

        Loading.isLoading.subscribe(loading => {
            if (loading) {
                this.spinner.show();
            } else {
                this.spinner.hide();
            }
        });

        this._setStatics();
    }

    private _setLanguage() {
        this.translateService.setDefaultLang("el");
        this.translateService.currentLang = "el";

        this.doc.documentElement.lang = this.translateService.currentLang;

        this.translateService.onLangChange
            .pipe(map(x => x.lang))
            .subscribe(lang => {
                this.doc.documentElement.lang = lang;
            });
    }

    private _setStatics() {
        Helpers.injector = this.injector;
        Helpers.breadcrumbs = this.breadcrumbService;
        Helpers.lang = this.ls.retrieve("language") ? this.ls.retrieve("language") : "el";
        Translate.service = this.translateService;
    }
}
