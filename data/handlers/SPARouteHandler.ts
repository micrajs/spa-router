import {executeRouteHandler} from '@micra/router';
import {json} from '@micra/request-handler/utilities';
import type {SPARoute} from '../classes/SPARoute';

let hasHydrated = false;
export const SPARouteHandler: Micra.RequestHandler = async (partial) => {
  const {request, use} = partial;
  const url = new URL(request.url);
  if (request.method.toUpperCase() === 'GET') {
    const registry = use('router').registry;
    const route = registry.find(url.pathname, 'PAGE') as SPARoute | undefined;

    if (route) {
      const location = use('location');
      const routeContext = use('spa-route-context');
      const serverData = hasHydrated
        ? null
        : document.getElementById('micra-server-state');

      routeContext.setActiveRoute(route);

      if (serverData) {
        try {
          routeContext.hydrate(route, JSON.parse(serverData.innerHTML));
          hasHydrated = true;
          return json({success: true});
        } catch (err) {
          console.error(`Failed to hydrate route: ${err}`);
        }
      }

      return await executeRouteHandler({
        method: 'PAGE',
        context: {
          ...partial,
          params: route.path.match(url.pathname),
        },
        route,
        middlewares: registry.middlewares.slice(),
        onChange(event) {
          if (location.key === use('location').key) {
            routeContext.setState(event as never);
          }
        },
      });
    }
  }
};
