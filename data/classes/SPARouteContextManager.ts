/* eslint-disable @typescript-eslint/no-explicit-any */
import {Error} from '@micra/error';
import {EventEmitter} from '@micra/event-emitter';
import {resolveFromContainer} from '@micra/router';
import {SPARoute} from './SPARoute';

export interface RouteState {
  id: SPARoute['id'];
  status: 'idle' | 'loading' | 'success' | 'error';
  handler: Micra.RouteHandler;
  params: Record<string, any>;
  request: Request;
  data?: Record<string, any>;
  route: SPARoute;
  nested: SPARoute[];
}

export function createRouteState(
  container: Micra.ServiceContainer,
  route: SPARoute,
): RouteState {
  const request = container.use('request');
  const path = new URL(request.url).pathname;
  const handler =
    typeof route.handler === 'string'
      ? resolveFromContainer<RouteState['handler']>(
          container.use,
          route.handler,
        )
      : route.handler;

  if (typeof handler !== 'function') {
    throw new Error({
      status: 500,
      title:
        process.env.NODE_ENV === 'production'
          ? 'Internal Server Error'
          : `The route on "${route.methods.join('|')}:${
              route.path.definition
            }" doesn't have a valid route handler.${
              typeof route.handler === 'string'
                ? ` The handler "${route.handler}" doesn't map to a valid route handler. Did you register it correctly?`
                : ''
            }`,
    });
  }

  return {
    request,
    id: route.id,
    status: 'idle',
    params: route.path.match(path),
    nested: route.nested.findAll(path, 'PAGE') as SPARoute[],
    handler,
    route,
  };
}

export class SPARouteContextManager extends EventEmitter {
  private states: Record<Micra.Route['id'], RouteState> = {};
  private activeRoute!: SPARoute;

  constructor(private container: Micra.ServiceContainer) {
    super();
  }

  getActiveRoute(): SPARoute {
    return this.activeRoute;
  }

  setActiveRoute(route: SPARoute): this {
    this.activeRoute = route;
    this.emit('change:route', route);
    return this;
  }

  setState(newState: RouteState): this {
    const state = this.getStateFor(newState.route);
    state.data = newState.data;
    state.status = newState.status;
    state.request = newState.request;
    state.params = newState.params;
    state.nested = newState.nested;

    this.emit(`change:${newState.route.id}`, state);

    return this;
  }

  getStateFor(route: SPARoute): RouteState {
    if (!this.states[route.id]) {
      this.states[route.id] = createRouteState(this.container, route);
    }

    return this.states[route.id];
  }

  getState(route: SPARoute = this.getActiveRoute()): Record<string, any> {
    const state = this.getStateFor(route);
    return {
      status: state.status,
      data: state.data,
      nested: state.nested.map((child) => this.getState(child)),
    };
  }

  hydrate(route: SPARoute, partial: Record<string, any>): this {
    const state = createRouteState(this.container, route);
    this.setState({
      ...state,
      data: partial.data,
      status: partial.status,
    });

    state.nested.forEach((child, index) =>
      this.hydrate(child, partial.nested[index]),
    );

    return this;
  }
}
