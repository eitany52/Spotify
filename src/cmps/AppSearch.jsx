import searchRes from "../../data/search.json";

import { stationService } from "../services/station.service.local";
import { userService } from "../services/user.service.local";

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { loadStations, addStation } from "../store/actions/station.actions";
import { SvgIcon } from "./SvgIcon";

export const AppSearch = () => {
  const stations = useSelector(storeState => storeState.stationModule.stations)


  useEffect(() => {
  }, []);

  //   async function loadStations() {
  //     try {
  //       const stations = await stationService.query();
  //       console.log("AppSearch stations:", stations);
  //       setStations(stations);
  //     } catch (error) {
  //       console.log("Having issues with loading stations:", error);
  //       showUserMsg("Problem!");
  //     }
  //   }

  console.log(searchRes);

  async function onSearch(ev) {
    ev.preventDefault()
    console.log("AppSearch searchRes:", searchRes)
    // const searchTerm = 'rap-song'
    // const res = await fetch(`https://www.googleapis.com/youtube/v3/search?q=${searchTerm}&part=snippet&key=AIzaSyCUE7BdmEO9uF_gWcV5yY5O3eqyINxdavo`)
    // const data = await res.json()
    // console.log(data);
  }



  if (!stations) return <div>Loading...</div>

  return (
    <form className="search-form" onSubmit={onSearch}>
      <span className="icon-search"><SvgIcon iconName={"search"} /></span>
      <input type="text" placeholder="What do you want to play?" />
    </form>
  );
};
