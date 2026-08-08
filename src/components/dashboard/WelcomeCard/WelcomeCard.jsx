import "./WelcomeCard.css";

function WelcomeCard() {

  const today = new Date();

  const formattedDate = today.toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (

    <div className="welcome-card">

      <div>

        <h2>
          Welcome Back, Sunil 👋
        </h2>

        <p>
          Smart Agreement Management System
        </p>

      </div>

      <div className="welcome-date">

        {formattedDate}

      </div>

    </div>

  );

}

export default WelcomeCard;