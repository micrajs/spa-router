import type {SPARouteBuilder} from '@/data/classes/SPARouteBuilder';

export interface SPARouteCreator {
  <Path extends string>(
    path: Path,
    serviceOrHandler?: Micra.TypeOrService<Micra.RouteHandler<Path>>,
  ): SPARouteBuilder;
}

export interface SPARoute<T> extends Micra.Route {
  view?: Micra.TypeOrService<T>;
  loading?: Micra.TypeOrService<T>;
  errorBoundary?: Micra.TypeOrService<T>;
}
