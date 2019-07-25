import { Component, ElementRef, ViewChild, HostListener, EventEmitter, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { format, parse } from 'date-fns/esm';

import { CalendarComponent } from '../calendar/calendar.component';
import { AutocompleteDateService } from '../../services/autocomplete-date.service';

@Component({
  selector: 'ox-input-date',
  templateUrl: './input-date.component.html',
  styleUrls: ['./input-date.component.less'],
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: InputDateComponent, multi: true }
  ]
})
export class InputDateComponent implements ControlValueAccessor {

  @ViewChild('input', { static: true })
  public input: ElementRef<HTMLInputElement>;

  @ViewChild('calendar', { static: false })
  public calendar: CalendarComponent;

  @Output()
  public valueChange = new EventEmitter<Date>();

  public showCalendar = false;

  private rawDateString = '';

  private _date: Date = null;

  public writeValue(value: any): void {
    if (value) {
      if (value instanceof Date) {
        this.dateString = format(value, 'dd.MM.yyyy');
      } else if (typeof value === 'string') {
        this.dateString = value;
      }
    } else {
      this.dateString = null;
      this._date = null;
    }
  }
  public registerOnChange(fn: any): void {
    this.valueChange.subscribe(fn);
  }
  public registerOnTouched(fn: any): void {
  }

  public setDisabledState(isDisabled: boolean): void {
  }

  public set date(value: Date) {
    this._date = value;
    if (value) {
      this.rawDateString = format(value, 'dd.MM.yyyy');
    } else {
      this.rawDateString = '';
    }
    this.valueChange.emit(value);
  }

  public get date() {
    return this._date;
  }

  public set dateString(value: string) {
    this.rawDateString = value;
    if (value) {
      this.trySetDate(value);
    } else {
      this.date = null;
    }
  }

  public get dateString() {
    if (!this.date) { return ''; }
    return format(this.date, 'dd.MM.yyyy');
  }

  @HostListener('focusout')
  public onFocusOut() {
    setTimeout(() => {
      // wichtig: über setTimeout, damit weitere Events wie z.B. Klick auf Kalender
      // ausgewertet werden
      if (!this.isChildElement(document.activeElement)) {
        this.dateString = this.completeDate(this.rawDateString);
        this.showCalendar = false;
      }
    }, 100);
  }

  public onInputFocus() {
    this.showCalendar = true;
  }

  public onInputClick() {
    this.showCalendar = true;
  }

  constructor(private autocompleteDate: AutocompleteDateService) { }

  public selectedDateChanged(date: Date) {
    this.date = date;
    this.input.nativeElement.focus();
  }

  public prev() {
    this.calendar.prev();
  }

  public next() {
    this.calendar.next();
  }

  private isChildElement(e: Element) {
    if (e === null || e.parentElement === null) { return false; }
    return (e.parentElement === this.input.nativeElement.parentElement) ||
        this.isChildElement(e.parentElement);
  }

  private trySetDate(value: string) {
    try {
      if (!value) { return; }
      const base = this.date ? this.date : new Date();
      const d = parse(value, 'dd.MM.yyyy', base);
      if (format(d, 'dd.MM.yyyy') === value) {
        this.date = d;
        return;
      }
    } catch { }
  }

  private completeDate(date: string) {
    return this.autocompleteDate.completeDate(date, this._date);
  }

}
