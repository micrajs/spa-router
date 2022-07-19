import {createBrowserHistory} from 'history';
import {SPARouteContextManager} from './data/classes/SPARouteContextManager';
import {SPARouteHandler} from './data/handlers/SPARouteHandler';
import {SPARouterExtension} from './data/utilities/SPARouterExtension';

export const SPARouterServiceProvider: Micra.ServiceProvider = {
  register({container}) {
    const history = createBrowserHistory();
    container.value('history', history);
    container.value('location', history.location);
    container.factory(
      'spa-route-context',
      (container) => new SPARouteContextManager(container),
    );
  },

  boot({container}) {
    const router = container.use('router');
    const requestHandler = container.use('request-handler');

    router.extend(SPARouterExtension);
    requestHandler.use(SPARouteHandler);
  },
};
