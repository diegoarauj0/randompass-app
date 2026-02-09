import type { ForgeConfig } from "@electron-forge/shared-types";
import { MakerDeb } from "@electron-forge/maker-deb";
import { MakerRpm } from "@electron-forge/maker-rpm";
import { MakerSquirrel } from "@electron-forge/maker-squirrel";
import { VitePlugin } from "electron-forge-plugin-vite";

const config: ForgeConfig = {
  packagerConfig: {
    icon: "./icon",
    executableName: "randompass-app",
  },
  rebuildConfig: {},
  makers: [
    new MakerSquirrel({
      name: "RandomPass",
      setupExe: "RandomPassSetup.exe",
      setupIcon: "./icon/icon.ico",
      authors: "Diego Araujo",
      description: "Secure and random password generator.",
    }),
    new MakerRpm({
      options: {
        icon: "./icon/icon.png",
        productName: "RandomPass",
        homepage: "https://github.com/diegoarauj0/randompass-app",
        description: "Secure and random password generator.",
        categories: ["Utility"],
        version: "1.0.0",
        license: "GPL-3.0-only",
      },
    }),
    new MakerDeb({
      options: {
        icon: "./icon/icon.png",
        productName: "RandomPass",
        version: "1.0.0",
        homepage: "https://github.com/diegoarauj0/randompass-app",
        maintainer: "Diego Araujo <diegoaraujosantosbr@gmail.com>",
        description: "Secure and random password generator.",
        categories: ["Utility"],
      },
    }),
  ],
  plugins: [
    new VitePlugin({
      // `build` can specify multiple entry builds, which can be Main process, Preload scripts, Worker process, etc.
      // If you are familiar with Vite configuration, it will look really familiar.
      build: [
        {
          // `entry` is just an alias for `build.lib.entry` in the corresponding file of `config`.
          entry: "src/main.ts",
          config: "vite.main.config.ts",
        },
        {
          entry: "src/preload.ts",
          config: "vite.preload.config.ts",
        },
      ],
      renderer: [
        {
          name: "main_window",
          config: "vite.renderer.config.ts",
        },
      ],
    }),
  ],
};

export default config;
