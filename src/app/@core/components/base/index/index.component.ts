import {AbstractType, Component, InjectionToken, Type} from "@angular/core";
import {IPage, IPaginate} from "../../../interfaces/base/Paginate";
import {IHttpService} from "../../../interfaces/base/HttpService";
import {Router} from "@angular/router";
import {ToasterService} from "../../../services/general/toaster.service";
import {remove} from "lodash";
import {HelpersService} from "../../../services/general/helpers.service";
import {finalize} from "rxjs/operators";
import {IJsonResponse} from "../../../interfaces/JsonResponse";
import {SwalService} from "../../../services/general/swal.service";
import {Loading} from "../../../services/general/loading.service";


@Component({
    selector: "app-index",
    template: ""
})
export class IndexComponent<T = any> {

    public models: T[] = [];

    public loading: boolean = false;

    // Handling pagination
    public page: IPage = {};

    // Injected
    public service: IHttpService<T>;
    public router: Router;
    public toaster: ToasterService;

    constructor() {
        this._injectDependencies();
    }

    public setUp(service: Type<IHttpService<T>> | InjectionToken<IHttpService<T>> | AbstractType<IHttpService<T>>) {
        this.service = HelpersService.injector.get(service);

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

    public beforeRequest() {
        Loading.start();
        this.loading = true;
    }

    public afterRequest() {
        Loading.stop();
        this.loading = false;
    }

    private _injectDependencies() {
        this.router = HelpersService.injector.get(Router);
        this.toaster = HelpersService.injector.get(ToasterService);
    }
}
