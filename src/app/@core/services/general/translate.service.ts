import {Injectable} from "@angular/core";
import {TranslateService} from "@ngx-translate/core";

@Injectable({
    providedIn: "root"
})
export class Translate {

    public static service: TranslateService;

    constructor() {
    }

    public static this(key: string, params?: Object) {
        return Translate.service?.instant?.(key, params) || key;
    }
}
