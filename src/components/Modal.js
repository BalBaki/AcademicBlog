import { createPortal } from 'react-dom';
import { useEffect } from 'react';
import { GrFormClose } from 'react-icons/gr';

function Modal({ closeModal, children }) {
    const handleClick = () => {
        closeModal(false);
    };

    useEffect(() => {
        document.body.classList.add('overflow-hidden');

        return () => document.body.classList.remove('overflow-hidden');
    });

    return createPortal(
        <div>
            <div className="fixed inset-0 bg-gray-900 opacity-50" onClick={handleClick}></div>
            <div
                className="fixed top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/4 w-2/3  max-w-lg
                    border-2 bg-white rounded-2xl"
            >
                <div className="flex flex-row-reverse mr-1 text-3xl pb-4 pt-1">
                    <GrFormClose onClick={handleClick} className="cursor-pointer" />
                </div>
                <div>{children}</div>
            </div>
        </div>,
        document.querySelector('.modal-container')
    );
}

export default Modal;
