import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {MultilingualControlComponent} from "./multilingual-control.component";
import {FormControlModule} from "../form-control/form-control.module";
import {ReactiveFormsModule} from "@angular/forms";
import {NbInputModule} from "@nebular/theme";


@NgModule({
    declarations: [MultilingualControlComponent],
    exports: [MultilingualControlComponent],
    imports: [
        CommonModule,
        FormControlModule,
        ReactiveFormsModule,
        NbInputModule
    ]
})
export class MultilingualControlModule {
}
