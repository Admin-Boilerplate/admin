/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import {BrowserModule} from "@angular/platform-browser";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {NgModule} from "@angular/core";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {CoreModule} from "./@core/core.module";
import {ThemeModule} from "./@theme/theme.module";
import {AppComponent} from "./app.component";
import {AppRoutingModule} from "./app-routing.module";
import {NbChatModule, NbDatepickerModule, NbDialogModule, NbIconLibraries, NbMenuModule, NbSidebarModule, NbToastrModule, NbWindowModule} from "@nebular/theme";
import {NgxWebstorageModule} from "ngx-webstorage";
import {NgxSpinnerModule} from "ngx-spinner";
import {TranslateHttpLoader} from "@ngx-translate/http-loader";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {environment} from "../environments/environment";


export function createTranslateLoader(http: HttpClient) {
    return new TranslateHttpLoader(http, "assets/translations/", ".json");
}

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        AppRoutingModule,

        ThemeModule.forRoot(),
        NbSidebarModule.forRoot(),
        NbMenuModule.forRoot(),
        NbDatepickerModule.forRoot(),
        NbDialogModule.forRoot(),
        NbWindowModule.forRoot(),
        NbToastrModule.forRoot(),
        NbChatModule.forRoot({
            messageGoogleMapKey: "AIzaSyA_wNuCzia92MAmdLRzmqitRGvCF7wCZPY",
        }),
        NgxWebstorageModule.forRoot({
            prefix: "",
            separator: "",
            caseSensitive: true,
        }),
        TranslateModule.forRoot({
            defaultLanguage: environment.defaultLanguage,
            loader: {
                provide: TranslateLoader,
                useFactory: createTranslateLoader,
                deps: [HttpClient]
            }
        }),
        NgxSpinnerModule,
        CoreModule.forRoot(),
    ],
    bootstrap: [AppComponent],
})
export class AppModule {
    constructor(private icons: NbIconLibraries) {
        this.icons.registerFontPack('font-awesome', { iconClassPrefix: 'fa' });
        this.icons.setDefaultPack('font-awesome');
    }
}

