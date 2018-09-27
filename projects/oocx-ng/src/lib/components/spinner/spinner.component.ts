import { DataSourceSubscription } from '../../services/datasource.service';
import { Subscription ,  Observable } from 'rxjs';
import { Component, OnInit, Input, HostBinding, ChangeDetectorRef, OnDestroy, HostListener } from '@angular/core';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'ox-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.less']
})
export class SpinnerComponent implements OnDestroy {

  @HostBinding('class.error')
  public hasError = false;

  public errorStatus = '';

  public errorMessage = '';

  private sub: Subscription;

  private source: Observable<any> | DataSourceSubscription<any> = null;

  constructor(private changeDetector: ChangeDetectorRef) {}

  @HostListener('click')
  public onClick() {
    this.errorSource = this.source;
  }

  @Input()
  public set errorSource(value: Observable<any> | DataSourceSubscription<any>) {
    this.source = value;

    if (this.sub) { this.sub.unsubscribe(); }

    if (value == null) { return; }

    if (value['pipe']) {
      this.sub = (<Observable<any>>value).pipe(catchError((err, caught) => {
        console.log('spinner.catchError ' + err);
        this.onError(err);
        return [];
      }))
      .subscribe(r => {}, err => {
        console.log('spinner.subscribe err ' + err);
        this.onError(err);
      });
    } else if (value['catch']) {
        (<DataSourceSubscription<any>>value).catch((err, caught) => {
        console.log('spinner.catch ' + err);
        this.onError(err);
        return [];
      });
    }
  }

  public ngOnDestroy() {
    if (this.sub) { this.sub.unsubscribe(); }
  }

  private onError(err: any) {
    this.hasError = true;
    this.errorStatus = err.status ? err.status : '!';
    this.errorMessage = err.message ? err.message : err;
    this.changeDetector.detectChanges();
    return [];
  }

}
