import { useState, useRef, useEffect } from "react";
import Draggable from "react-draggable";
import "./FloatingAI.css";

function FloatingAI() {
  const [open, setOpen] = useState(false);

  const wrapperRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, []);

  return (
    <Draggable>

      <div
        ref={wrapperRef}
        className="floating-ai-wrapper"
      >

        <button
          className="floating-ai-btn"
          onClick={() => setOpen(!open)}
        >
          <div className="ai-logo">
            S
          </div>
        </button>

        {open && (

          <div className="ai-panel">

            <div className="ai-header">

              <div className="ai-title">

                <div className="ai-logo-small">
                  S
                </div>

                <div>

                  <h3>SAMS AI</h3>

                  <span>Online</span>

                </div>

              </div>

            </div>

            <div className="ai-body">

              <p>👋 Namaste!</p>

              <p>Main aapki kis tarah madad kar sakta hoon?</p>

            </div>

          </div>

        )}

      </div>

    </Draggable>
  );
}

export default FloatingAI;