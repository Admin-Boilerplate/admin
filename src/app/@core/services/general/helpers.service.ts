import { Injectable, Injector } from "@angular/core";

@Injectable({
    providedIn: "root",
})
export class HelpersService {
    public static injector: Injector;
    public static languages: string[];
    public static lang: string;

    public static isMultilang(obj: any) {
        if (typeof obj !== "object") { return false; }
        return Object.keys(obj || {}).every(key => HelpersService.languages.includes(key));
    }

    public static multilang(value: any, prop?: any) {
        let lang = HelpersService.lang;
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
