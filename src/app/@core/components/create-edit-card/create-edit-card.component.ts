import {Component, Input, OnInit} from "@angular/core";
import {CreateEditComponent} from "../base/create-edit/create-edit.component";

@Component({
    selector: "admin-create-edit-card",
    templateUrl: "./create-edit-card.component.html",
    styleUrls: ["./create-edit-card.component.scss"]
})
export class CreateEditCardComponent implements OnInit {

    @Input() ce: CreateEditComponent;

    constructor() {
    }

    ngOnInit(): void {
    }

}
