import {Component, ViewChild} from "@angular/core";
import {BreadcrumbComponent} from "angular-crumbs";
import {Helpers} from "../../../@core/services/general/helpers.service";

@Component({
    selector: "ngx-one-column-layout",
    styleUrls: ["./one-column.layout.scss"],
    template: `
        <nb-layout windowMode>
            <nb-layout-header fixed>
                <ngx-header></ngx-header>
            </nb-layout-header>

            <nb-sidebar class="menu-sidebar" tag="menu-sidebar" responsive start>
                <ng-content select="nb-menu"></ng-content>
            </nb-sidebar>

            <nb-layout-column>
                <breadcrumb #parent style="margin-bottom: 2rem; display: block">
                    <ol class="breadcrumbs">
                        <li class="breadcrumb-item">
                            <a href="" [routerLink]="['/pages/dashboard']" translate>Dashboard</a>
                        </li>
                        <ng-template ngFor let-route [ngForOf]="parent.breadcrumbs">
                            <li *ngIf="!route.terminal" class="breadcrumb-item">
                                <a href="" [routerLink]="[route.url]">{{ route.displayName }}</a>
                            </li>
                            <li *ngIf="route.terminal" class="breadcrumb-item active" aria-current="page">{{ route.displayName }}</li>
                        </ng-template>
                    </ol>
                </breadcrumb>
                <ng-content select="router-outlet"></ng-content>
            </nb-layout-column>

            <!--<nb-layout-footer fixed>
                <ngx-footer></ngx-footer>
            </nb-layout-footer>-->
        </nb-layout>
    `,
})
export class OneColumnLayoutComponent {
    @ViewChild("parent") parent: BreadcrumbComponent;
    constructor() {
        Helpers.breadcrumbs.breadcrumbChanged.subscribe(ev => {
            if (this.parent) {
                this.parent.breadcrumbs = ev;
            }
        });
    }
}
