import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  Link,
  Outlet,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { AppHeader } from "../cmps/AppHeader";
import { AppPlayer } from "../cmps/AppPlayer";
import { StationList } from "../cmps/StationList";
import { CurrentSongDetails } from "../cmps/CurrentSongDetails";
import { SvgIcon } from "../cmps/SvgIcon";
import { createEmptyStation } from "../store/actions/station.actions";

export const StationIndex = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [isSearchDisplayed, setIsSearchDisplayed] = useState(false);
  const [isHomePageDisplayed, setIsHomePageDisplayed] = useState(true);

  const displayCard = useSelector(
    (storeState) => storeState.stationModule.displayCard
  );

  useEffect(() => {
    getLocation();
  }, [location]);

  function getLocation() {
    if (location.pathname.includes("search")) {
      setIsSearchDisplayed(true);
    } else {
      setIsSearchDisplayed(false);
    }
    if (location.pathname === "/") {
      setIsHomePageDisplayed(true);
    } else {
      setIsHomePageDisplayed(false);
    }
  }

  async function onCreateEmptyStation() {
    try {
      const emptyStation = await createEmptyStation();
      navigate(`/station/${emptyStation._id}`);
    } catch (err) {
      console.log("Creating new playlist failed, please try again later", err);
    }
  }

  return (
    <div className={`station-index  ${displayCard ? "display-card" : null}  `}>
      {console.log("rendered")}
      {/* <header>
        {/* <section className="icons-back-forward"> }
        <section>
          <button className="icon-type-1 big">
            <SvgIcon iconName={"back"} />
          </button>
          <button className="icon-type-1 big">
            <SvgIcon iconName={"forward"} />
          </button>
        </section>
        {isSearchDisplayed && <AppSearch />}
       
      </header> */}
      <aside>
        <nav>
          <Link to="/" className="btn-type-2">
            <SvgIcon iconName="home" /> Home
          </Link>
          <Link to="/search" className="btn-type-2">
            <SvgIcon iconName="search" /> Search
          </Link>
        </nav>
        <section className="library">
          <div className="library-pannel">
            <button title="Collapse Your Library" className="btn-type-2">
              {" "}
              <SvgIcon iconName="library" />
              Your Library
            </button>
            <button
              onClick={onCreateEmptyStation}
              title="Create playlist"
              className="icon-type-1"
            >
              <SvgIcon iconName="plus" />
            </button>
            <button title="Show more" className="icon-type-1">
              <SvgIcon iconName="more" />
            </button>
          </div>
          <div className="library-types">
            <button className="btn-type-1">Playlists</button>
            <button className="btn-type-1">Artists</button>
            <button className="btn-type-1">Albums</button>
          </div>
          <div className="search-in-lib">
            {/* <button title="Search in your Library" className="btn btn-icon"> */}

            <button title="Search in your Library" className="icon-type-1">
              {" "}
              <SvgIcon iconName="search" />
            </button>
            <form>
              {/* <label>Search</label> */}
              <input
                type="text"
                className="search-field"
                placeholder="Search in your Library"
              />
            </form>
            {/* <button>Recents</button> */}
          </div>
          <StationList location="library" />
        </section>
      </aside>
      <main>
        {(isHomePageDisplayed || isSearchDisplayed) && <AppHeader />}
        {isHomePageDisplayed && <StationList location="main" />}
        {!isHomePageDisplayed && <Outlet />}
      </main>
      {displayCard && (
        <section className="card">
          <CurrentSongDetails />
        </section>
      )}
      <footer>{<AppPlayer />}</footer>
    </div>
  );
};
