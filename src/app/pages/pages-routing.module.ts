import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";

import {PagesComponent} from "./pages.component";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {AuthGuard} from "../@core/guards/auth.guard";
import {UsersIndexComponent} from "./users/index/users-index.component";
import {marker} from "@biesbjerg/ngx-translate-extract-marker";

const routes: Routes = [{
    path: "",
    component: PagesComponent,
    canActivateChild: [AuthGuard],
    runGuardsAndResolvers: "always",
    children: [
        {
            path: "dashboard",
            component: DashboardComponent,
        },
        {
            path: "users",
            loadChildren: () => import("./users/users.module")
                .then(m => m.UsersModule),
            data: {
                breadcrumb: marker("Users")
            }
        },
        {
            path: "",
            redirectTo: "dashboard",
            pathMatch: "full",
        },
    ],
}];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class PagesRoutingModule {
}
