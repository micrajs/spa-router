/* eslint-disable @typescript-eslint/no-explicit-any */
import {Route, RouteOptions} from '@micra/router';

export interface SPARouteOptions<
  Path extends string = string,
  ComponentType = any,
> extends RouteOptions<Path, Micra.RoutePathOptions> {
  view?: Micra.TypeOrService<ComponentType>;
  loading?: Micra.TypeOrService<ComponentType>;
  errorBoundary?: Micra.TypeOrService<ComponentType>;
  skipHandlerIf?: (route: SPARoute) => boolean;
}

export class SPARoute<
  Path extends string = string,
  ComponentType = any,
> extends Route<Path> {
  view?: Micra.TypeOrService<ComponentType>;
  loading?: Micra.TypeOrService<ComponentType>;
  errorBoundary?: Micra.TypeOrService<ComponentType>;
  skipHandlerIf: (route: SPARoute) => boolean;

  constructor(options: SPARouteOptions<Path>) {
    super(options);
    this.view = options.view;
    this.loading = options.loading;
    this.errorBoundary = options.errorBoundary;
    this.skipHandlerIf = options.skipHandlerIf ?? (() => false);
  }
}
