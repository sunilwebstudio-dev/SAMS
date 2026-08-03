import { useEffect, useState } from "react";
import "../../styles/preloader.css";
import { useTranslation } from "react-i18next";

function Preloader({ onComplete }) {
  const { t } = useTranslation();
  const [progress, setProgress] = useState(0);
  const [exit, setExit] = useState(false);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((oldProgress) => {
       const next = Math.min(oldProgress + 2, 100);

      if (next >= 100) {
  clearInterval(interval);

  setIsReady(true);
  console.log("System Ready");

  setTimeout(() => {
    setExit(true);

    setTimeout(() => {
      onComplete();
    }, 800);
  }, 1200); // 1.2 second tak "System Ready" dikhega

  return 100;
}
        return next;
      });
    }, 35);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    

    <div className={`preloader ${exit ? "preloader-exit" : ""}`}>
      <div className="preloader-overlay"></div>
      <div className="gold-light gold-light-one"></div>
      <div className="gold-light gold-light-two"></div>

      <div className="preloader-content">

        <div className="sams-animation">
          <div className="sams-left">SA</div>

          <div className="merge-flash"></div>

          <div className="sams-right">MS</div>
        </div>

        <div className="preloader-divider">
          <span></span>
          <i></i>
          <span></span>
        </div>

        <p className="system-name">
        {t("systemName")}
      </p>

        <p className="system-tagline">
          {t("systemTagline")}
        </p>

        <div className="loader-section">

          <div className="loader-info">
  <span>
    {isReady ? (
  <>
    <span className="ready-icon">✓</span> {t("systemReady")}
  </>
) : (
  t("loading")
)}
  </span>

  <span>{progress}%</span>
</div>

          <div
          className="loader-track"
          role="progressbar"
          aria-valuenow={progress}
          aria-valuemin={0}
          aria-valuemax={100}
        >
            <div
              className="loader-progress"
              style={{ width: `${progress}%` }}
            >
              <div className="loader-glow"></div>
            </div>
          </div>

        </div>

      </div>

      <div className="preloader-footer">
        SAMS
      </div>
    </div>
  );
}



export default Preloader;