import { Component, Input, Output, EventEmitter, ViewChild, ViewChildren, ContentChild, QueryList,
  ElementRef, TemplateRef, AfterContentInit
} from '@angular/core';

import { DomHelperService } from '../../services/dom-helper.service';

@Component({
  selector: 'ox-autocomplete-multiselect',
  templateUrl: './autocomplete-multiselect.component.html',
  styleUrls: ['./autocomplete-multiselect.component.less']
})
export class AutocompleteMultiselectComponent implements AfterContentInit {

    private textField: string;

    public get text() {
      return this.textField;
    }

    @Input()
    public set text(val: string) {
      this.textField = val;
      this.textChange.emit(val);
    }

    public get values() {
      return this.selectedOptions.join(', ');
    }

    @Output()
    public textChange = new EventEmitter<string>();

    @Input()
    public set values(val: string) {
      if (val && val.length > 0) {
        this.selectedOptions = val.split(', ');
      } else {
        this.selectedOptions = [];
      }
      this.valuesChange.emit(val);
    }

    @Output()
    public valuesChange = new EventEmitter<string>();

    @Input()
    public name: string;

    @Input()
    public completionHandler: (input: string, selected: string[]) => string[];

    public autocompleteEntries: string[] = [];

    public selectedIndex = -1;

    public selectedOptions: string[] = [];

    public template: TemplateRef<{}>;

    @ContentChild(TemplateRef)
    public content: TemplateRef<{}>;

    @ViewChild('input', { static: true })
    public input: ElementRef;

    @ViewChild('defaultTemplate', { static: true })
    public defaultTemplate: TemplateRef<{}>;

    @ViewChildren('listItem')
    private listItems: QueryList<ElementRef>;

    @Input()
    public valueSelector = obj => obj != null ?  obj.toString() : null

    public constructor(private dom: DomHelperService) {
    }

    public ngAfterContentInit(): void {
      this.template = this.content ? this.content : this.defaultTemplate;
    }

    public onKeyUp(e: KeyboardEvent) {
      if (e.keyCode < 48 && (e.keyCode !== 8)) {
        return;
      }

      if (this.completionHandler) {
        this.autocompleteEntries = this.completionHandler(this.text, this.selectedOptions);
        if (this.autocompleteEntries.length === 1) {
          this.selectedIndex = 0;
        }
      }

      if (this.text.length === 0) {
        this.selectedIndex = -1;
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

      e.stopPropagation();
      e.stopImmediatePropagation();
    }

    public onEnter(e: KeyboardEvent) {
      if (this.selectedIndex > -1 && this.selectedIndex < this.listItems.length) {
        this.addOption(this.valueSelector(this.autocompleteEntries[this.selectedIndex]));
      } else {
        if (!this.text || this.text.length === 0) {
          return;
        }
        this.addOption(this.text);
      }
      this.text = null;
      this.autocompleteEntries = [];
      this.selectedIndex = -1;
      e.stopPropagation();
      e.stopImmediatePropagation();
    }

    public onEscape() {
      this.autocompleteEntries = [];
    }

    public onDblClick() {
      this.autocompleteEntries = this.completionHandler(null, this.selectedOptions);
    }

    public onBlur(e: FocusEvent) {
      setTimeout(() => {
        const input = <HTMLInputElement>this.input.nativeElement;
        if (input.ownerDocument.activeElement === input) {
          return;
        }
        this.addOption(this.text);
        this.text = null;
        this.autocompleteEntries = [];
      }, 200);
    }

    public onDelete() {
      const input = <HTMLInputElement>(this.input.nativeElement);
      if (input.selectionStart === 0 && input.selectionEnd === 0) {
        this.text = this.selectedOptions.pop();
        this.emitChangeEvent();
      }
    }

    public editOption(e: Event, text: string) {
      const idx = this.selectedOptions.indexOf(text);
      this.selectedOptions.splice(idx, 1);
      this.text = text;
      this.emitChangeEvent();
      e.preventDefault();
      e.stopPropagation();
      e.stopImmediatePropagation();
      setTimeout(() => {
        this.input.nativeElement.focus();
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
        this.addOption(this.valueSelector(this.autocompleteEntries[this.selectedIndex]));
        this.autocompleteEntries = [];
        this.input.nativeElement.focus();
        this.text = null;
      }
    }

  private addOption(text: string) {
    if (!text || text.length === 0) { return; }

    this.selectedOptions.push(text);
    this.emitChangeEvent();
  }

  private emitChangeEvent() {
    const text = this.values;
    this.valuesChange.emit(text);
  }
}

