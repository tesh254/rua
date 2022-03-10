module.exports = {
  publicRuntimeConfig: {
    site: {
      name: "Rua App",
      url:
        process.env.NODE_ENV === "development"
          ? "http://localhost:3000"
          : "https://rua.vercel.app",
      title: "Rua App",
      description: "Rua App",
      socialPreview: "/images/preview.png",
    },
  },
  i18n: {
    locales: ["en-US"],
    defaultLocale: "en-US",
  },
};
