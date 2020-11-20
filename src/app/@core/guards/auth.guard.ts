import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, CanActivateChild, Router, RouterStateSnapshot} from "@angular/router";
import {NbAuthService} from "@nebular/auth";

@Injectable({
    providedIn: "root"
})
export class AuthGuard implements CanActivateChild {

    constructor(private auth: NbAuthService,
                private router: Router) {
    }

    async canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
        const is =  await this.auth.isAuthenticated().toPromise();

        if (!is) {
            await this.auth.logout("email").toPromise();
            this.router.navigate(["/auth/login"]);
            return false;
        }

        return is;
    }

}
