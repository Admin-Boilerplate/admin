import {AbstractType, ChangeDetectorRef, Component, InjectionToken, Type, ViewChild} from "@angular/core";
import {IPage, IPaginate} from "../../../interfaces/_base/Paginate";
import {IHttpService} from "../../../interfaces/_base/HttpService";
import {Router} from "@angular/router";
import {ToasterService} from "../../../services/general/toaster.service";
import {remove} from "lodash";
import {Helpers} from "../../../services/general/helpers.service";
import {finalize} from "rxjs/operators";
import {IJsonResponse} from "../../../interfaces/_helpers/JsonResponse";
import {SwalService} from "../../../services/general/swal.service";
import {Loading} from "../../../services/general/loading.service";
import {IndexTableComponent} from "../../index-table/index-table.component";
import {IModel} from "../../../interfaces/_base/Model";


@Component({
    selector: "admin-index",
    template: ""
})
export class IndexComponent<T extends IModel = {} & IModel> {
    @ViewChild(IndexTableComponent)
    public table: IndexTableComponent;

    public models: T[] = [];

    public loading: boolean = false;

    // Handling pagination
    public page: IPage = {};

    // Table events
    public selected: T[] = [];

    // Injected
    public service: IHttpService<T>;
    public router: Router;
    public toaster: ToasterService;

    constructor() {
        this._injectDependencies();
    }

    public setUp(service: Type<IHttpService<T>> | InjectionToken<IHttpService<T>> | AbstractType<IHttpService<T>>) {
        this.service = Helpers.injector.get(service);

        this.page.number = 1;
        this.page.size = 25;

        this.start();
    }

    start(): void {
        this.retrieve();
    }

    public retrieve() {
        this.beforeRequest();
        this.service
            .paginate(this.page.size, this.page.number)
            .pipe(finalize(this.afterRequest.bind(this)))
            .subscribe(this.afterRetrieve.bind(this));
    }

    onPage(event: any) {
        this.page.number = event.offset + 1;

        this.retrieve();
    }

    public afterRetrieve(response: IJsonResponse<IPaginate<T>>) {
        if (response.success) {
            this.models = response.get().docs;
            this.page.total = response.get().totalPages;
            this.page.modelsCount = response.get().totalDocs;
        }
    }

    public delete(id: string) {
        SwalService.question.delete(SwalService.yesNoBasicOptions).then((answer) => {
            if (answer.dismiss) {
                this.onDeleteRejected(id);
                return;
            }

            this.beforeRequest();
            this.service
                .delete(id)
                .pipe(finalize(this.afterRequest.bind(this)))
                .subscribe((res) => this.afterDelete(res, id));
        });
    }

    public afterDelete(response: {success: boolean}, id: string) {
        if (response.success) {
            remove(this.models, (model: any) => model._id === id);
            this.models = [...this.models];
            SwalService.success.delete();
        }
    }

    public onDeleteRejected(id: string) {
        // Override to do stuff after delete rejection
    }

    public deleteMany(ids: string[]) {
        SwalService.question.delete(SwalService.yesNoBasicOptions).then((answer) => {
            if (answer.dismiss) {
                this.onMassDeleteRejected(ids);
                return;
            }

            this.beforeRequest();
            this.service
                .deleteMany(ids)
                .pipe(finalize(this.afterRequest.bind(this)))
                .subscribe((res) => this.afterMassDelete(res, ids));
        });
    }

    public afterMassDelete(response: {success: boolean}, ids: string[]) {
        if (response.success) {
            remove(this.models, (model: any) => ids.includes(model._id));
            this.models = [...this.models];
            SwalService.success.delete();
        }
    }

    public onMassDeleteRejected(ids: string[]) {
        // Override to do stuff after delete rejection
    }

    public onSelect({ selected }: {selected: T[]}) {
        this.selected.splice(0, this.selected.length);
        this.selected.push(...selected);
    }

    public beforeRequest() {
        Loading.start();
        this.loading = true;
    }

    public afterRequest() {
        Loading.stop();
        this.loading = false;
    }

    private _injectDependencies() {
        this.router = Helpers.injector.get(Router);
        this.toaster = Helpers.injector.get(ToasterService);
    }
}
