import type { StorybookConfig } from "@storybook/react-vite";

const config: StorybookConfig = {
  stories: ["../src/components/**/*.stories.@(js|jsx|ts|tsx)", "../src/**/*.mdx"],
  addons: [
    {
      name: "@storybook/addon-essentials",
      options: {
        docs: true, // 자동 문서화
      },
    },
    "@storybook/addon-onboarding",
    "@storybook/addon-interactions",
  ],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
};
export default config;
