import { Language } from "../LangSelector/types";
import { FooterLinkType } from "./types";
import { TwitterIcon, TelegramIcon, RedditIcon, InstagramIcon, GithubIcon, DiscordIcon, YoutubeIcon,LanguageIcon,FacebookIcon } from "../Svg";

export const footerLinks: FooterLinkType[] = [
  {
    label: "About",
    items: [
      {
        label: "Contact",
        href: "https://www.homelesstokens.com/",
      },
      {
        label: "Blog",
        href: "#",
      },
      {
        label: "Community",
        href: "#",
      },
      {
        label: "CAKE",
        href: "#",
      },
      {
        label: "—",
      },
      {
        label: "Online Store",
        href: "#",
        isHighlighted: true,
      },
    ],
  },
  {
    label: "Help",
    items: [
      {
        label: "Customer",
        href: "#",
      },
      {
        label: "Troubleshooting",
        href: "#",
      },
      {
        label: "Guides",
        href: "#",
      },
    ],
  },
  {
    label: "Developers",
    items: [
      {
        label: "Github",
        href: "#",
      },
      {
        label: "Documentation",
        href: "#",
      },
      {
        label: "Bug Bounty",
        href: "#",
      },
      {
        label: "Audits",
        href: "#",
      },
      {
        label: "Careers",
        href: "#",
      },
    ],
  },
];

export const socials = [
  {
    label: "Twitter",
    icon: TwitterIcon,
    href: "https://twitter.com/HOMELESS TOKEN@",
  },
  {
    label: "Telegram",
    icon: TelegramIcon,
    href: "https://t.me/+zcLIHe9ZgrkwYTg0",
   
  },
  {
    label: "Facebook",
    icon: FacebookIcon,
    href: "https://www.facebook.com/profile.php?id=100084522925146",
  },
  {
    label: "Website",
    icon: LanguageIcon,
    href: "https://www.homelesstokens.com/",
  },
 /*  {
    label: "Github",
    icon: GithubIcon,
    href: "#",
  },
  {
    label: "Discord",
    icon: DiscordIcon,
    href: "#",
  },
  {
    label: "Youtube",
    icon: YoutubeIcon,
    href: "#",
  }, */
];

export const langs: Language[] = [...Array(20)].map((_, i) => ({
  code: `en${i}`,
  language: `English${i}`,
  locale: `Locale${i}`,
}));
