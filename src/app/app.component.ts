import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {


  title = 'oocx-ng-demo';

  public autocompleteHandler(query: string) {
    const autocompleteEntries = [
      'Germany', 'United Kingdom', 'United States', 'France', 'Canada', 'Italy', 'Sweden', 'Norway'
    ];

    return autocompleteEntries.filter(e => e.startsWith(query));
  }

}
