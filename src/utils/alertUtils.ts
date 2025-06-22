export interface AlertState {
  variant: 'default' | 'destructive';
  title: string;
  description: string;
}

export const createAlertHelper = (
  setAlert: React.Dispatch<React.SetStateAction<AlertState | null>>,
) => {
  return (
    title: string,
    description: string,
    variant: 'default' | 'destructive' = 'destructive',
    duration: number = 3000,
  ) => {
    setAlert({ title, description, variant });
    setTimeout(() => setAlert(null), duration);
  };
};
