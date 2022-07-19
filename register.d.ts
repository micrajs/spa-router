/* eslint-disable @typescript-eslint/no-explicit-any */
/// <reference types="@micra/core/router" />
/// <reference types="@micra/core/request-handler" />
/// <reference types="@micra/core/service-provider" />
/// <reference types="@micra/core/ui-engine" />

import type {History, Location} from 'history';
import type {SPARouteContextManager} from './data/classes/SPARouteContextManager';
import type {SPARouteCreator} from './types';

declare global {
  namespace Application {
    interface Services {
      history: History;
      request: Request;
      location: Location;
      router: Micra.Router;
      'spa-route-context': SPARouteContextManager;
      'request-handler': Micra.RequestHandlerManager;
      'ui-engine': Micra.UIEngine;
    }

    interface Routers {
      page: SPARouteCreator;
    }
  }

  namespace Micra {
    interface ServiceProvider {
      registerRequest?(application: Application): void | Promise<void>;
      bootRequest?(application: Application): void | Promise<void>;
    }
  }
}

export {};
