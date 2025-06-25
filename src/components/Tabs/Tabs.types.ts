export interface TabItem {
  value: string;
  label: string;
  content: React.ReactNode;
}

export interface TabsComponentProps {
  items: TabItem[];
  defaultValue?: string;
  className?: string;
  onValueChange?: (value: string) => void;
}
