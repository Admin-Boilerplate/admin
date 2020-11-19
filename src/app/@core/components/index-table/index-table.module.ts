import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndexTableComponent } from './index-table.component';
import {NgxDatatableModule} from "@swimlane/ngx-datatable";
import {NbActionsModule, NbButtonModule, NbCardModule, NbContextMenuModule, NbIconModule} from "@nebular/theme";
import {RouterModule} from "@angular/router";
import {TranslateModule} from "@ngx-translate/core";



@NgModule({
    declarations: [IndexTableComponent],
    exports: [
        IndexTableComponent
    ],
    imports: [
        CommonModule,
        NgxDatatableModule,
        NbButtonModule,
        RouterModule,
        NbIconModule,
        NbCardModule,
        NbActionsModule,
        NbContextMenuModule,
        TranslateModule
    ]
})
export class IndexTableModule { }
