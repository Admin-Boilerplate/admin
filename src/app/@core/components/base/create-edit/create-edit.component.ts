import {AbstractType, Component, InjectionToken, Type} from "@angular/core";
import {FormBuilder, FormGroup} from "@angular/forms";
import {IHttpService} from "../../../interfaces/_base/HttpService";
import {ActivatedRoute, Router} from "@angular/router";
import {ToasterService} from "../../../services/general/toaster.service";
import {HelpersService} from "../../../services/general/helpers.service";
import {finalize} from "rxjs/operators";
import {IJsonResponse} from "../../../interfaces/_helpers/JsonResponse";
import {Loading} from "../../../services/general/loading.service";
import {IModel} from "../../../interfaces/_base/Model";

@Component({
    selector: "admin-create-edit",
    template: ""
})
export class CreateEditComponent<T extends IModel = {} & IModel> {
    public id: string;
    public model: T;
    public resource: string; // Used for permissions
    public form: FormGroup;

    public loading: boolean = false;
    public edit: boolean = false;
    public verb: string;

    // Injected
    public service: IHttpService<T>;
    public activatedRoute: ActivatedRoute;
    public multilingualFields: string[];
    public router: Router;
    public fb: FormBuilder;
    public toaster: ToasterService;

    constructor() {
        this._injectDependencies();
    }

    start(): void {
        this.id = this.activatedRoute.snapshot.paramMap.get("id");
        this.verb = !this.id ? "Create" : "Update";

        if (this.id) {
            this.get();
            this.edit = true;
        }
    }

    public setUp(data: {
        service: Type<IHttpService<T>> | InjectionToken<IHttpService<T>> | AbstractType<IHttpService<T>>;
        route: ActivatedRoute;
        resource: string
        multilingualFields?: string[],
    }) {
        this.service = HelpersService.injector.get(data.service);
        this.activatedRoute = data.route;
        this.multilingualFields = data.multilingualFields;
        this.resource = data.resource;

        this.start();
    }

    public get() {
        this.beforeRequest();
        this.service
            .get(this.id)
            .pipe(finalize(this.afterRequest.bind(this)))
            .subscribe(this.afterGet.bind(this));
    }

    public afterGet(response: IJsonResponse<T>) {
        if (response.success) {
            this.model = response.get();
            this.form.patchValue(this.patchValue(this.model, false), {onlySelf: true});
        }
    }

    public createOrUpdate(data?: any) {
        if (!this.form.valid) {
            return;
        }
        Loading.start();
        if (this.edit) {
            this.update(data);
        } else {
            this.create(data);
        }
    }

    public create(data?: any) {
        const model = data ? data : this.form.value;
        this.beforeRequest();
        this.service
            .create(model)
            .pipe(finalize(this.afterRequest.bind(this)))
            .subscribe(this.afterCreate.bind(this));
    }

    public afterCreate(response: IJsonResponse<T>) {
        if (response.success) {
            this.toaster.success("Success", "Successfully created");
        } else {
            this.toaster.error("Error", response.reason());
        }
    }

    public update(data?: any) {
        const model = data ? data : this.form.value;
        this.beforeRequest();
        this.service
            .update(this.id, model)
            .pipe(finalize(this.afterRequest.bind(this)))
            .subscribe(this.afterUpdate.bind(this));
    }

    public afterUpdate(response: IJsonResponse<T>) {
        if (response.success) {
            this.toaster.success("Success", "Successfully updated");
        } else {
            this.toaster.error("Error", response.reason());
        }
    }

    public initializeForm(form: FormGroup) {
        (this.multilingualFields || []).forEach((control: Extract<keyof T, string>) => {
            const multilingualGroup = this.fb.group({}) as any;

            const existingControl = form.get(control);

            HelpersService.languages.forEach(lang => {
                multilingualGroup.addControl(lang, this.fb.control("", existingControl?.validator || []));
            });

            if (form.contains(control)) {
                form.removeControl(control);
            }

            form.addControl(control, multilingualGroup);
        });

        this.form = form;
    }

    public beforeRequest() {
        Loading.start();
        this.loading = true;
    }

    public afterRequest() {
        Loading.stop();
        this.loading = false;
    }

    public patchValue(model: any, withMultilingual: boolean = true) {
        const values = {};
        for (const attr in model) {
            if (this.form.get(attr) !== undefined) {
                if (!withMultilingual && HelpersService.isMultilang(model[attr])) {
                    values[attr] = HelpersService.multilang(model[attr]);
                } else {
                    values[attr] = model[attr];
                }
            }
        }

        return values;
    }

    private _injectDependencies() {
        this.activatedRoute = HelpersService.injector.get(ActivatedRoute);
        this.router = HelpersService.injector.get(Router);
        this.fb = HelpersService.injector.get(FormBuilder);
        this.toaster = HelpersService.injector.get(ToasterService);
    }
}
