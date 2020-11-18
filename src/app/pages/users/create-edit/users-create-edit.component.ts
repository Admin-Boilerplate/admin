import {Component, OnInit} from "@angular/core";
import {CreateEditComponent} from "../../../@core/components/base/create-edit/create-edit.component";
import {IUser} from "../../../@core/interfaces/models/User";
import {ActivatedRoute} from "@angular/router";
import {UsersService} from "../../../@core/services/http/users.service";
import {Validators} from "@angular/forms";
import {AccessControlService} from "../../../@core/services/general/access-control.service";

@Component({
    selector: "admin-users-create-edit",
    templateUrl: "./users-create-edit.component.html",
    styleUrls: ["./users-create-edit.component.scss"]
})
export class UsersCreateEditComponent extends CreateEditComponent<IUser> implements OnInit {

    public roles = AccessControlService.permissions;

    constructor(private route: ActivatedRoute) {
        super();
        this.setUp({
            service: UsersService,
            route,
            resource: "user"
        });

        this.initializeForm(
            this.fb.group({
                email: [null, Validators.required],
                roles: [null]
            })
        );
    }

    ngOnInit(): void {
    }

}
