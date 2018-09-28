import { Component, Input, Output, EventEmitter, ViewChild, ViewChildren, ContentChild, QueryList,
  ElementRef, TemplateRef, AfterContentInit, NgZone
} from '@angular/core';

import { DomHelperService } from '../../services/dom-helper.service';

@Component({
  selector: 'ox-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.less']
})
export class AutocompleteComponent implements AfterContentInit {

    private textField: string;

    public get text() {
      return this.textField;
    }

    @Input()
    public set text(val: string) {
      if (this.textField === val) { return; }
      this.textField = val;
      this.textChange.emit(val);
    }

    @Output()
    public textChange = new EventEmitter<string>();

    @Output()
    public newEntry = new EventEmitter<string>();

    @Output()
    public valueChange = new EventEmitter<any>();

    @Input()
    public name: string;

    @Input()
    public completionHandler: (string) => string[];

    @Input()
    public allowNewEntry = '';

    public autocompleteEntries: string[] = [];

    public selectedIndex = -1;

    public template: TemplateRef<{}>;

    @ContentChild(TemplateRef)
    public content: TemplateRef<{}>;

    @ViewChild('input')
    public input: ElementRef;

    @ViewChild('defaultTemplate')
    public defaultTemplate: TemplateRef<{}>;

    @ViewChildren('listItem')
    private listItems: QueryList<ElementRef>;

    @Input()
    public valueSelector = obj => obj != null ?  obj.toString() : null

    public constructor(private dom: DomHelperService, private zone: NgZone) {
    }

    public ngAfterContentInit(): void {
      this.template = this.content ? this.content : this.defaultTemplate;
    }

    public onKeyUp(e: KeyboardEvent) {
      if (e.keyCode < 48 && (e.keyCode !== 8)) {
        return;
      }

      this.valueChange.emit(null);

      if (this.completionHandler) {
        this.autocompleteEntries = this.completionHandler(this.text);

        if (this.autocompleteEntries.length === 1) {
          this.selectedIndex = 0;
          const val = this.valueSelector(this.autocompleteEntries[0]);
          if (val.toLowerCase() === this.text.toLowerCase()) {
            this.text = val;
            this.valueChange.emit(this.autocompleteEntries[0]);
          }
        }

        if (this.text.length === 0) {
          this.selectedIndex = -1;
        }

        if (this.allowNewEntry && this.text.length > 0) {
          this.autocompleteEntries.push(this.allowNewEntry);
        }
      }

      e.stopPropagation();
    }

    public onDown(e: KeyboardEvent) {
      if (this.autocompleteEntries.length < 1) {
        return;
      }

      this.selectIndex(this.selectedIndex + 1);
      if (this.selectedIndex >= this.autocompleteEntries.length) {
        this.selectIndex(0);
      }
      e.preventDefault();
      e.stopPropagation();
      e.stopImmediatePropagation();
    }

    public onUp(e: KeyboardEvent) {
      if (this.autocompleteEntries.length < 1) {
        return;
      }

      this.selectIndex(this.selectedIndex - 1);
      if (this.selectedIndex < -1) {
        this.selectIndex(this.autocompleteEntries.length - 1);
      }
      e.preventDefault();
      e.stopPropagation();
      e.stopImmediatePropagation();
    }

    public onEnter(e) {

      if (!(this.selectedIndex > -1 && this.selectedIndex < this.listItems.length)) { return; }

      const value = this.autocompleteEntries[this.selectedIndex];

      if (value === this.allowNewEntry) {
        this.newEntry.emit(this.text);
      } else {
        this.text = this.valueSelector(value);
        this.valueChange.emit(value);
        this.autocompleteEntries = [];
        this.dom.focusNextCell(this.input.nativeElement);
      }
      e.preventDefault();
      e.stopPropagation();
      e.stopImmediatePropagation();
    }

    public onEscape() {
      this.autocompleteEntries = [];
    }

    public onBlur(e: FocusEvent) {
      setTimeout(() => {
        this.autocompleteEntries = [];
      }, 100);
    }

    public selectIndex(idx: number, e: Event = null) {
      this.selectedIndex = idx;
      if (idx >= 0 && idx < this.listItems.length) {
        const listItem = this.listItems.find((item, index) => index === idx);
        const el: HTMLElement = listItem.nativeElement;
        const bounds = el.getBoundingClientRect();
        if (!(bounds.top >= 0 && bounds.bottom <= window.innerHeight)) {
          el.scrollIntoView(false);
        }
      }

      if (e) {
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
        const value = this.autocompleteEntries[this.selectedIndex];
        this.text = this.valueSelector(value);
        this.valueChange.emit(value);

        this.autocompleteEntries = [];
      }

      if (e || idx === -1) {
        const input = <HTMLInputElement>this.input.nativeElement;
        input.focus();
        input.selectionEnd = input.selectionStart = input.value.length;
      }
    }
}

