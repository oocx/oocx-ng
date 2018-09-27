import { Subscription ,  Observable ,  ObservableInput } from 'rxjs';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class DataSourceService<T> {
    public SubscribeToSource(source: Observable<T[]>) {
        return new DataSourceSubscription(source);
    }
}

export class DataSourceSubscription<T> {

    public data: T[] = [];

    public rawData: T[] = [];

    public orderBy: keyof T = null;

    public orderByDir: 1 | -1 = -1;

    public filter: (item: T) => boolean = null;

    private subscription: Subscription = null;

    private catchHandler: (err: any, caught: Observable<T[]>) => ObservableInput<any> = null;

    constructor(private source: Observable<T[]>) {
        setTimeout(() => {
            this.subscription = source.pipe(catchError((err, caught) => this.onCatch(err, caught)))
            .subscribe(result => {
                this.rawData = <T[]>result;
                this.updateData();
            });
        }, 0);
    }

    public catch<R>(selector: (err: any, caught: Observable<T[]>) => ObservableInput<R>) {
        this.catchHandler = selector;

        return {
            subscribe() {
                // TODO - erst mal da, weil es der spinner zur Fehlerbehandlung braucht
            }
        };
    }

    public unsubscribe() {
        this.subscription.unsubscribe();
    }

    public updateData() {
        let result = this.rawData;
        if (this.filter != null) {
            result = result.filter((item) => this.filter(item))
        }
        if (this.orderBy != null) {
            result = result.sort((a, b) => this.sort(a, b));
        }
        this.data = result;
    }

    public getColumns(predefinedColumns: string[] = []): string[] {
        if (!this.data || this.data.length < 1) { return []; }
        return predefinedColumns.concat(
             Object.getOwnPropertyNames(this.data[0])
             .filter(c => predefinedColumns.indexOf(c) === -1)
        );
    }

    private sort(a: T, b: T) {
        if (a[this.orderBy] === b[this.orderBy]) { return 0; }

        let result = a[this.orderBy] > b[this.orderBy] ? 1 : -1;
        if (typeof a[this.orderBy] === 'undefined' && typeof b[this.orderBy] === 'undefined') { result = 0; }
        if (typeof a[this.orderBy] === 'undefined') { result = -1; }
        if (typeof b[this.orderBy] === 'undefined') { result = 1; }

        return result * this.orderByDir;
    }

    private onCatch<R>(err: any, caught: Observable<T[]>): ObservableInput<R> {
        if (this.catchHandler) {
            return this.catchHandler(err, caught);
        }
        return [];
    }
}
