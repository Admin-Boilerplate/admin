import {Injectable} from "@angular/core";
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {BehaviorSubject, Observable, throwError} from "rxjs";
import {LocalStorageService} from "ngx-webstorage";
import {catchError} from "rxjs/operators";
import {ToasterService} from "../services/general/toaster.service";
import {environment} from "../../../environments/environment";
import {NbTokenLocalStorage} from "@nebular/auth";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    private isRefreshing = false;
    private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

    constructor(
        private _toasterService: ToasterService,
        private ls: LocalStorageService,
        private tokenService: NbTokenLocalStorage
    ) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let Req: HttpRequest<any>;
        const url = req.url;

        const _token: string = this.tokenService.get().getValue();
        const language: string = this.ls.retrieve("language");

        if (_token) {
            req = this._addHeader(req, "Authorization", `Bearer ${_token}`);
        }

        if (language) {
            req = this._addHeader(req, "Content-Language", language);
        }
        if (url.indexOf("oauth") >= 0 || url.indexOf("translations") >= 0 || url.startsWith("http")) {
            Req = req.clone({
                url
            });
        } else {
            Req = req.clone({
                url: environment.serverUrl + url
            });
        }

        return next.handle(Req).pipe(
            catchError((err) => {
                const error = err.statusText || (err.error && err.error.message) || err;
                if (err) {
                    this._toasterService.error("Error", error);
                    return throwError(error);
                }
            })
        );
    }

    private _addHeader(request: HttpRequest<any>, key: string, value: string) {
        return request.clone({
            setHeaders: { [key]: value }
        });
    }

    // private _handle401Error(request: HttpRequest<any>, next: HttpHandler) {
    //     if (!this.isRefreshing) {
    //         this.isRefreshing = true;
    //         this.refreshTokenSubject.next(null);
    //
    //         return this._authenticationService.refreshToken().pipe(
    //             switchMap((response: any) => {
    //                 this.isRefreshing = false;
    //                 if (response.data) {
    //                     this.refreshTokenSubject.next(response.data.token);
    //                     const req = this._addHeader(request, "Authorization", `Bearer ${response.data}`);
    //                     return next.handle(req);
    //                 } else {
    //                     // TODO log out user
    //                     return next.handle(request);
    //                 }
    //             })
    //         );
    //     } else {
    //         return this.refreshTokenSubject.pipe(
    //             filter((token) => token != null),
    //             take(1),
    //             switchMap((jwt) => {
    //                 return next.handle(this._addHeader(request, "Authorization", `Bearer ${jwt}`));
    //             })
    //         );
    //     }
    // }
}
