import Modal from "react-modal";
import IconCloseModal from "../../images/Icon_CloseModal.svg";
import styles from "./SuccessModal.module.css";

type SuccessModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function SuccessModal({ isOpen, onClose }: SuccessModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className={styles.modal}
      overlayClassName={styles.modalOverlay}
      shouldCloseOnOverlayClick
    >
      <button
        onClick={onClose}
        className={styles.closeButton}
        aria-label="Закрыть"
      >
        ✕
      </button>

      <img className={styles.icon} src={IconCloseModal} alt="SuccessIcon" />
      <p className={styles.text}>Изменения сохранены!</p>
    </Modal>
  );
}
