import { Injectable } from "@angular/core";
import Swal, { SweetAlertOptions, SweetAlertResult, SweetAlertIcon } from "sweetalert2";
import {Helpers} from "./helpers.service";
import {Translate} from "./translate.service";
import {marker} from "@biesbjerg/ngx-translate-extract-marker";

export class SwalBase {

    constructor(private type?: SweetAlertIcon,
                private title?: string,
                private text?: string,
                private overrideNoun?: boolean) {
    }

    public generic(options: SweetAlertOptions = {}, noun: string = Translate.this(marker("Action"))) {
        return this.base(options, noun);
    }

    public create(options: SweetAlertOptions = {}, noun: string = Translate.this(marker("Creation"))) {
        return this.base(options, noun);
    }

    public edit(options: SweetAlertOptions = {}, noun: string = Translate.this(marker("Update"))) {
        return this.base(options, noun);
    }

    public delete(options: SweetAlertOptions = {}, noun: string = Translate.this(marker("Deletion"))) {
        return this.base(options, noun);
    }

    private async base(options: SweetAlertOptions, noun: string = ""): Promise<SweetAlertResult> {
        const genericOptions: SweetAlertOptions = {
            icon: this.type,
            title: this.title,
            text: `${!this.overrideNoun ? noun : ""} ${this.text}`,
            showConfirmButton: false,
            reverseButtons: true,
            focusCancel: true,
            cancelButtonColor: "light",
            timer: 1500
        };
        return await Swal.fire({ ...genericOptions, ...options });
    }
}

@Injectable({
    providedIn: "root"
})
export class SwalService {

    /**
     * @description type = success, title = Επιτυχία, text = έγινε με επιτυχία!
     */
    public static success: SwalBase = new SwalBase(
        "success",
        Translate.this(marker("Success")) + "!",
        Translate.this(marker("successfully")) + "!"
    );
    /**
     * @description type = error, title = Αποτυχία!, text = απέτυχε!
     */
    public static error: SwalBase = new SwalBase(
        "error",
        Translate.this(marker("Failure")),
        Translate.this(marker("failed..."))
    );

    /**
     * @description type = warning, title = Προσοχή!, text = Παρακαλώ ελέγξτε τα στοιχεία.!, overrideNoun = true
     */
    public static warning: SwalBase = new SwalBase(
        "warning",
        Translate.this(marker("Warning")),
        Translate.this(marker("Please check your data!")),
        true
    );
    /**
     * @description type = question, title = Είσαι σίγουρος/ή;, text = "", overrideNoun = true
     */
    public static question: SwalBase = new SwalBase(
        "question",
        Translate.this(marker("Are you sure?")),
        "",
        true
    );
    public static yesNoBasicOptions: SweetAlertOptions = {
        showConfirmButton: true,
        showCancelButton: true,
        confirmButtonText: Translate.this(marker("Yes")),
        cancelButtonText: Translate.this(marker("No")),
        reverseButtons: true,
        focusCancel: true,
        cancelButtonColor: "light",
        timer: null
    };

    /**
     * @description All properties custom
     */
    public static async custom(options: SweetAlertOptions): Promise<SweetAlertResult> {
        return await Swal.fire(options);
    }

    constructor() {
    }
}
