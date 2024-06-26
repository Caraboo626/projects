import React, {useState} from "react";
import "./Modal.css"

export default function Modal() {
    const [modal, setModal] = useState(false);
  
    const toggleModal = () => {
      setModal(!modal);
    };
  
    if(modal) {
      document.body.classList.add('modalOn')
    } else {
      document.body.classList.remove('modalOn')
    }
  
    return (
      <>
        <button onClick={toggleModal} className="modalButton">
          About
        </button>
  
        {modal && (
          <div className="modal">
            <div onClick={toggleModal} className="overlay"></div>
            <div className="modal-content">
              <p className="modalText">About</p>
              <div>
                    <input className="popupInput" type="text" placeholder="Name"/>
              </div>
              <button onClick={toggleModal} className="submit">Close</button>
              <button className="close-modal" onClick={toggleModal}>
                x
              </button>
            </div>
          </div>
        )}
      </>
    );
  }