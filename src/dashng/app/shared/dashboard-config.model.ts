export enum FlexContainerType {
  row = "row",
  column = "column"
}

export class ContainerConfig {
  constructor(public flexType: FlexContainerType,
              public flexSize?: number,
              public parent?: ContainerConfig,
              public components?: ContainerConfig[]) { }
}
