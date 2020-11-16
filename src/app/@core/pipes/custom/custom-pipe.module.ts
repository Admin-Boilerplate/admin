import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {CustomPipe} from "./custom.pipe";


@NgModule({
    declarations: [CustomPipe],
    exports: [CustomPipe],
    imports: [
        CommonModule
    ]
})
export class CustomPipeModule {
}
