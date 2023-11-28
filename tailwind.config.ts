import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'dark': '#121417',
        'orange': '#F4C550',
        'banana': '#FBE9BA',
        'darkGreen': '#9FBAAE',
        'lightGreen': '#CBDED3',
        'darkBlue': '#9FB7CE',
        'lightBlue': '#BFD6EA',
        'rose': '#E0A39A',
        'pink': '#F2C0BD',
        'peach': '#F0AA8D',
        'powder': '#F4C8BA',
      },
      
    },
  },
  plugins: [],
}
export default config
