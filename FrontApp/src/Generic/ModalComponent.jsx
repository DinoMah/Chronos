import { Component } from "inferno";

const ModalComponent = ({ isOpen, onClose, children }) => {

    if (!isOpen) return null;

    return (
        <div>
            <dialog className="modal" open={true} onClose={onClose}>
                <div className="modal-box w-11/12">
                    { children }
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>
        </div>
    );
}

export default ModalComponent;