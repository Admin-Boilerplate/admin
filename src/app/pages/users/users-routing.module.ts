import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {UsersIndexComponent} from "./index/users-index.component";
import {UsersCreateEditComponent} from "./create-edit/users-create-edit.component";
import {marker} from "@biesbjerg/ngx-translate-extract-marker";


const routes: Routes = [
    {
        path: "",
        component: UsersIndexComponent,
        data: {
            title: marker("Users"),
            breadcrumb: marker("List")
        }
    },
    {
        path: "create",
        component: UsersCreateEditComponent,
        data: {
            title: marker("Create user"),
            breadcrumb: marker("Create")
        }
    },
    {
        path: "edit/:id",
        component: UsersCreateEditComponent,
        data: {
            title: marker("Edit user"),
            breadcrumb: marker("Edit")
        }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UsersRoutingModule {
}
