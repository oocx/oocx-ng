import { DomHelperService } from '../../services/dom-helper.service';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AutocompleteMultiselectComponent } from './autocomplete-multiselect.component';

describe('AutocompleteMultiselectComponent', () => {
  let component: AutocompleteMultiselectComponent;
  let fixture: ComponentFixture<AutocompleteMultiselectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserModule,
        FormsModule
      ],
      providers: [
        DomHelperService
      ],
      declarations: [ AutocompleteMultiselectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AutocompleteMultiselectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
