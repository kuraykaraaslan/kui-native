import type { PropsWithChildren } from "react";
import { ScrollViewStyleReset } from "expo-router/html";

import { SITE } from "@/libs/config/site";

/**
 * Web-only root document for the static export. Site-wide head tags live
 * here; per-page title / description / canonical / og:title come from
 * `SiteHead` on each route. Never rendered on native.
 */
export default function Root({ children }: PropsWithChildren) {
  const image = `${SITE.url}/og-image.png`;
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />

        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="icon" href="/favicon.png" type="image/png" sizes="48x48" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" media="(prefers-color-scheme: light)" content="#ffffff" />
        <meta name="theme-color" media="(prefers-color-scheme: dark)" content={SITE.backgroundColor} />

        <meta name="keywords" content={SITE.keywords} />
        <meta name="author" content={SITE.author.name} />
        <meta
          name="robots"
          content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
        />

        <meta property="og:type" content="website" />
        <meta property="og:site_name" content={SITE.name} />
        <meta property="og:image" content={image} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content={`${SITE.name} Preview`} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content={image} />
        <meta name="twitter:creator" content={SITE.twitterHandle} />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                { "@type": "WebSite", url: SITE.url, name: SITE.name, description: SITE.description },
                { "@type": "Person", name: SITE.author.name, url: SITE.author.url },
                {
                  "@type": "SoftwareApplication",
                  name: SITE.name,
                  applicationCategory: "DeveloperApplication",
                  operatingSystem: "iOS, Android, Web",
                  description: SITE.description,
                  url: SITE.url,
                },
              ],
            }),
          }}
        />

        {/* Disable body scrolling on web so ScrollView behaves like native. */}
        <ScrollViewStyleReset />
        <style dangerouslySetInnerHTML={{ __html: `body{background-color:${SITE.backgroundColor}}@media (prefers-color-scheme: light){body{background-color:#ffffff}}` }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
