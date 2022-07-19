import {wantsJson, html} from '@micra/request-handler/utilities';

export const renderHTMLMiddleware: Micra.Middleware = async (
  {request, use},
  next,
) => {
  const response = await next();
  return wantsJson(request)
    ? response
    : html(`<!DOCTYPE html>${use('ui-engine').toString()}`);
};
