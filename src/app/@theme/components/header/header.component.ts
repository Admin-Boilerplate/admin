import {Component, OnDestroy, OnInit} from "@angular/core";
import {NbMediaBreakpointsService, NbMenuService, NbSidebarService, NbThemeService} from "@nebular/theme";

import {map, takeUntil} from "rxjs/operators";
import {Observable, Subject} from "rxjs";
import {LayoutService} from "../../../@core/services/general/layout.service";
import {marker} from "@biesbjerg/ngx-translate-extract-marker";
import {Translate} from "../../../@core/services/general/translate.service";

@Component({
    selector: "ngx-header",
    styleUrls: ["./header.component.scss"],
    templateUrl: "./header.component.html",
})
export class HeaderComponent implements OnInit, OnDestroy {

    private destroy$: Subject<void> = new Subject<void>();
    public readonly materialTheme$: Observable<boolean>;
    userPictureOnly: boolean = false;
    user: any;

    themes = [
        {
            value: "default",
            name: "Light",
        },
        {
            value: "dark",
            name: "Dark",
        },
        {
            value: "cosmic",
            name: "Cosmic",
        },
        {
            value: "corporate",
            name: "Corporate",
        },
        {
            value: "material-light",
            name: "Material Light",
        },
        {
            value: "material-dark",
            name: "Material Dark",
        },
    ];

    currentTheme = "default";

    userMenu = [{title: Translate.this(marker("Profile"))}, {title: Translate.this(marker("Log out"))}];

    public constructor(
        private sidebarService: NbSidebarService,
        private menuService: NbMenuService,
        private themeService: NbThemeService,
        private layoutService: LayoutService,
        private breakpointService: NbMediaBreakpointsService,
    ) {
        this.materialTheme$ = this.themeService.onThemeChange()
            .pipe(map(theme => {
                const themeName: string = theme?.name || "";
                return themeName.startsWith("material");
            }));
    }

    ngOnInit() {
        this.currentTheme = this.themeService.currentTheme;

        const {xl} = this.breakpointService.getBreakpointsMap();
        this.themeService.onMediaQueryChange()
            .pipe(
                map(([, currentBreakpoint]) => currentBreakpoint.width < xl),
                takeUntil(this.destroy$),
            )
            .subscribe((isLessThanXl: boolean) => this.userPictureOnly = isLessThanXl);
    }

    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }

    changeTheme(themeName: string) {
        this.themeService.changeTheme(themeName);
    }

    toggleSidebar(): boolean {
        this.sidebarService.toggle(true, "menu-sidebar");
        this.layoutService.changeLayoutSize();

        return false;
    }

    navigateHome() {
        this.menuService.navigateHome();
        return false;
    }
}
