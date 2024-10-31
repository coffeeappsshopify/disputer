import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontSize: {
        h1: ['28px', { lineHeight: '1.2', fontWeight: '700' }],
        h2: ['22px', { lineHeight: '1.2', fontWeight: '600' }],
        h3: ['16px', { lineHeight: '1.2', fontWeight: '500' }],
        h4: ['14px', { lineHeight: '1.2', fontWeight: '500' }],
        small: ['14px', { lineHeight: '1.2', fontWeight: '400' }],
      },
    },
  },
  plugins: [],
};
export default config;
