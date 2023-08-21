import { useState } from 'react';
import Modal from '../components/Modal';

const useConfirm = () => {
    const [showConfirm, setShowConfirm] = useState(false);

    const handleConfirmClick = (action) => {
        typeof action === 'function' && action();

        setShowConfirm(false);
    };

    const Confirm = ({ children, action, accept, cancel }) => {
        return (
            showConfirm && (
                <Modal closeModal={setShowConfirm}>
                    <div className="text-xl">
                        <div className="text-center font-bold mx-2">{children}</div>
                        <div className="flex items-center justify-evenly my-8">
                            <button
                                className="bg-blue-500 w-20 rounded-lg py-1 text-white"
                                onClick={() => handleConfirmClick(action)}
                            >
                                {accept || 'Yes'}
                            </button>
                            <button
                                className="bg-red-500 w-20 rounded-lg py-1 text-white"
                                onClick={() => setShowConfirm(false)}
                            >
                                {cancel || 'No'}
                            </button>
                        </div>
                    </div>
                </Modal>
            )
        );
    };

    return [setShowConfirm, Confirm];
};

export { useConfirm };
