import '../style/WarningModal.css';

function WarningModal({
    title = 'Warning!',
    message,
    onCancel,
    onConfirm,
    cancelText = 'No',
    confirmText = 'Yes'
}) {
    return (
        <div className="warning-overlay">
            <div className="warning-modal">

                <h3>⚠️ {title}</h3>

                <p>{message}</p>

                <div className="warning-actions">

                    <button
                        type="button"
                        className="warning-no"
                        onClick={onCancel}
                    >
                        {cancelText}
                    </button>

                    <button
                        type="button"
                        className="warning-yes"
                        onClick={onConfirm}
                    >
                        {confirmText}
                    </button>

                </div>
            </div>
        </div>
    );
}

export default WarningModal;