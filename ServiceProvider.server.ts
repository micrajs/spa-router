import {createMemoryHistory} from 'history';
import {SPARouteContextManager} from './data/classes/SPARouteContextManager';
import {SPARouterExtension} from './data/utilities/SPARouterExtension';
import {PageRouteHandler} from './data/handlers/PageRouteHandler';

export const SPARouterServiceProvider: Micra.ServiceProvider = {
  async boot({container}) {
    const router = container.use('router');
    const requestHandler = container.use('request-handler');

    router.extend(SPARouterExtension);
    requestHandler.use(PageRouteHandler);
  },

  async registerRequest({container}) {
    const url = new URL(container.use('request').clone().url);
    const history = createMemoryHistory({
      initialEntries: [url.pathname],
    });
    container.value('history', history);
    container.value('location', history.location);
    container.factory(
      'spa-route-context',
      (container) => new SPARouteContextManager(container),
    );
  },
};
