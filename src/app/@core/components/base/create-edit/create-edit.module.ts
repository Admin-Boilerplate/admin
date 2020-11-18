import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {CreateEditComponent} from "./create-edit.component";
import {FormBuilder} from "@angular/forms";


@NgModule({
    declarations: [CreateEditComponent],
    exports: [CreateEditComponent],
    imports: [
        CommonModule
    ],
    providers: [FormBuilder]
})
export class CreateEditModule {
}
