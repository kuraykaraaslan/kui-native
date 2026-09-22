import Head from "expo-router/head";

import { SITE, pageTitle } from "@/libs/config/site";

/**
 * Per-route `<head>` for the web build: title, description, canonical and
 * the page-specific OG / Twitter fields. Site-wide tags are in `app/+html.tsx`.
 * A no-op on native.
 */
export function SiteHead({
  title,
  description = SITE.description,
  path = "/",
  absolute = false,
}: {
  /** Page name; omitted → the site default "KUInative — tagline". */
  title?: string;
  /** Use `title` verbatim instead of "<title> | KUInative" (404, like KUIejs). */
  absolute?: boolean;
  description?: string;
  path?: string;
}) {
  const fullTitle = absolute && title ? title : pageTitle(title);
  const url = path === "/" ? SITE.url : `${SITE.url}${path}`;
  return (
    <Head>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
    </Head>
  );
}
