import { defineConfig } from "cypress";

export default defineConfig({
  allowCypressEnv: false,

  video: true,
  trashAssetsBeforeRuns: true,

  screenshotsFolder: "cypress/screenshots",
  videosFolder: "cypress/videos",

  reporter: "cypress-mochawesome-reporter",

  reporterOptions: {
    reportDir: "cypress/reports",
    overwrite: true,
    html: true,
    json: true,
    charts: true,
    embeddedScreenshots: true,
    inlineAssets: true,
    saveAllAttempts: false
  },

  e2e: {

    setupNodeEvents(on, config) {
      require("cypress-mochawesome-reporter/plugin")(on);
      return config;
    }
  }
});