import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AutocompleteDateService {

  public completeDate(date: string, baseDate = new Date()) {

    if (!date) { return ''; }
    if (!baseDate) { baseDate = new Date(); }

    if (date.endsWith('.')) {
      date = date + baseDate.getFullYear();
      if (date[1] === '.') { date = '0' + date; }
      if (date[4] === '.') { date = date.substring(0, 3) + '0' + date.substring(3); }
      return;
    }
    const parts = date.split('.');

    if (parts.length === 2 || parts.length === 3) {
      if (parts[0].length === 1) { parts[0] = '0' + parts[0]; }
      if (parts[1].length === 1) { parts[1] = '0' + parts[1]; }
      if (parts.length === 2) {
        date = parts[0] + '.' + parts[1] + '.' + baseDate.getFullYear();
      } else if (parts[2].length === 2 ) {
        date = parts[0] + '.' + parts[1] + '.20' + parts[2];
      } else if (parts[2].length === 4 ) {
        date = parts[0] + '.' + parts[1] + '.' + parts[2];
      }
    }

    return date;
  }
}
