import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  useMemo,
} from "react";

import { supabase } from "../config/supabase";

/* -------------------------------------------------------------------------- */
/*                               Context Create                               */
/* -------------------------------------------------------------------------- */

const AuthContext = createContext(null);

/* -------------------------------------------------------------------------- */
/*                              Provider Component                            */
/* -------------------------------------------------------------------------- */

export function AuthProvider({ children }) {
    /* -------------------------------------------------------------------------- */
  /*                                  Auth State                                */
  /* -------------------------------------------------------------------------- */

  const [user, setUser] = useState(null);
  const [session, setSession] = useState(null);
  const [profile, setProfile] = useState(null);

  const [loading, setLoading] = useState(true);

  /* -------------------------------------------------------------------------- */
  /*                               User & Security                              */
  /* -------------------------------------------------------------------------- */

  const [role, setRole] = useState("buyer");
  const [permissions, setPermissions] = useState([]);

  const [securityScore, setSecurityScore] = useState(100);

  const [desktopTimeout, setDesktopTimeout] = useState(true);

  const [trustedDevice, setTrustedDevice] = useState(false);

  /* -------------------------------------------------------------------------- */
  /*                             Network & Offline                              */
  /* -------------------------------------------------------------------------- */

  const [networkStatus, setNetworkStatus] = useState(
    navigator.onLine ? "online" : "offline"
  );

  const [syncStatus, setSyncStatus] =
    useState("synced");

  /* -------------------------------------------------------------------------- */
  /*                                 Appearance                                 */
  /* -------------------------------------------------------------------------- */

  const [theme, setTheme] = useState("light");

  const [language, setLanguage] = useState("en");

  /* -------------------------------------------------------------------------- */
  /*                                Notifications                               */
  /* -------------------------------------------------------------------------- */

  const [notificationCount, setNotificationCount] =
    useState(0);

  /* -------------------------------------------------------------------------- */
  /*                                AI Assistant                                */
  /* -------------------------------------------------------------------------- */

  const [aiState, setAiState] = useState({

    isOpen: false,

    isListening: false,

    isSpeaking: false,

    agreementMode: false,

  });

  /* -------------------------------------------------------------------------- */
  /*                               App Management                               */
  /* -------------------------------------------------------------------------- */

  const [maintenanceMode, setMaintenanceMode] =
    useState(false);

  const [appVersion, setAppVersion] =
    useState("1.0.0");
      /* -------------------------------------------------------------------------- */
  /*                            Refresh User Profile                            */
  /* -------------------------------------------------------------------------- */

  const refreshProfile = useCallback(async (authUser) => {
    if (!authUser) {
      setProfile(null);
      setRole("buyer");
      setPermissions([]);
      return;
    }

    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("auth_id", authUser.id)
        .single();

      if (error) throw error;

      setProfile(data);

      setRole(data.role || "buyer");

      setPermissions(data.permissions || []);

      setSecurityScore(data.security_score || 100);

    } catch (error) {
      console.error("Profile Load Error:", error.message);
    }
  }, []);

  /* -------------------------------------------------------------------------- */
  /*                               Load Session                                 */
  /* -------------------------------------------------------------------------- */

  const loadSession = useCallback(async () => {

    try {

      const {
        data: { session },
      } = await supabase.auth.getSession();

      setSession(session);

      setUser(session?.user ?? null);

      if (session?.user) {

        await refreshProfile(session.user);

      }

    } catch (error) {

      console.error("Session Error:", error.message);

    } finally {

      setLoading(false);

    }

  }, [refreshProfile]);
    /* -------------------------------------------------------------------------- */
  /*                              Logout Function                               */
  /* -------------------------------------------------------------------------- */

  const logout = useCallback(async () => {
    try {

      await supabase.auth.signOut();

      setUser(null);
      setSession(null);
      setProfile(null);

      setRole("buyer");
      setPermissions([]);

      setNotificationCount(0);

    } catch (error) {

      console.error("Logout Error:", error.message);

    }
  }, []);

  /* -------------------------------------------------------------------------- */
  /*                           Refresh Current Session                          */
  /* -------------------------------------------------------------------------- */

  const refreshSession = useCallback(async () => {

    await loadSession();

  }, [loadSession]);

  /* -------------------------------------------------------------------------- */
  /*                          Network Status Listener                           */
  /* -------------------------------------------------------------------------- */

  useEffect(() => {

    function goOnline() {

      setNetworkStatus("online");

      setSyncStatus("syncing");

    }

    function goOffline() {

      setNetworkStatus("offline");

      setSyncStatus("offline");

    }

    window.addEventListener("online", goOnline);

    window.addEventListener("offline", goOffline);

    return () => {

      window.removeEventListener("online", goOnline);

      window.removeEventListener("offline", goOffline);

    };

  }, []);

  /* -------------------------------------------------------------------------- */
  /*                           Initial Session Load                             */
  /* -------------------------------------------------------------------------- */

  useEffect(() => {

    loadSession();

  }, [loadSession]);

  /* -------------------------------------------------------------------------- */
  /*                        Supabase Authentication Listener                     */
  /* -------------------------------------------------------------------------- */

  useEffect(() => {

    const {

      data: listener,

    } = supabase.auth.onAuthStateChange(

      async (_event, session) => {

        setSession(session);

        setUser(session?.user ?? null);

        if (session?.user) {

          await refreshProfile(session.user);

        } else {

          setProfile(null);

        }

      }

    );

    return () => {

      listener.subscription.unsubscribe();

    };

  }, [refreshProfile]);
    /* -------------------------------------------------------------------------- */
  /*                               Context Value                                */
  /* -------------------------------------------------------------------------- */

  const value = useMemo(
    () => ({
      /* Auth */
      user,
      session,
      profile,
      loading,

      /* Security */
      role,
      permissions,
      securityScore,
      trustedDevice,
      desktopTimeout,

      /* Network */
      networkStatus,
      syncStatus,

      /* Appearance */
      theme,
      setTheme,
      language,
      setLanguage,

      /* Notifications */
      notificationCount,
      setNotificationCount,

      /* AI */
      aiState,
      setAiState,

      /* App */
      maintenanceMode,
      appVersion,

      /* Methods */
      logout,
      refreshProfile,
      refreshSession,
    }),
    [
      user,
      session,
      profile,
      loading,

      role,
      permissions,
      securityScore,
      trustedDevice,
      desktopTimeout,

      networkStatus,
      syncStatus,

      theme,
      language,

      notificationCount,

      aiState,

      maintenanceMode,
      appVersion,

      logout,
      refreshProfile,
      refreshSession,
    ]
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

/* -------------------------------------------------------------------------- */
/*                                  Hook                                      */
/* -------------------------------------------------------------------------- */

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth must be used inside AuthProvider"
    );
  }

  return context;
}