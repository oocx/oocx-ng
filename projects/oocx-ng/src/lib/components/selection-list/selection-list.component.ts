import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'ox-selection-list',
  templateUrl: './selection-list.component.html',
  styleUrls: ['./selection-list.component.css']
})
export class SelectionListComponent {

  private m_selection: any;

  @Input()
  public set selection(s: any) {
    if (this.m_selection === s) { return; }
    this.m_selection = s;
    this.selectionChange.emit(s);
  }

  public get selection() {
    return this.m_selection;
  }

  @Input()
  public options: any[] = [];

  @Output()
  public selectionChange = new EventEmitter<any>();

  @Input()
  public displayValue = s => s

}
