import {Injectable} from "@angular/core";
import {NbAccessControl} from "@nebular/security";
import {NbAclRole} from "@nebular/security/security.options";
import {Models, Roles} from "../../interfaces/_helpers/AccessControl";
import {marker} from "@biesbjerg/ngx-translate-extract-marker";
import {Translate} from "./translate.service";

@Injectable({
    providedIn: "root"
})
export class AccessControlService {

    public static models = {
        [Models.Users]: {
            id: Models.Users,
            name: Translate.this(marker("Users"))
        }
    };
    public static permissions: {id: string, name: string, access: NbAclRole}[] = [
        {
            id: Roles.Admin,
            name: Translate.this(marker("Admin")),
            access: {
                view: "*",
                create: "*",
                edit: "*"
            }
        },
        {
            id: Roles.SuperUser,
            name: Translate.this(marker("Super user")),
            access: {
                parent: Roles.Admin,
                remove: "*"
            }
        }
    ];
    public static access: NbAccessControl;

    constructor() {
        AccessControlService.access = {};
        AccessControlService.permissions.forEach(permission => {
            AccessControlService.access[permission.id] = permission.access;
        });
    }
}
