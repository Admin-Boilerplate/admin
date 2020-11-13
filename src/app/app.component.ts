/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import {Component, Injector, OnInit} from "@angular/core";
import {HelpersService} from "./@core/services/general/helpers.service";
import {LocalStorageService} from "ngx-webstorage";
import {Title} from "@angular/platform-browser";
import {NavigationEnd, Router} from "@angular/router";
import {filter} from "rxjs/operators";
import {NgxSpinnerService} from "ngx-spinner";
import {Loading} from "./@core/services/general/loading.service";
import {NbIconLibraries} from "@nebular/theme";

@Component({
    selector: "ngx-app",
    template: "<ngx-spinner><span class=\"text-white\">Loading...</span></ngx-spinner><router-outlet></router-outlet>",
})
export class AppComponent implements OnInit {

    constructor(
        private router: Router,
        private injector: Injector,
        private title: Title,
        private spinner: NgxSpinnerService,
        private ls: LocalStorageService
        ) {
    }

    ngOnInit() {
        this.router.events
            .pipe(filter((event) => event instanceof NavigationEnd))
            .subscribe((event: any) => {
                 const title = event.title;
                 if (title) {
                     this.title.setTitle("FF | " + title);
                 }
            });

        Loading.isLoading.subscribe(loading => {
            if (loading) {
                this.spinner.show();
            } else {
                this.spinner.hide();
            }
        });

        this._setHelpers();
    }


    private _setHelpers() {
        HelpersService.injector = this.injector;
        HelpersService.lang = this.ls.retrieve("language") ? this.ls.retrieve("language") : "el";
    }
}
