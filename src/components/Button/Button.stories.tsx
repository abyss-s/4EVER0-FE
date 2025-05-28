import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./Button";
import { buttonVariants } from "./buttonVariants";
import type { VariantProps } from "class-variance-authority";

type ButtonVariant = VariantProps<typeof buttonVariants>["variant"];
type ButtonSize = VariantProps<typeof buttonVariants>["size"];

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

export const Playground: Story = {
  args: {
    children: "Button",
    variant: "default",
    size: "default",
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      {(["default", "destructive", "outline", "secondary", "ghost", "link"] as ButtonVariant[]).map(
        (variant) => (
          <Button key={variant} variant={variant}>
            {variant}
          </Button>
        ),
      )}
    </div>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <div className="flex gap-4">
      {(["sm", "default", "lg", "icon"] as ButtonSize[]).map((size) => (
        <Button key={size} size={size}>
          {size === "icon" ? "⭐️" : size}
        </Button>
      ))}
    </div>
  ),
};
