module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "hero-pattern": "url('/img/hero-pattern.svg')",
        event: "url('/src/assets/image/event.png')",
      },
    },
    minHeight: {
      "1/2": "50%",
    },
  },
  plugins: [],
};
