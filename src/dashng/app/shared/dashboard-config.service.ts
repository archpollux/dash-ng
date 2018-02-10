import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { ContainerConfig, FlexContainerType } from './dashboard-config.model';

@Injectable()
export class DashboardConfigService {
  constructor(private http: HttpClient) { }

  getConfig(configUrl: string): Observable<ContainerConfig> {
    return this.http
      .get(configUrl)
      .map(data => this.parseConfig(data))
    ;
  }

  parseConfig(config: any): any {
    const mainSize = config.mainLayout.reduce((sum, item) => sum + item);
    const mainContainer = new ContainerConfig( 
      this.flipContainerType(config.mainComponent),
      0,
      null,
    );
    mainContainer.components = config.mainLayout.map((size, index) => {
      const childSize = config.subLayout[index].reduce((sum, item) => sum + item);
      const childContainer = new ContainerConfig(
        config.mainComponent,
        size,
        size,
        mainContainer
      );
      childContainer.components = config.subLayout[index].map(subSize => new ContainerConfig(
        this.flipContainerType(config.mainComponent),
        subSize,
        subSize,
        childContainer
      ));
      return childContainer;
    });

    return mainContainer;
  }

  flipContainerType(compType: FlexContainerType|string): FlexContainerType {
    if (typeof compType === 'string') {
      compType = FlexContainerType[compType];
    }
    return (compType === FlexContainerType.row) ? FlexContainerType.column : FlexContainerType.row;
  }
}
