
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  variant: "primary" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  onClick?: () => void;
}
