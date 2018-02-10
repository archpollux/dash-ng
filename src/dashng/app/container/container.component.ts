import {
  Attribute,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  QueryList,
  OnInit,
  Output,
  Renderer2,
  ViewChild,
  ViewChildren
} from '@angular/core';

import { ContainerConfig } from '../shared/dashboard-config.model';
import { ResizingComponent } from '../shared/resizing-component';
import { WidgetHolderComponent } from '../widget-holder/widget-holder.component';

@Component({
  selector: 'dashng-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.css'],
})
export class ContainerComponent extends ResizingComponent {
  sizeAcquired: EventEmitter<number>;

  @ViewChild(WidgetHolderComponent) widgetHolder: WidgetHolderComponent;

  constructor(el: ElementRef,
              protected cd: ChangeDetectorRef) {
    super(el);
    this.cd.detach();
    this.sizeAcquired = new EventEmitter<number>();
    this.sizeSub = this.sizeAcquired.subscribe(actualSize => {
      this.sizeSub.unsubscribe();
      this.normalizeChildren(this.config);
      let reattach = this.cd.reattach.bind(this.cd);
      setTimeout(reattach, 0);
    });
  }

  ngAfterViewChecked() {
    this.sizeAcquired.emit(this.getActualSize(ContainerConfig.oppositeType(this.config.flexType)));
  }
}
