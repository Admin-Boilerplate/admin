import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";

import {UsersRoutingModule} from "./users-routing.module";
import {NgxDatatableModule} from "@swimlane/ngx-datatable";
import {UsersIndexComponent} from "./index/users-index.component";
import {UsersCreateEditComponent} from "./create-edit/users-create-edit.component";
import {NbButtonModule, NbCardModule, NbIconModule, NbInputModule, NbSelectModule} from "@nebular/theme";
import {CreateEditCardModule} from "../../@core/components/create-edit-card/create-edit-card.module";
import {IndexTableModule} from "../../@core/components/index-table/index-table.module";
import {FormControlModule} from "../../@core/components/form-control/form-control.module";
import {ReactiveFormsModule} from "@angular/forms";


@NgModule({
    declarations: [UsersIndexComponent, UsersCreateEditComponent],
    imports: [
        CommonModule,
        UsersRoutingModule,
        NgxDatatableModule,
        NbButtonModule,
        NbIconModule,
        NbCardModule,
        CreateEditCardModule,
        IndexTableModule,
        FormControlModule,
        NbInputModule,
        ReactiveFormsModule,
        NbSelectModule
    ]
})
export class UsersModule {
}
