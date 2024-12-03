export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: 'Garden Glimpse',
  description:
    'Discover and share gardening tips, plant care advice, and seasonal guides with a vibrant community of gardening enthusiasts.',

  navItems: [
    {
      label: 'About',
      href: '/about-us',
    },
    {
      label: 'Gallery',
      href: '/gallery',
    },
    {
      label: 'Contact',
      href: '/contact-us',
    },
  ],

  navMenuItems: [
    {
      label: 'Profile',
      href: '/profile',
    },
    {
      label: 'About',
      href: '/about-us',
    },
    {
      label: 'Gallery',
      href: '/gallery',
    },
    {
      label: 'Contact Us',
      href: '/contact-us',
    },
  ],

  links: {
    docs: 'https://nextui.org',
    twitter: 'https://twitter.com/getnextui',
    discord: 'https://discord.gg/9b6yyZKmH4',
    sponsor: 'https://patreon.com/jrgarciadev',
    github: 'https://github.com/nextui-org/nextui',
  },
};
