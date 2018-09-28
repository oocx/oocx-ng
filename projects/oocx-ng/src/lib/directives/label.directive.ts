import { Directive, ViewContainerRef, TemplateRef, ComponentFactoryResolver, Input } from '@angular/core';

import { LabelComponent } from '../components/label/label.component';
import { LabelIdGeneratorService } from '../services/label-id-generator.service';

@Directive({
  selector: '[oxLabel]'
})
export class LabelDirective {

  @Input()
  set oxLabel(label: string) {
    this._label = label;
    this.updateView();
  }

  @Input()
  set oxLabelClass(c: string) {
    this._class = c;
    this.updateView();
  }

  private _label = '';

  private _class = null;

  constructor(
    private idGenerator: LabelIdGeneratorService,
    private viewContainer: ViewContainerRef,
    private templateRef: TemplateRef<any>,
    private componentFactoryResolver: ComponentFactoryResolver) {

  }

  private updateView() {
    const id = this.idGenerator.getNextId();

    this.viewContainer.clear();

    const labelFactory = this.componentFactoryResolver.resolveComponentFactory(LabelComponent);

    const labelComponent = this.viewContainer.createComponent(labelFactory);
    labelComponent.instance.label = this._label;
    labelComponent.instance.forId = id;
    labelComponent.instance.class = this._class;

    const view = this.viewContainer.createEmbeddedView(this.templateRef);
    view.rootNodes[0].id = id;
  }

}
