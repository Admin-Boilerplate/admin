import {NgModule} from "@angular/core";
import {NbButtonModule, NbCardModule, NbIconModule} from "@nebular/theme";

import {ThemeModule} from "../../@theme/theme.module";
import {DashboardComponent} from "./dashboard.component";

@NgModule({
    imports: [
        NbCardModule,
        ThemeModule,
        NbButtonModule,
        NbIconModule,
    ],
    declarations: [
        DashboardComponent,
    ],
})
export class DashboardModule {
}
