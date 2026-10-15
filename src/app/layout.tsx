import "@/once-ui/styles/index.scss";
import "@/once-ui/tokens/index.scss";
import "@/app/resources/palette.scss";
import "@/app/resources/glass.scss";
import "@/app/resources/type.scss";

import classNames from "classnames";

import { Footer, Header, RouteGuard } from "@/components";
import { Backdrop } from "@/components/Backdrop";
import { RoutePrefetch } from "@/components/RoutePrefetch";
import { getPoems } from "@/app/utils/poems";
import { getPosts } from "@/app/utils/utils";
import { baseURL, style } from "@/app/resources";
import { blog, person } from "@/app/resources/content";

import { Inter, Newsreader, Source_Code_Pro } from "next/font/google";

import { Column, Flex, ToastProvider } from "@/once-ui/components";

export async function generateMetadata() {
  return {
    metadataBase: new URL(`https://${baseURL}`),
    // pages give their own title (often a kaomoji and a word); the name follows it, so a
    // search result or a tab still says whose page this is
    title: { template: `%s · ${person.name}`, default: person.name },
    // lets feed readers find the blog from any page
    alternates: {
      types: { "application/rss+xml": [{ url: "/rss.xml", title: `${blog.heading} · ${person.name}` }] },
    },
    // Let Next.js handle favicons automatically
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

const primary = Inter({
  variable: "--font-primary",
  subsets: ["latin"],
  display: "swap",
});

type FontConfig = {
  variable: string;
};

/*
	Replace with code for secondary and tertiary fonts
	from https://once-ui.com/customize
*/
const secondary: FontConfig | undefined = undefined;
const tertiary: FontConfig | undefined = undefined;
/*
 */

// the reading voice, for titles, poems and posts (see src/app/resources/type.scss)
const serif = Newsreader({
  variable: "--font-serif",
  subsets: ["latin"],
  display: "swap",
  style: ["normal", "italic"],
  axes: ["opsz"],
});

const code = Source_Code_Pro({
  variable: "--font-code",
  subsets: ["latin"],
  display: "swap",
});

interface RootLayoutProps {
  children: React.ReactNode;
}

export default async function RootLayout({ children }: RootLayoutProps) {
  const slugPaths = [
    ...getPosts(["src", "app", "blog", "posts"]).map((post) => `/blog/${post.slug}`),
    ...getPosts(["src", "app", "work", "projects"]).map((project) => `/work/${project.slug}`),
    ...getPoems().map((poem) => `/gallery/${poem.slug}`),
  ];

  return (
    <Flex
      as="html"
      lang="en"
      background="page"
      data-neutral={style.neutral}
      data-brand={style.brand}
      data-accent={style.accent}
      data-solid={style.solid}
      data-solid-style={style.solidStyle}
      data-theme={style.theme}
      data-border={style.border}
      data-surface={style.surface}
      data-transition={style.transition}
      className={classNames(
        primary.variable,
        secondary ? secondary.variable : "",
        tertiary ? tertiary.variable : "",
        serif.variable,
        code.variable,
      )}
    >
      <ToastProvider>
        <Column style={{ minHeight: "100vh" }} as="body" fillWidth margin="0" padding="0">
          <Backdrop />
          <Flex fillWidth minHeight="16"></Flex>
          <Header />
          <Flex
            position="relative"
            zIndex={0}
            fillWidth
            paddingY="l"
            paddingX="l"
            horizontal="center"
            flex={1}
          >
            <Flex horizontal="center" fillWidth minHeight="0">
              <RouteGuard>{children}</RouteGuard>
            </Flex>
          </Flex>
          <Footer />
          <RoutePrefetch paths={slugPaths} />
        </Column>
      </ToastProvider>
    </Flex>
  );
}
