import { Link, NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service";
import { login, logout, signup } from "../store/actions/user.actions";
import { utilService } from "../services/util.service.js";

import { LoginSignup } from "../pages/LoginSignup.jsx";
import { SvgIcon } from "../cmps/SvgIcon";
import { AppSearch } from "../cmps/AppSearch";
import { onToggleModal } from "../store/actions/app.actions.js";
import { FloatingMenuUser } from "./FloatingMenuUser.jsx";

export function AppHeader({ backgroundColor = null }) {
  const user = useSelector((storeState) => storeState.userModule.user);
  const [isSearchDisplayed, setIsSearchDisplayed] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  //   console.log("user", user);

  useEffect(() => {
    getLocation();
  }, [location]);

  function getLocation() {
    if (location.pathname.includes("search")) {
      setIsSearchDisplayed(true);
    } else {
      setIsSearchDisplayed(false);
    }
    // if (location.pathname === "/") {
    //   setIsHomePageDisplayed(true);
    // } else {
    //   setIsHomePageDisplayed(false);
    // }
  }

  function onGoToLoginSignup(location) {
    navigate(`/${location}`);
  }

  function onOpenUserModal(ev) {
    const element = ev.currentTarget
    const rect = element.getBoundingClientRect()

    onToggleModal({
      cmp: FloatingMenuUser,
      props: {
        onDone() {
          onToggleModal(null);
        },
        class: "floating-menu-user",
      },
      style: {
        left: `${rect.left - 120}px`,
        top: `${rect.top + 35}px`,
      },
    });
  }
  

  const userLatter = user ? utilService.getFirstChar(user.fullname) : null;
  console.log(backgroundColor);
  const darkenedBackground_50 = utilService.darkenColor(
    "rgba(173,152,151,1)",
    50
  );

  //const darkenedBackground_50 = "rgba(255,5,5,1)";
  // const darkenedBackground_50 =
  //   backgroundColor === null
  //     ? "rgba(255,255,255,1)"
  //     : utilService.darkenColor(backgroundColor, 50);

  return (
    <header className="app-header" style={{ backgroundColor: backgroundColor }}>
      {
        <>
          <section>
            {/* <button className=" btn-back icon-type-1 big">
              <SvgIcon iconName={"back"} />
            </button>
            <button className=" btn-forward icon-type-1 big">
              <SvgIcon iconName={"forward"} />
            </button> */}
            <button
              className="btn-back icon-type-1 big"
              onClick={() => navigate(-1)}
            >
              <SvgIcon iconName={"back"} />
            </button>
            <button
              className="btn-forward icon-type-1 big"
              onClick={() => navigate(1)}
            >
              <SvgIcon iconName={"forward"} />
            </button>
          </section>
          {user && (
            <section onClick={onOpenUserModal} className="user-info">
              {/* <span>{backgroundColor} </span>
            <span>{darkenedBackground_50} </span> */}

              <span style={{ backgroundColor: darkenedBackground_50 }}>
                <small
                  style={{
                    backgroundColor: backgroundColor,
                  }}
                >
                  {userLatter}
                </small>
              </span>
            </section>
          )}
          {!user && (
            <section className="btns-login-signup">
              <button
                onClick={() => onGoToLoginSignup("signup")}
                className="btn-signup"
              >
                Sign up
              </button>
              <button
                onClick={() => onGoToLoginSignup("login")}
                className="btn-login"
              >
                Login
              </button>
            </section>
          )}
          {isSearchDisplayed && <AppSearch />}
        </>

        /* <nav>
                <NavLink to="">Home 🏠</NavLink>
                <NavLink to="about">About</NavLink>
                <NavLink to="car">Cars</NavLink>
                <NavLink to="chat">Chat</NavLink>
                <NavLink to="review">Review</NavLink>
                <NavLink to="board">Boards</NavLink>

                {user &&
                    <span className="user-info">
                        <Link to={`user/${user._id}`}>
                            {user.imgUrl && <img src={user.imgUrl} />}
                            {user.fullname}
                        </Link>
                        <span className="score">{user.score?.toLocaleString()}</span>
                        <button onClick={onLogout}>Logout</button>
                    </span>
                }
                {!user &&
                    <section className="user-info">
                        <LoginSignup onLogin={onLogin} onSignup={onSignup} />
                    </section>
                }
            </nav>
            <h1>My App</h1> */
      }
    </header>
  );
}
