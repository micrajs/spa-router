/* eslint-disable @typescript-eslint/no-explicit-any */
import {RouteBuilder} from '@micra/router';
import {SPARoute, SPARouteOptions} from './SPARoute';

export class SPARouteBuilder<
  Path extends string = string,
  ComponentType = any,
> extends RouteBuilder {
  route: SPARoute<Path, ComponentType>;

  constructor(
    router: Micra.BaseRouter,
    options: SPARouteOptions<Path, ComponentType>,
  ) {
    super(router, options);
    this.route = new SPARoute<Path, ComponentType>(options);
  }

  view(view: Micra.TypeOrService<ComponentType>): this {
    this.route.view = view;
    return this;
  }

  loading(view: Micra.TypeOrService<ComponentType>): this {
    this.route.loading = view;
    return this;
  }

  errorBoundary(view: Micra.TypeOrService<ComponentType>): this {
    this.route.errorBoundary = view;
    return this;
  }

  skipHandlerIf(
    skipHandlerIf: SPARoute<Path, ComponentType>['skipHandlerIf'],
  ): this {
    this.route.skipHandlerIf = skipHandlerIf;
    return this;
  }
}
