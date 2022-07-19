import {executeRouteHandler} from '@micra/router';
import type {SPARoute} from '../classes/SPARoute';
import {renderHTMLMiddleware} from '../middlewares/renderHTMLMiddleware';

export const PageRouteHandler: Micra.RequestHandler = async (partial) => {
  const {request, use} = partial;
  const url = new URL(request.url);
  if (request.method.toUpperCase() === 'GET') {
    const route = use('router').registry.find(url.pathname, 'PAGE') as
      | SPARoute
      | undefined;

    if (route) {
      const location = use('location');
      const routeContext = use('spa-route-context');

      routeContext.setActiveRoute(route);

      return await executeRouteHandler({
        route,
        method: 'PAGE',
        middlewares: use('router').registry.middlewares.concat([
          renderHTMLMiddleware,
        ]),
        context: {
          ...partial,
          params: route.path.match(location.pathname),
        },
        onChange(event) {
          if (location.key === use('location').key) {
            routeContext.setState(event as never);
          }
        },
      });
    }
  }
};
