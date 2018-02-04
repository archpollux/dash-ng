import {
  Component,
  ElementRef,
  Input,
  QueryList,
  Renderer2,
  ViewChildren
} from '@angular/core';

import { ContainerConfig, FlexContainerType } from './dashboard-config.model';

export abstract class ResizingComponent {
  @Input() config: ContainerConfig;
  @Input() flexSize: number;

  constructor(protected el: ElementRef,
              protected renderer: Renderer2) { }

  getActualSize(flexType: FlexContainerType) {
    const el = this.el.nativeElement;
    return flexType === FlexContainerType.row ? el.offsetHeight : el.offsetWidth;
  }

  resizeContainers(delta: number,
                   childIndex1: number,
                   childIndex2: number
  ) {
    if (!delta) return;

    const container1 = this.config.components[childIndex1];
    const container2 = this.config.components[childIndex2];

    if (container1.flexSize + delta >= 0) {
      container1.flexSize += delta;
    }

    if (container2.flexSize - delta <= this.flexSize) {
      container2.flexSize -= delta;
    }
  }

  normalizeChildren(config: ContainerConfig): ContainerConfig {
    if (!(config.components && config.components.length)) return config;

    const total = config.components.reduce((sum, item) => sum + item.flexSize, 0);
    const size = this.getActualSize(config.components[0].flexType);

    config.components.forEach(component => {
      console.log(size, total, component.flexSize);
      component.size = Math.round(size / total * component.flexSize);
    });

    return config;
  }
}
