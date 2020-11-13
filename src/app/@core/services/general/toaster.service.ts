import {Injectable} from "@angular/core";
import {NbGlobalPhysicalPosition, NbToastrService} from "@nebular/theme";
import {NbToastrConfig} from "@nebular/theme/components/toastr/toastr-config";

@Injectable({
    providedIn: "root",
})
export class ToasterService {

    private readonly _config: Partial<NbToastrConfig> = {
        duration: 3000,
        destroyByClick: true,
        position: NbGlobalPhysicalPosition.TOP_RIGHT
    };

    constructor(private toastr: NbToastrService) {
    }

    success(title: string, message: string, options: Partial<NbToastrConfig> = {}) {
        this.toastr.success(message, title, this._options(options));
    }

    error(title: string, message: string, options: Partial<NbToastrConfig> = {}) {
        this.toastr.danger(message, title, this._options(options));
    }

    warning(title: string, message: string, options: Partial<NbToastrConfig> = {}) {
        this.toastr.warning(message, title, this._options(options));
    }

    info(title: string, message: string, options: Partial<NbToastrConfig> = {}) {
        this.toastr.info(message, title, this._options(options));
    }

    private _options(options: Partial<NbToastrConfig>) {
        return {
            ...this._config,
            ...options
        };
    }
}
