import {Component, HostBinding, Input, OnInit} from "@angular/core";

@Component({
    selector: "admin-form-control",
    templateUrl: "./form-control.component.html",
    styleUrls: ["./form-control.component.scss"]
})
export class FormControlComponent implements OnInit {

    @HostBinding("class")
    private col;
    @Input("col") set setCol(size: number) {
        this.col = "col-" + size;
    }

    constructor() {
    }

    ngOnInit(): void {
    }

}
