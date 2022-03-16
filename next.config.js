module.exports = {
  publicRuntimeConfig: {
    site: {
      name: "Rua App",
      url:
        process.env.NODE_ENV === "development"
          ? "http://localhost:3000"
          : "https://userua.com",
      title: "Rua App",
      description: "All your newsletter issues in one place",
      socialPreview: "/images/preview.png",
    },
  },
  i18n: {
    locales: ["en-US"],
    defaultLocale: "en-US",
  },
};
