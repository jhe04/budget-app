import ReactDom from 'react-dom';

const WarningModal = (props) => {
  if (!props.isWarning) return null;

  return ReactDom.createPortal(
    <>
      <div className="modal-overlay"></div>
      <div className="ui cards confirm-modal">
        <div className="card">
          <div className="content">
            <div className="description">
              {props.children}
            </div>
          </div>
          <div className="extra content">
            <div className="ui basic green button" onClick={props.closeModal}>
              Ok
            </div>
          </div>
        </div>
      </div>
    </>,
    document.getElementById('modal')
  );
};

export default WarningModal;
