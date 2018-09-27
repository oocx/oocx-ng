import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { getISOWeek } from 'date-fns/esm';

@Component({
  selector: 'ox-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.less']
})
export class CalendarComponent implements OnInit {

  @Input()
  public set date(value: Date) {
    if (value === null) {
      this.selectedDate = null;
      this._date = new Date();
    } else {
      this._date = value;
    }
    this.update();
  }

  @Output()
  public selectedDateChanged = new EventEmitter<Date>();

  public get date() {
    if (this._date) {
      return this._date;
    } else {
      return new Date();
    }
  }

  public get month() {
    return this.date.getMonth() + 1;
  }

  public get year() {
    return this.date.getFullYear();
  }

  public get day() {
    return this.date.getDay();
  }

  public set selectedDate(value: Date) {
    this._selectedDate = value;
    this.selectedDateChanged.emit(value);
  }

  public get selectedDate() {
    return this._selectedDate;
  }

  public days: Date[] = [];

  public dayNames = [ '', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So' ];

  public monthNames = [
    'Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'];

  private _date = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate());

  private _selectedDate: Date = null;

  constructor() {

  }

  ngOnInit() {
    this.update();
  }

  public isSelected(day: Date) {
    if (!this.selectedDate) { return false; }
    return (day.getTime() - this.selectedDate.getTime()) === 0;
  }

  public getDay(day: Date) {
    const result = ((day.getDay() + 6) % 7) + 1;
    return result;
  }

  public getWeek(day: Date) {
    return getISOWeek(day);
  }

  public next() {
    this.date = new Date(this.year, this._date.getMonth() + 1, 1);
  }

  public prev() {
    this.date = new Date(this.year, this._date.getMonth() - 1, 1);
  }

  private update() {
    this.days = [];
    const start = new Date(this.year, this.month - 1, 1);
    let week = 1;
    let current = start;

    // Woche mit Tagen aus dem Vormonat auffüllen
    for (let i = 1; i < this.getDay(start); i++) {
      const diff = this.getDay(start) - i;
      const day = new Date(this.year, this.month - 1, 1 - diff);
      day['week'] = week;
      this.days.push(day);
    }

    // übrige Tage des Monats ergänzen
    while (current.getMonth() === start.getMonth()) {
      if (this.getDay(current) === 1) { week++; }
      current['week'] = week;
      this.days.push(current);
      current = new Date(this.year, this.month - 1, current.getDate() + 1);
    }

    // letzte Woche auffüllen
    current = this.days[this.days.length - 1];
    const days = 7 - this.getDay(current);
    for (let i = 1; i <= days; i++) {
      current = new Date(this.year, this.month, i);
      current['week'] = week;
      this.days.push(current);
    }

  }
}
