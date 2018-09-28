import { Component } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {

  public options = [ 'eins', 'zwei', 'drei' ];

  public errorSource = new Subject();

  public autocompleteHandler(query: string) {
    const autocompleteEntries = [
      'Germany', 'United Kingdom', 'United States', 'France', 'Canada', 'Italy', 'Sweden', 'Norway'
    ];

    return autocompleteEntries.filter(e => e.startsWith(query));
  }

  public emitError() {
    this.errorSource.error({ status: 500, message: 'something went wrong!' });
  }

}
