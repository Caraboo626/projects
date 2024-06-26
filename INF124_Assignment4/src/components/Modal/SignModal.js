import React, {useState} from "react";
import "./Modal.css"

export default function SignModal() {
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
                    <p className="abouttext">
                      PickPallete was conceived from the creative minds of two UCI students.
                      <br /><br />
                      Our system introduces a first-of-its-kind AI integration within a color
                      palette generator.
                      <br /><br />
                      The OpenAI API is utilized to create novel color palettes according to
                      user specifications.
                      <br /><br />
                      Happy Generating!
                    </p>
              </div>
              <button className="close-modal" onClick={toggleModal}>
                x
              </button>
            </div>
          </div>
        )}
      </>
    );
  }