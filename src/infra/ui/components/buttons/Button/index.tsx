import { Button } from "./Button"

export interface BaseButtonProps {
  onClick?: () => void;
  type?: "submit" | "button"
}

export default Button