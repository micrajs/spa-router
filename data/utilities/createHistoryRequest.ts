import type {Location} from 'history';

export function createHistoryRequest(location?: Location) {
  const url = new URL(
    location?.pathname ?? window.location.pathname,
    window.location.origin,
  );
  url.hash = location?.hash ?? window.location.hash;
  url.search = location?.search ?? window.location.search;

  return new Request(url.toString());
}
