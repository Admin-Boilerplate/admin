import { Injectable } from "@angular/core";
import { HttpService } from "./base/http.service";

@Injectable({
    providedIn: "root",
})
export class UsersService extends HttpService<{email: string, password: string}> {
    public baseUrl: string = "/users";
}
