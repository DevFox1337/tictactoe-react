import Typography from '../Typography/Typography';
import Button from '../Button/Button';
import content from '../../content/content.json';
import './Modal.scss';

interface ModalProps {
  onCancelButtonClick: () => void;
  onResetButtonClick: () => void;
}

function Modal({ onCancelButtonClick, onResetButtonClick }: ModalProps) {

  return (
    <div className="modal">
      <Typography content={content.modal.resetText} size="medium" />
      <div className="modal__button-container">
        <Button
          color="green"
          content={content.modal.resetButtonText}
          onButtonClick={onResetButtonClick} />
        <Button
          color="red"
          content={content.modal.cancelButtonText}
          onButtonClick={onCancelButtonClick} />
      </div>
    </div>
  )
}

export default Modal