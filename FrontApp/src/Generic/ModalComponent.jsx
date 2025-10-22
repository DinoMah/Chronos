import { Component } from 'inferno';

class ModalComponent extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { isOpen, onClose, children, className } = this.props;

        if (!isOpen) return null;

        return (
            <div className='w-screen'>
                <dialog className='modal' open={true} onClose={onClose}>
                    <div className='modal-box max-w-7xl'>{ children }</div>
                    <form method='dialog' className='modal-backdrop'>
                        <button>close</button>
                    </form>
                </dialog>
            </div>
        );
    }
}

/*const ModalComponent = ({ isOpen, onClose, children }) => {

    if (!isOpen) return null;

    return (
        <div className="w-screen">
            <dialog className="modal" open={true} onClose={onClose}>
                <div className="modal-box size-fit">
                    { children }
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>
        </div>
    );
}*/

export default ModalComponent;