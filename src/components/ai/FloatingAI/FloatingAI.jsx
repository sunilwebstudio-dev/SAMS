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

  const handleToggle = () => {
    setOpen((previous) => !previous);
  };

  return (
    <Draggable
      nodeRef={wrapperRef}
      bounds="body"
      handle=".floating-ai-btn"
    >
      <div
        ref={wrapperRef}
        className="floating-ai-wrapper"
      >

        {/* AI PANEL */}

        {open && (
          <div className="ai-panel">

            <div className="ai-header">

              <div className="ai-title">

                <div className="ai-logo-small">
                  S
                </div>

                <div>
                  <h3>SAMS AI</h3>

                  <span>
                    Online
                  </span>
                </div>

              </div>

              <button
                type="button"
                className="ai-close-btn"
                onClick={() => setOpen(false)}
                aria-label="Close SAMS AI"
              >
                ×
              </button>

            </div>

            <div className="ai-body">

              <div className="ai-welcome-icon">
                S
              </div>

              <p className="ai-welcome-title">
                Namaste! 👋
              </p>

              <p className="ai-welcome-text">
                Main aapki kis tarah madad kar
                sakta hoon?
              </p>

              <div className="ai-suggestions">

                <button type="button">
                  📄 Check my agreements
                </button>

                <button type="button">
                  🔔 Show notifications
                </button>

                <button type="button">
                  📊 Show reports
                </button>

              </div>

            </div>

            <div className="ai-input-area">

              <input
                type="text"
                placeholder="Ask SAMS AI..."
                disabled
              />

              <button
                type="button"
                disabled
                aria-label="Send message"
              >
                ➤
              </button>

            </div>

            <div className="ai-footer">
              AI assistant will be connected
              to the SAMS backend.
            </div>

          </div>
        )}

        {/* FLOATING BUTTON */}

        <button
          type="button"
          className="floating-ai-btn"
          onClick={handleToggle}
          aria-label="Open SAMS AI"
        >

          <div className="ai-logo">
            S
          </div>

          <span className="ai-status-dot" />

        </button>

      </div>
    </Draggable>
  );
}

export default FloatingAI;