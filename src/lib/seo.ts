export const SITE_URL = "https://www.shieldworks.com.br";

export function canonicalUrl(path = "/") {
  return path === "/" ? `${SITE_URL}/` : `${SITE_URL}${path}`;
}
