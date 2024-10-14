/* eslint-disable prettier/prettier */
export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "Garden Glimpse",
  description:
    "Discover and share gardening tips, plant care advice, and seasonal guides with a vibrant community of gardening enthusiasts.",
  navItems: [
    // {
    //   label: "Home",
    //   href: "/",
    // },
    {
      label: "About",
      href: "/about-us",
    },
    {
      label: "Gallery",
      href: "/gallery",
    },
    {
      label: "Contact",
      href: "/contact-us",
    },
  ],
  navMenuItems: [
    {
      label: "Profile",
      href: "/profile",
    },
    // {
    //   label: "Create Post",
    //   href: "/create-post",
    // },
    {
      label: "My Posts",
      href: "/dashboard",
    },
    {
      label: "Settings",
      href: "/settings",
    },
    {
      label: "Logout",
      href: "/logout",
    },
  ],
  links: {
    github: "https://github.com/nextui-org/nextui",
    twitter: "https://twitter.com/getnextui",
    docs: "https://nextui.org",
    discord: "https://discord.gg/9b6yyZKmH4",
    sponsor: "https://patreon.com/jrgarciadev",
  },
};
