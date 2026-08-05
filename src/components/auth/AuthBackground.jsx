function AuthBackground({ children }) {
  return (
    <div className="auth-page">

      <div className="bg-orb orb-1"></div>

      <div className="bg-orb orb-2"></div>

      <div className="bg-orb orb-3"></div>

      {children}

    </div>
  );
}

export default AuthBackground;