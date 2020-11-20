import {Component, Input, OnInit} from "@angular/core";
import {CreateEditComponent} from "../base/create-edit/create-edit.component";
import {ICreateEditCardConfig} from "../../interfaces/components/CreateEditCard";

@Component({
    selector: "admin-create-edit-card",
    templateUrl: "./create-edit-card.component.html",
    styleUrls: ["./create-edit-card.component.scss"]
})
export class CreateEditCardComponent implements OnInit {

    @Input() ce: CreateEditComponent;
    @Input("config") set setConfig(config: ICreateEditCardConfig) {
        this.config = this._setConfig(config);
    }
    public config: ICreateEditCardConfig;

    constructor() {
    }

    ngOnInit(): void {
        if (!this.config) {
            this.config = this._setConfig();
        }
    }

    public basicConfig(): ICreateEditCardConfig {
        return {
            hasBackToList: true,
            hasSave: true,
            hasUpdate: true,
            hasHeader: true,
            hasFooter: true
        };
    }

    private _setConfig(config?: ICreateEditCardConfig): ICreateEditCardConfig {
        return {
            ...this.basicConfig(),
            ...(config || {})
        };
    }
}
