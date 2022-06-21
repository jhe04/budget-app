import ReactDom from 'react-dom';

const DeleteModal = (props) => {
  if (!props.isDeleting) return null;

  return ReactDom.createPortal(
    <>
      <div className="modal-overlay"></div>
      <div className="ui cards confirm-modal">
        <div className="card">
          <div className="content">
            <div className="description">
              <h3>
                The budget sheet '{props.deleteSheetName}' will be permanently
                deleted. Do you wish to proceed?
              </h3>
            </div>
          </div>
          <div className="extra content">
            <div
              className="ui basic green button left floated"
              onClick={() => props.deleteSheet(props.deleteKey)}
            >
              Confirm
            </div>
            <div
              className="ui basic red button right floated"
              onClick={props.closeModal}
            >
              Cancel
            </div>
          </div>
        </div>
      </div>
    </>,
    document.getElementById('modal')
  );
};

export default DeleteModal;
