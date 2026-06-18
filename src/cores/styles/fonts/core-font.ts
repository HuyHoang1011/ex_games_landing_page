import { Inter, Roboto } from 'next/font/google';
import localFont from 'next/font/local';

export const fontRoboto = Roboto({
  variable: '--font-roboto',
  subsets: ['latin'],
  weight: ['400'],
});

export const fontInter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
});

export const fontHelvetIns = localFont({
  src: '../../../../public/assets/fonts/HelvetIns/UTMHelvetIns.woff2',
  variable: '--font-helvetins',
  display: 'swap',
});

export const fontSfPro = localFont({
  src: [
    // Regular
    {
      path: '../../../../public/assets/fonts/SF-Pro-Display/SF-Pro-Display-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    // {
    //   path: '../../../../public/assets/fonts/SF-Pro-Display/SF-Pro-Display-RegularItalic.otf',
    //   weight: '400',
    //   style: 'italic',
    // },

    // Medium
    {
      path: '../../../../public/assets/fonts/SF-Pro-Display/SF-Pro-Display-Medium.woff2',
      weight: '500',
      style: 'normal',
    },
    // {
    //   path: '../../../../public/assets/fonts/SF-Pro-Display/SF-Pro-Display-MediumItalic.otf',
    //   weight: '500',
    //   style: 'italic',
    // },

    // Semibold
    // {
    //   path: '../../../../public/assets/fonts/SF-Pro-Display/SF-Pro-Display-Semibold.otf',
    //   weight: '600',
    //   style: 'normal',
    // },
    // {
    //   path: '../../../../public/assets/fonts/SF-Pro-Display/SF-Pro-Display-SemiboldItalic.otf',
    //   weight: '600',
    //   style: 'italic',
    // },

    // Bold
    {
      path: '../../../../public/assets/fonts/SF-Pro-Display/SF-Pro-Display-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
    // {
    //   path: '../../../../public/assets/fonts/SF-Pro-Display/SF-Pro-Display-BoldItalic.otf',
    //   weight: '700',
    //   style: 'italic',
    // },

    // Heavy
    // { path: '../../../../public/assets/fonts/SF-Pro-Display/SF-Pro-Display-Heavy.otf', weight: '800', style: 'normal' },
    // {
    //   path: '../../../../public/assets/fonts/SF-Pro-Display/SF-Pro-Display-HeavyItalic.otf',
    //   weight: '800',
    //   style: 'italic',
    // },

    // Black
    // { path: '../../../../public/assets/fonts/SF-Pro-Display/SF-Pro-Display-Black.otf', weight: '900', style: 'normal' },
    // {
    //   path: '../../../../public/assets/fonts/SF-Pro-Display/SF-Pro-Display-BlackItalic.otf',
    //   weight: '900',
    //   style: 'italic',
    // },
  ],
  variable: '--font-sf-pro',
  display: 'swap',
});

export const fontSvnGilroy = localFont({
  src: [
    // { path: '../../../../public/assets/fonts/SVN-Gilroy/SVN-GilroyRegular.woff2', weight: '400', style: 'normal' },
    { path: '../../../../public/assets/fonts/SVN-Gilroy/SVN-GilroyMedium.woff2', weight: '500', style: 'normal' },
  ],
  variable: '--font-svn-gilroy',
  display: 'swap',
});

export const fontKenyanCoffee = localFont({
  src: [
    // Regular
    {
      path: '../../../../public/assets/fonts/Kenyan-coffee/kenyan-coffee-regular.otf',
      weight: '400',
      style: 'normal',
    },

    // Bold
    {
      path: '../../../../public/assets/fonts/Kenyan-coffee/kenyan-coffee-bold.otf',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-kenyan-coffee',
  display: 'swap',
});

export const allFonts = [
  fontSfPro.variable,
  fontInter.variable,
  fontHelvetIns.variable,
  fontRoboto.variable,
  fontSvnGilroy.variable,
  fontKenyanCoffee.variable,
];
