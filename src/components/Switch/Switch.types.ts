import { ComponentProps } from 'react';

export interface SwitchProps extends ComponentProps<'button'> {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  disabled?: boolean;
  label?: string;
}
