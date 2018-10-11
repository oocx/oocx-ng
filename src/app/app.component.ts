import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit {

  public options = [ 'eins', 'zwei', 'drei' ];

  public errorSource = new Subject();


  public ngOnInit() {
    const colorItems = document.querySelectorAll('.colors > li');
    colorItems.forEach((li: HTMLElement) => {
      li.style.backgroundColor = 'var(--' + li.innerText + ')';
    });
  }

  public autocompleteHandler(query: string) {
    const autocompleteEntries = [
      'Austria', 'Italy',
      'Belgium', 'Latvia',
      'Bulgaria', 'Lithuania',
      'Croatia', 'Luxembourg',
      'Cyprus', 'Malta',
      'Czech Republic', 'Netherlands',
      'Denmark', 'Poland',
      'Estonia', 'Portugal',
      'Finland', 'Romania',
      'France', 'Slovakia',
      'Germany', 'Slovenia',
      'Greece', 'Spain',
      'Hungary', 'Sweden',
      'Ireland', 'United Kingdom'
    ];

    if (!query) {
      return autocompleteEntries;
    }

    return autocompleteEntries.filter(e => e.toLocaleLowerCase().startsWith(query.toLocaleLowerCase()));
  }

  public emitError() {
    this.errorSource.error({ status: 500, message: 'something went wrong!' });
  }

}
