import { Injectable } from "@angular/core";
import { HttpService } from "./base/http.service";
import {IUser} from "../../interfaces/models/User";

@Injectable({
    providedIn: "root",
})
export class UsersService extends HttpService<IUser> {
    public baseUrl: string = "/users";
}
