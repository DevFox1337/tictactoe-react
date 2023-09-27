import './Button.scss';
import Typography from '../Typography/Typography'

interface ButtonProps {
  content: string;
  color?: 'green' | 'red' | 'yellow';
  isDisabled?: boolean;
  onButtonClick?: () => void;
}

function Button({ content, color = 'green', isDisabled, onButtonClick }: ButtonProps) {

  const buttonClassName = `button button--${color} ${isDisabled ? 'button--disabled' : ''}`;

  return (
    <button className={buttonClassName} onClick={onButtonClick}>
      <Typography content={content} size="small" />
    </button>
  )
}

export default Button