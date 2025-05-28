import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./Button";

const meta: Meta<typeof Button> = {
  title: "Components/Button",
  component: Button,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "destructive", "outline", "secondary", "ghost", "link"],
    },
    size: {
      control: "select",
      options: ["default", "sm", "lg", "icon"],
    },
    children: { control: "text" },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

// Playground
export const Playground: Story = {
  args: {
    children: "Button",
    variant: "default",
    size: "default",
  },
};

// Visual Summary
export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      {["default", "destructive", "outline", "secondary", "ghost", "link"].map((variant) => (
        <Button key={variant} variant={variant as any}>
          {variant}
        </Button>
      ))}
    </div>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <div className="flex gap-4">
      {["sm", "default", "lg", "icon"].map((size) => (
        <Button key={size} size={size as any}>
          {size === "icon" ? "⭐️" : size}
        </Button>
      ))}
    </div>
  ),
};
