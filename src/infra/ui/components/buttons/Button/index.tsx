import { Button } from "./Button"

export interface BaseButtonProps {
  onClick?: () => void;
  type?: "submit"
}

export default Button