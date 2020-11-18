import {AfterViewInit, Component, OnInit} from "@angular/core";
import {IndexComponent} from "../../../@core/components/base/index/index.component";
import {UsersService} from "../../../@core/services/http/users.service";
import {IUser} from "../../../@core/interfaces/models/User";

@Component({
    selector: "admin-users-index",
    templateUrl: "./users-index.component.html",
    styleUrls: ["./users-index.component.scss"]
})
export class UsersIndexComponent extends IndexComponent<IUser> implements OnInit, AfterViewInit {
    constructor() {
        super();
        this.setUp(UsersService);
    }

    ngOnInit(): void {
    }

    ngAfterViewInit(): void {
        this.table.columns = [
            {
                name: "Email",
                prop: "email"
            },
            {
                name: "Roles",
                prop: "roles"
            }
        ];
    }

}
