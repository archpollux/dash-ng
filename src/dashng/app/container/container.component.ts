import {
  Attribute,
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
  styleUrls: ['./container.component.css']
})
export class ContainerComponent extends ResizingComponent {
  @ViewChild(WidgetHolderComponent) widgetHolder: WidgetHolderComponent;

  constructor(el: ElementRef,
              renderer: Renderer2) {
    super(el, renderer);
  }
}
