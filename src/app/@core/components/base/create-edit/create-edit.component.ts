import {AbstractType, Component, InjectionToken, Type} from "@angular/core";
import {FormBuilder, FormGroup} from "@angular/forms";
import {IHttpService, RetrieveOptions} from "../../../interfaces/_base/HttpService";
import {ActivatedRoute, Router} from "@angular/router";
import {ToasterService} from "../../../services/general/toaster.service";
import {Helpers} from "../../../services/general/helpers.service";
import {finalize} from "rxjs/operators";
import {IJsonResponse} from "../../../interfaces/_helpers/JsonResponse";
import {Loading} from "../../../services/general/loading.service";
import {IModel} from "../../../interfaces/_base/Model";
import {IRetrieveOptions} from "../../../interfaces/_base/Retrieve";
import {marker} from "@biesbjerg/ngx-translate-extract-marker";
import {Translate} from "../../../services/general/translate.service";

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

    public options: IRetrieveOptions;

    // Injected
    public service: IHttpService<T>;
    public activatedRoute: ActivatedRoute;
    public multilingualFields: string[];
    public patchMultilingual: boolean;
    public router: Router;
    public fb: FormBuilder;
    public toaster: ToasterService;

    constructor() {
        this._injectDependencies();
    }

    start(): void {
        this.id = this.activatedRoute.snapshot.paramMap.get("id");
        this.verb = !this.id ? marker("Create") : marker("Update");

        if (this.id) {
            this.edit = true;
            this.get();
        }
    }

    public setUp(data: {
        service: Type<IHttpService<T>> | InjectionToken<IHttpService<T>> | AbstractType<IHttpService<T>>;
        route: ActivatedRoute;
        resource: string
        multilingualFields?: string[],
        patchMultilingual?: boolean
    }) {
        this.service = Helpers.injector.get(data.service);
        this.activatedRoute = data.route;
        this.multilingualFields = data.multilingualFields;
        this.resource = data.resource;
        this.patchMultilingual = data.patchMultilingual === undefined ? true : data.patchMultilingual;

        this.start();
    }

    public get() {
        this.beforeRequest();
        this.service
            .get(this.id, this.getOptions())
            .pipe(finalize(this.afterRequest.bind(this)))
            .subscribe(this.afterGet.bind(this));
    }

    public getOptions(): RetrieveOptions<T> {
        return {
            lean: true,
            ...this.options
        };
    }

    public afterGet(response: IJsonResponse<T>) {
        if (response.success) {
            this.model = response.get();
            this.form.patchValue(this.patchValue(this.model), {onlySelf: true});
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
            this.toaster.success(Translate.this(marker("Success")), Translate.this(marker("Successfully created")));
        } else {
            this.toaster.error(marker("Error"), response.reason());
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
            this.toaster.success(Translate.this("Success"), Translate.this(marker("Successfully updated")));
        } else {
            this.toaster.error(Translate.this("Error"), response.reason());
        }
    }

    public initializeForm(form: FormGroup) {
        (this.multilingualFields || []).forEach((control: Extract<keyof T, string>) => {
            const multilingualGroup = this.fb.group({}) as any;

            const existingControl = form.get(control);

            Helpers.languages.forEach(lang => {
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

    public patchValue(model: any) {
        const values = {};
        for (const attr in model) {
            if (this.form.get(attr) !== undefined) {
                if (!this.patchMultilingual && Helpers.isMultilang(model[attr])) {
                    values[attr] = Helpers.multilang(model[attr]);
                } else {
                    values[attr] = model[attr];
                }
            }
        }

        return values;
    }

    private _injectDependencies() {
        this.activatedRoute = Helpers.injector.get(ActivatedRoute);
        this.router = Helpers.injector.get(Router);
        this.fb = Helpers.injector.get(FormBuilder);
        this.toaster = Helpers.injector.get(ToasterService);
    }
}
