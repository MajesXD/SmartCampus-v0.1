import { useState, useEffect, useRef } from "react";
import { Link, NavLink } from "react-router-dom";
import { auth } from "/src/firebase.js";
import { createPortal } from "react-dom";
import ToggleSwitch from "/src/global/components/ToggleSwitch/ToggleSwitch.jsx";
import { toggleColorScheme } from '../../scripts/changeColorScheme.js';
import {
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";

function NavBar() {
  const [user, setUser] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);   // ref do menu
  const buttonRef = useRef(null); // ref do przycisku
  const [isDark, setIsDark] = useState(false); // tryb ciemny

  const handleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Błąd logowania:", error);
    }
    setIsMenuOpen(false);
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Błąd wylogowania:", error);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isMenuOpen &&
        menuRef.current &&
        buttonRef.current &&
        !menuRef.current.contains(event.target) &&
        !buttonRef.current.contains(event.target)
      ) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMenuOpen]);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  const trimUsername = (user) =>
    user?.displayName ? user.displayName.split(" ")[0] : "";

  const getEmailPrefix = (user) =>
    user?.email ? user.email.split("@")[0] : "";

  return (
    <section className="navbar_section">
      <Link to="/" className="navbar_logo">
        <div className="navbar_logo_icon" />
        <div className="navbar_logo_wrapper">
          <div className="navbar_logo_wrapper_topText">Smart</div>
          <div className="navbar_logo_wrapper_bottomText">Campus</div>
        </div>
      </Link>

      <nav className="navbar_navigationBar">
        <NavLink to="/Panel" className={({ isActive }) => isActive ? "navbar_button--active" : "navbar_button"}>Panel</NavLink>
        <NavLink to="/PlanLekcji" className={({ isActive }) => isActive ? "navbar_button--active" : "navbar_button"}>Plan lekcji</NavLink>
        <NavLink to="/MapaKampusu" className={({ isActive }) => isActive ? "navbar_button--active" : "navbar_button"}>Mapa kampusu</NavLink>
        <NavLink to="/Elearning" className={({ isActive }) => isActive ? "navbar_button--active" : "navbar_button"}>E-learning</NavLink>
        <NavLink to="/Feed" className={({ isActive }) => isActive ? "navbar_button--active" : "navbar_button"}>Feed</NavLink>
      </nav>

      {!user ? (
        <button className="defaultButton" onClick={handleLogin}>Zaloguj</button>
      ) : (
        <>
          <div
            ref={buttonRef}
            className={`navbar_userBar ${isMenuOpen ? "navbar_userBar--onFocus" : ""}`}
            onClick={toggleMenu}
          >
            <div className="navbar_userBar_wrapper">
              <div className="navbar_userBar_name">{trimUsername(user)}</div>
              <div className="navbar_userBar_mail">{getEmailPrefix(user)}</div>
            </div>
            <div
              className="navbar_userBar_profilePicture"
              style={{ backgroundImage: `url('${user.photoURL}')` }}
            />
          </div>

          {isMenuOpen &&
            createPortal(
              <div
                ref={menuRef}
                className="navbar_userMenu"
              >
                <section className="navbar_userMenu_topSection">
                  <div className="navbar_userMenu_topSection_left">
                    <div className="navbar_userMenu_logo">
                      <div className="navbar_userMenu_logo_icon" />
                      <div className="navbar_userMenulogo_wrapper">
                        <div className="navbar_userMenulogo_wrapper_topText">Smart</div>
                        <div className="navbar_userMenulogo_wrapper_bottomText">Campus</div>
                      </div>
                    </div>
                  </div>
                  <div className="navbar_userMenu_topSection_right">
                    <button className="navbar_userMenu_topSection_button"><i class="fa-solid fa-bell"></i></button>
                    <button className="navbar_userMenu_topSection_button"><i class="fa-solid fa-gear"></i></button>
                    <button className="navbar_userMenu_topSection_button" onClick={handleLogout}><i class="fa-solid fa-right-from-bracket"></i></button>

                  </div>

                </section>
                <section className="navbar_userMenu_userInfoSection">
                  <div
                    className="navbar_userMenu_userInfoSection_profilePicture"
                    style={{ backgroundImage: `url('${user.photoURL}')` }}
                  />
                  <div className="navbar_userMenu_userInfoSection_name">{user.displayName}</div>
                  <div className="navbar_userMenu_userInfoSection_mail">{user.email}</div>
                  <div className="navbar_userMenu_userInfoSection_indexNumber">{getEmailPrefix(user)}</div>
                </section>
                <section className="navbar_userMenu_settingsSection">
                  <div className="navbar_userMenu_toogleButton">
                    <div className="navbar_userMenu_toogleButton_title">Motyw aplikacji (W trakcie)</div>
                    <div className="navbar_userMenu_toogleButton_switch">
                      <button onClick={() => toggleColorScheme()}>Daj czarny</button>
                      <ToggleSwitch
                        id="darkMode"
                        onToggle={() => {
                          
                        }}
                      />
                    </div>
                  </div>
                  <a href="https://pansim.edu.pl/" target="_blank"><button className="navbar_userMenu_button">Strona Pansim</button></a>
                  <a href="https://moodle.pansim.edu.pl/" target="_blank"><button className="navbar_userMenu_button">Moodle</button></a>
                  <Link to="/videomanager"><button className="navbar_userMenu_button">Wideo Manager</button></Link>
                  <Link to="/ustawienia"><button className="navbar_userMenu_button">Settings (tymczasowe)</button></Link>
                </section>
                <section className="navbar_userMenu_bottomSection"> 
                        <a href="https://wu.pansim.edu.pl/wu/start?&locale=pl" target="_blank"><button className="navbar_userMenu_bottomSection_WUbutton">Wirtualna Uczelnia</button></a>
                        <button className="navbar_userMenu_bottomSection_Legitymacja"><i class="fa-solid fa-id-card"></i></button>
                </section>
              </div>,
              document.getElementById("dropdown-root")
            )}
        </>
      )}
    </section>
  );
}

export default NavBar;
