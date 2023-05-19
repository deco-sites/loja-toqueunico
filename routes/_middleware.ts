import { withLive } from "$live/live.ts";
import { MiddlewareHandlerContext } from "$fresh/server.ts";

const HOST_TO_CHECK = "cliente.toqueunico.com.br";
const URL_TO_REDIRECT = "https://airtable.com/shrrGJdasDSjS7Yh8";

// const DOMAIN_TO_CHECK = 'cliente.toqueunico.com.br'

const redirectClienteSubdomain = async (
  req: Request,
  ctx: MiddlewareHandlerContext,
) => {
  const url = new URL(req.url);

  if (url.host.startsWith(HOST_TO_CHECK)) {
    return new Response("", {
      status: 307,
      headers: {

      location: URL_TO_REDIRECT,
      }
    });
  }

  return await ctx.next();
};

export const handler = [
  redirectClienteSubdomain,
  withLive({
    siteId: 757,
    site: "toqueunico",
  }),
];
