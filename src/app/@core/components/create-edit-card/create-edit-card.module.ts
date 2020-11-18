import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {CreateEditCardComponent} from "./create-edit-card.component";
import {NbButtonModule, NbCardModule, NbIconModule} from "@nebular/theme";
import {RouterModule} from "@angular/router";
import {NbSecurityModule} from "@nebular/security";


@NgModule({
    declarations: [CreateEditCardComponent],
    exports: [
        CreateEditCardComponent
    ],
    imports: [
        CommonModule,
        NbCardModule,
        NbButtonModule,
        NbIconModule,
        RouterModule,
        NbSecurityModule
    ]
})
export class CreateEditCardModule {
}
