const mapping: Record<string, string> = {
  backlinks: 'backlink',
  individuals: 'individual',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
