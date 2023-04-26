/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/pages/**/*.{js,ts,jsx,tsx,mdx}", "./src/components/**/*.{js,ts,jsx,tsx,mdx}", "./src/app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "preview-block": "url('/heading-bg.jpg')"
      },
      colors: {
        "preview-bg-rgba": "rgba(247, 248, 250, 0.8)",
        heading: "#1D252C",
        green: "#56B280"
      }
    }
  },
  plugins: []
}
