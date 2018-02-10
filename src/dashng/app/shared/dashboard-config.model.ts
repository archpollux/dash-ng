export enum FlexContainerType {
  row = "row",
  column = "column"
}

export class ContainerConfig {
  constructor(public flexType: FlexContainerType,
              public flexSize?: number,
              public size?: number,
              public parent?: ContainerConfig,
              public components?: ContainerConfig[]) { }

  static oppositeType(type: FlexContainerType): FlexContainerType {
    return type == FlexContainerType.row ? FlexContainerType.row
                                         : FlexContainerType.column;
  }
}
