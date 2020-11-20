import { Injectable, Injector } from "@angular/core";
import {TranslateService} from "@ngx-translate/core";
import {BreadcrumbService} from "angular-crumbs";

@Injectable({
    providedIn: "root",
})
export class Helpers {
    public static injector: Injector;
    public static breadcrumbs: BreadcrumbService;
    public static languages: string[] = ["el", "en"];
    public static lang: string;

    public static isMultilang(obj: any) {
        if (typeof obj !== "object" || Array.isArray(obj)) { return false; }
        return Object.keys(obj || {}).every(key => Helpers.languages.includes(key));
    }

    public static multilang(value: any, prop?: any) {
        let lang = Helpers.lang;
        if (!lang) {
            lang = "el";
        }
        if (!value) {
            return;
        }
        if (!Array.isArray(value)) {
            if (lang && value.hasOwnProperty(lang)) {
                return value[lang] || "";
            }

            return value;
        } else {
            if (!prop) {
                prop = "name";
            }
            return value.map(v => {
                if (lang && v[prop][lang]) {
                    v[prop] = v[prop][lang] || "";
                }
                return v;
            });
        }
    }

    constructor() {}
}
