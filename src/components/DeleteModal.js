import ReactDom from 'react-dom';

const DeleteModal = (props) => {
  if (!props.isDeleting) return null;

  return ReactDom.createPortal(
    <>
      <div className="modal-overlay"></div>
      <div className="confirm-modal">
        <div>
          <h3>
            The budget sheet '{props.deleteSheetName}' will be permanently
            deleted. Do you wish to proceed?
          </h3>
        </div>

        <div className="delete-modal-buttons">
          <div
            className="button red"
            onClick={() => props.deleteSheet(props.deleteKey)}
          >
            Delete
          </div>

          <div className="button green" onClick={props.closeModal}>
            Cancel
          </div>
        </div>
      </div>
    </>,
    document.getElementById('modal')
  );
};

export default DeleteModal;
