import { Component, Input, OnInit } from '@angular/core';

import { WidgetComponent } from '../widget/widget.component';

@Component({
  selector: 'dashng-widget-holder',
  templateUrl: './widget-holder.component.html',
  styleUrls: ['./widget-holder.component.css']
})
export class WidgetHolderComponent implements OnInit {
  @Input() widget: WidgetComponent;

  constructor() { }

  ngOnInit() {
  }

}
