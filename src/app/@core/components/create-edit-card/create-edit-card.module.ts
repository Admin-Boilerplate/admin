import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {CreateEditCardComponent} from "./create-edit-card.component";
import {NbButtonModule, NbCardModule, NbIconModule} from "@nebular/theme";
import {RouterModule} from "@angular/router";
import {NbSecurityModule} from "@nebular/security";
import {TranslateModule} from "@ngx-translate/core";


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
        NbSecurityModule,
        TranslateModule
    ]
})
export class CreateEditCardModule {
}
