import React from 'react';

function Modal({content, closeModal }){
    return(
        <div className="Modal">
        <div className="Modal-Close float-left">
            <h4 onClick={closeModal}>X</h4>
        </div>
        <div className="Modal-Content">
            { content }
        </div>
        </div>
    )
}

export default Modal;