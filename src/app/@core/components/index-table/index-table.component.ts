import {Component, ContentChild, Input, OnDestroy, OnInit, TemplateRef, ViewChild} from "@angular/core";
import {IndexComponent} from "../base/index/index.component";
import {NbMenuService} from "@nebular/theme";
import {Subject} from "rxjs";
import {map, takeUntil} from "rxjs/operators";
import {ActivatedRoute, Router} from "@angular/router";
import {TableColumn} from "@swimlane/ngx-datatable";

@Component({
    selector: "admin-index-table",
    templateUrl: "./index-table.component.html",
    styleUrls: ["./index-table.component.scss"]
})
export class IndexTableComponent implements OnInit, OnDestroy {

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

    @ContentChild(TemplateRef) itemTemplate: TemplateRef<any>;

    public contextMenu = [
        {
            data: "mass-delete",
            title: "Μαζική διαγραφή επιλεγμένων"
        }
    ];

    private _unsub$ = new Subject();

    constructor(private menuService: NbMenuService,
                private activatedRoute: ActivatedRoute,
                private router: Router) {
    }

    ngOnInit(): void {
        this.menuService.onItemClick()
            .pipe(
                takeUntil(this._unsub$),
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

    private _setColumns(columns: TableColumn[]) {
        const finalColumns: TableColumn[] = columns;

        finalColumns.unshift({
            name: "A/A",
            $$id: "asd",
            maxWidth: 45,
            checkboxable: true,
            sortable: false
        });
        finalColumns.push(
            {
                name: "Actions",
                cellTemplate: this.actionsTemplate,
                prop: "_id",
                sortable: false
            }
        );

        return finalColumns;
    }

    ngOnDestroy(): void {
        this._unsub$.next();
        this._unsub$.complete();
    }

}
