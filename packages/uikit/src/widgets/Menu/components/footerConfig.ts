import { ContextApi } from "@pancakeswap/localization";
import { FooterLinkType } from "../../../components/Footer/types";

export const footerLinks: (t: ContextApi["t"]) => FooterLinkType[] = (t) => [
  {
    label: t("About"),
    items: [
      {
        label: t("Contact"),
        href: "https://www.homelesstokens.com",
   
      },
      {
        label: t("audit"),
        href: "https://drive.google.com/file/d/1Xi5sWN-QJLgbQ4FBPE96svrtOWRlyQwH/view?usp=sharing",
   
      },
      {
        label: t("kyc"),
        href: "https://drive.google.com/file/d/1gIS84uztmh7DskaRimQx8YFdMwpiQbYx/view?usp=sharing ",
        
      },
     
      {
        label: t("Litepaper"),
        href: "https://www.homelesstokens.com/p/whitepaper.html",
      }
     
    ],
  },
  
  
];
