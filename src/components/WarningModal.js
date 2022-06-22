import ReactDom from 'react-dom';

const WarningModal = (props) => {
  if (!props.isWarning) return null;

  return ReactDom.createPortal(
    <>
      <div className="modal-overlay"></div>

      <div className="confirm-modal">
        <div className="content">{props.children}</div>
        <div className="button green" onClick={props.closeModal}>
          Ok
        </div>
      </div>
    </>,
    document.getElementById('modal')
  );
};

export default WarningModal;
