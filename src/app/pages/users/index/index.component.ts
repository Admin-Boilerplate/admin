import {Component, OnInit} from "@angular/core";
import {IndexComponent} from "../../../@core/components/base/index/index.component";
import {UsersService} from "../../../@core/services/http/users.service";

@Component({
    selector: "ngx-index",
    templateUrl: "./index.component.html",
    styleUrls: ["./index.component.scss"]
})
export class UsersIndexComponent extends IndexComponent implements OnInit {

    constructor() {
        super();
        this.setUp(UsersService);
    }

    ngOnInit(): void {
    }

}
