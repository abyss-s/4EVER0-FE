import type { Preview } from "@storybook/react";
import { withThemeByClassName } from "@storybook/addon-themes";
import "../src/index.css";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      default: "light",
      values: [
        { name: "light", value: "#ffffff" },
        { name: "dark", value: "#000000" },
      ],
    },
  },
  decorators: [
    withThemeByClassName({
      themes: {
        light: "", //
        dark: "dark",
      },
      defaultTheme: "light",
      parentSelector: "html",
    }),
  ],
};

export const globalTypes = {
  theme: {
    name: "Theme",
    description: "Global theme for components",
    defaultValue: "light",
    toolbar: {
      icon: "mirror",
      items: [
        { value: "light", icon: "sun", title: "Light Mode" },
        { value: "dark", icon: "moon", title: "Dark Mode" },
      ],
      showName: true,
    },
  },
};

export default preview;
