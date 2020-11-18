import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {UsersIndexComponent} from "./index/users-index.component";
import {UsersCreateEditComponent} from "./create-edit/users-create-edit.component";


const routes: Routes = [
    {
        path: "",
        component: UsersIndexComponent
    },
    {
        path: "create",
        component: UsersCreateEditComponent
    },
    {
        path: "edit/:id",
        component: UsersCreateEditComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UsersRoutingModule {
}
