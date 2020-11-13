import {Component, OnInit} from "@angular/core";
import {UsersService} from "../../@core/services/http/users.service";

@Component({
    selector: "ngx-dashboard",
    templateUrl: "./dashboard.component.html",
})
export class DashboardComponent implements OnInit {

    constructor() {
    }

    ngOnInit(): void {
    }
}
