import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'duration'
})
export class DurationPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (typeof value !== 'number') { return value; }

    const neg = value < 0 ? '-' : '';
    value = Math.abs(value);

    const stunden = Math.floor(value);
    const minuten = Math.round((value - stunden) * 60);
    if (minuten < 10) {
      return neg + stunden + ':0' + minuten;
    }
    return neg + stunden + ':' + minuten;
  }

}
