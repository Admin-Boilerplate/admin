import {ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChild, Input, OnInit, TemplateRef, ViewChild} from "@angular/core";
import {IndexComponent} from "../base/index/index.component";
import {NbMenuService} from "@nebular/theme";
import {map} from "rxjs/operators";
import {DatatableComponent, TableColumn} from "@swimlane/ngx-datatable";
import {Translate} from "../../services/general/translate.service";
import {marker} from "@biesbjerg/ngx-translate-extract-marker";
import {UntilDestroy} from "@ngneat/until-destroy";
import {IIndexTableConfig} from "../../interfaces/components/IndexTable";

@UntilDestroy({ checkProperties: true })
@Component({
    selector: "admin-index-table",
    templateUrl: "./index-table.component.html",
    styleUrls: ["./index-table.component.scss"]
})
export class IndexTableComponent implements OnInit {

    @ViewChild("actionsTemplate")
    public actionsTemplate: TemplateRef<any>;

    @Input() i: IndexComponent;
    @Input("columns") set columns(columns: TableColumn[]) {
        this._columns = this._setColumns(columns);
    }
    get columns() {
        return this._columns;
    }
    protected _columns: TableColumn[];
    @Input("config") set setConfig(config: IIndexTableConfig) {
        this.config = this._setConfig(config);
    }
    public config: IIndexTableConfig;

    @ContentChild(TemplateRef) itemTemplate: TemplateRef<any>;

    public contextMenu = [
        {
            data: "mass-delete",
            title: Translate.this(marker("Bulk delete of selected"))
        }
    ];

    constructor(private menuService: NbMenuService) {
    }

    ngOnInit(): void {
        if (!this.config) {
            this.config = this._setConfig();
        }

        this.menuService.onItemClick()
            .pipe(
                map(({item: { data }}) => data)
            )
            .subscribe(data => {
                switch (data) {
                    case "mass-delete":
                        this.i.deleteMany(this.i.selected.map(selected => selected._id));
                        break;
                }
            });
    }

    public basicConfig(): IIndexTableConfig {
        return {
            hasActions: true,
            hasMassActions: true,
            hasCreate: true,
            hasEdit: true,
            hasDelete: true
        };
    }

    private _setConfig(config?: IIndexTableConfig): IIndexTableConfig {
        return {
            ...this.basicConfig(),
            ...(config || {})
        };
    }

    private _setColumns(columns: TableColumn[]) {
        const finalColumns: TableColumn[] = columns;

        if (this.config.hasMassActions) {
            finalColumns.unshift({
                name: "",
                $$id: "asd",
                maxWidth: 45,
                checkboxable: true,
                sortable: false
            });
        }
        if (this.config.hasMassActions) {
            finalColumns.push(
                {
                    name: Translate.this(marker("Actions")),
                    cellTemplate: this.actionsTemplate,
                    prop: "_id",
                    sortable: false
                }
            );
        }

        return finalColumns;
    }
}
