import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarComponent } from './calendar.component';

describe('CalendarComponent', () => {
  let component: CalendarComponent;
  let fixture: ComponentFixture<CalendarComponent>;
  let element: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalendarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarComponent);
    component = fixture.componentInstance;
    element = fixture.nativeElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('wenn als Datum der 14.10.2018 ausgewählt ist', () => {

    beforeEach(() => {
      component.date = new Date(2018, 9, 14);
      fixture.detectChanges();
    });

    it('sollte der Kalender mit Monatg, dem 01.10.2018 beginnen', () => {
      const days = element.querySelectorAll('.day');
      expect(days[0].innerHTML.trim()).toBe('1');
    });

    it('sollte der Kalender mit Sonntag, dem 04.11.2018 enden', () => {
      const days = element.querySelectorAll('.day');
      expect(days[days.length - 1].innerHTML.trim()).toBe('4');
    });

    it('sollte der Kalender 35 Tage anzeigen', () => {
      const days = element.querySelectorAll('.day');
      expect(days.length).toBe(35);
    });
  });

  describe('wenn als Datum der 01.02.2021 ausgewählt ist', () => {

    beforeEach(() => {
      component.date = new Date(2021, 1, 1);
      fixture.detectChanges();
    });

    it('sollte der Kalender mit Monatg, dem 01.02.2021 beginnen', () => {
      const days = element.querySelectorAll('.day');
      expect(days[0].innerHTML.trim()).toBe('1');
    });

    it('sollte der Kalender mit Sonntag, dem 28.02.2021 enden', () => {
      const days = element.querySelectorAll('.day');
      expect(days[days.length - 1].innerHTML.trim()).toBe('28');
    });

    it('sollte der Kalender 28 Tage anzeigen', () => {
      const days = element.querySelectorAll('.day');
      expect(days.length).toBe(28);
    });
  });
});
