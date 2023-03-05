import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';


function PopupModal({ show, size="md", handleClose, modalTitle, children ,width}) {
  return (
    <Modal show={show} onHide={handleClose} size={size}>
      <Modal.Header closeButton>
        <Modal.Title>{modalTitle}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {children}
      </Modal.Body>
    </Modal>
  );
}



export default PopupModal;
