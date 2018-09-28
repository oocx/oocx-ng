import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AutocompleteComponent } from './components/autocomplete/autocomplete.component';
import { InputNumberDirective } from './directives/input-number.directive';
import { InputNumberComponent } from './components/input-number/input-number.component';
import { SelectionListComponent } from './components/selection-list/selection-list.component';
import { AutocompleteMultiselectComponent } from './components/autocomplete-multiselect/autocomplete-multiselect.component';
import { HistoryBackDirective } from './directives/history-back.directive';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { LabelDirective } from './directives/label.directive';
import { LabelComponent } from './components/label/label.component';
import { CheckboxComponent } from './components/checkbox/checkbox.component';
import { DurationPipe } from './pipes/duration.pipe';
import { CalendarComponent } from './components/calendar/calendar.component';
import { InputDateComponent } from './components/input-date/input-date.component';

const publicComponents = [
  AutocompleteComponent,
  InputNumberDirective,
  InputNumberComponent,
  SelectionListComponent,
  AutocompleteMultiselectComponent,
  HistoryBackDirective,
  SpinnerComponent,
  CalendarComponent,
  InputDateComponent,
  LabelDirective,
  LabelComponent,
  CheckboxComponent,
  DurationPipe
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
  ],
  declarations: publicComponents,
  exports: publicComponents,
  entryComponents: [LabelComponent]
})
export class OocxNgModule { }

