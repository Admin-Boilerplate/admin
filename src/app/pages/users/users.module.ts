import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";

import {UsersRoutingModule} from "./users-routing.module";
import {UsersIndexComponent} from "./index/index.component";
import {NgxDatatableModule} from "@swimlane/ngx-datatable";


@NgModule({
    declarations: [UsersIndexComponent],
    imports: [
        CommonModule,
        UsersRoutingModule,
        NgxDatatableModule
    ]
})
export class UsersModule {
}
