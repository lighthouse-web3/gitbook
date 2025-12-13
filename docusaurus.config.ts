import type {Config} from '@docusaurus/types';
import {themes as prismThemes} from 'prism-react-renderer';

const config: Config = {
  title: 'Lighthouse Docs',
  tagline: 'Permanent, decentralized storage protocol documentation',
  favicon: 'img/favicon.svg',

  url: 'https://example.com',
  baseUrl: '/',

  organizationName: 'lighthouse-web3',
  projectName: 'docs',

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          routeBasePath: '/',
          sidebarPath: './sidebars.ts',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      },
    ],
  ],

  themeConfig: {
    navbar: {
      title: 'Lighthouse Docs',
      logo: {
        alt: 'Lighthouse logo',
        src: 'img/favicon.svg',
      },
      items: [
        {type: 'doc', docId: 'intro', position: 'left', label: 'Docs'},
        {
          href: 'https://github.com/lighthouse-web3',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Introduction',
              to: '/',
            },
            {
              label: 'Quick Start',
              to: '/quick-start',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'GitHub Discussions',
              href: 'https://github.com/lighthouse-web3/community/discussions',
            },
            {
              label: 'Twitter',
              href: 'https://twitter.com/LighthouseWeb3',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'Lighthouse',
              href: 'https://www.lighthouse.storage/',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Lighthouse. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  },
};

export default config;
