import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
    providedIn: "root"
})
export class Loading {

    public get isLoading() {
        return Loading.isLoading.getValue();
    }

    public static isLoading = new BehaviorSubject<boolean>(false);

    public loading: boolean = false;

    public static start() {
        Loading.isLoading.next(true);
    }

    public static stop() {
        Loading.isLoading.next(false);
    }

    constructor() {
        Loading.isLoading.subscribe(loading => {
            this.loading = loading;
        });
    }

    public start() {
        Loading.isLoading.next(true);
    }

    public stop() {
        Loading.isLoading.next(false);
    }
}
