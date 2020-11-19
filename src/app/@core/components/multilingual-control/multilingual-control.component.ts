import {ChangeDetectionStrategy, ChangeDetectorRef, Component, HostBinding, Input} from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import {Helpers} from "../../services/general/helpers.service";

@Component({
    selector: "admin-multilingual-control",
    templateUrl: "./multilingual-control.component.html",
    styleUrls: ["./multilingual-control.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MultilingualControlComponent {

    @Input("form") set setForm(form: FormGroup) {
        this.form = form;
    }

    public form: FormGroup;

    @Input("control") set setControl(control: string) {
        this.control = control;
    }

    public control: string;
    @Input() label: string;
    @Input() kind: "input" | "textarea" = "input";
    @Input() required: boolean = false;

    @HostBinding("class")
    private col;
    @Input("col") set setCol(size: number) {
        this.col = "col-" + size;
    }

    public readonly languages: string[];

    constructor(private cd: ChangeDetectorRef,
                private fb: FormBuilder) {
        this.languages = Helpers.languages;
    }
}
