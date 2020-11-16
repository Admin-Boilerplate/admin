import {Component, OnInit} from "@angular/core";
import {IndexComponent} from "../../../@core/components/base/index/index.component";
import {UsersService} from "../../../@core/services/http/users.service";
import {IUser} from "../../../@core/interfaces/models/User";

@Component({
    selector: "ff-users-index",
    templateUrl: "./index.component.html",
    styleUrls: ["./index.component.scss"]
})
export class UsersIndexComponent extends IndexComponent<IUser> implements OnInit {

    constructor() {
        super();
        this.setUp(UsersService);
    }

    ngOnInit(): void {
    }

}
