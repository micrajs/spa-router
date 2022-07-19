/* eslint-disable @typescript-eslint/no-explicit-any */
import {SPARouteBuilder} from '../classes/SPARouteBuilder';

export const SPARouterExtension: Partial<Micra.RouterExtensionDefinition> = {
  page:
    (base) =>
    (path, serviceOrHandler): SPARouteBuilder => {
      const builder = new SPARouteBuilder(base, {
        path,
        methods: ['PAGE'],
        handler:
          serviceOrHandler ?? (async () => new Response(JSON.stringify({}))),
      });

      base.registry.register(builder.route);

      return builder as SPARouteBuilder;
    },
};
