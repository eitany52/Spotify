import { storageService } from './async-storage.service'
import { utilService } from './util.service'
import { userService } from './user.service.local'
import initialStations from '../../data/stations.json'
import searchRes from "../../data/search.json"
import demoStations from "../../data/demo-station.json"

import { getLoggedOnUser } from '../store/actions/user.actions'

//Checked - All looks good.

export const stationService = {
    query,
    getById,
    save,
    remove,
    getStations,
    addSongToStation,
    removeSongFromStation,
    addUserLikedToStation,
    removeUserLikedFromStation,
    getLikedSongsStation,
    isLikedSongStation,
    formatSong,
    createEmptyStation,
    getSongsFromYoutube,
    updateStationDetails,
    isSongSavedAtStation,
    getUserStations,
    isSongSavedAtSomeStation,
    isSongInLikedSong,
    getDemoStations,
    saveStationByUser
    // getEmptyCar,
    // addCarMsg
}
window.ss = stationService
const STORAGE_KEY = 'station_db'
_createStations()


async function query(filterBy = { txt: '', price: 0 }) {
    var stations = await storageService.query(STORAGE_KEY)
    console.log('stations:', stations)
    // if (filterBy.txt) {
    //     const regex = new RegExp(filterBy.txt, 'i')
    //     cars = cars.filter(car => regex.test(car.vendor) || regex.test(car.description))
    // }
    // if (filterBy.price) {
    //     cars = cars.filter(car => car.price <= filterBy.price)
    // }

    // Return just preview info about the boards
    // cars = cars.map(({ _id, vendor, price, owner }) => ({ _id, vendor, price, owner }))
    return stations
}


function getStations() {
    return storageService.query(STORAGE_KEY)
}

async function getLikedSongsStation() {
    const stations = await getStations()
    const likedSongsStation = stations.find(station => station.type === 'liked')
    return likedSongsStation
}

async function isLikedSongStation(stationId) {
    const station = await getById(stationId)
    const islikedSongsStation = (station.type === 'liked')
    return islikedSongsStation
}

function isSongSavedAtStation(station, songId) {
    return station.songs.some(song => song.id === songId)
}

function getUserStations(stations) {
    return stations.filter(station => station.createdBy.id === getLoggedOnUser()._id)
}

function isSongSavedAtSomeStation(stations, songId) {
    let isSongSavedAtSomeStation = false
    stations.forEach(station => {
        if (station.songs.some(song => song.id === songId)) {
            isSongSavedAtSomeStation = true
        }
    })
    return isSongSavedAtSomeStation
}

async function getById(stationId) {
    return await storageService.get(STORAGE_KEY, stationId)
}

async function remove(stationId) {
    // throw new Error('Nope')
    await storageService.remove(STORAGE_KEY, stationId)
}

function createEmptyStation() {
    return {
        _id: "",
        name: "My Playlist",
        type: "normal",
        description: null,
        imgUrl: 'https://www.greencode.co.il/wp-content/uploads/2024/07/station-thumb-default.jpg',
        tags: [],
        createdBy: {},
        savedBy: [],
        songs: []
    }
}

async function save(station) {
    let savedStation
    if (station._id) {
        // const stationToSave = {
        //     _id: station._id,
        //     name: station.name,
        //     tags: station.tags,
        //     createdBy: station.createdBy,
        //     likedByUsers: station.likedByUsers,
        //     songs: station.songs
        // }
        savedStation = await storageService.put(STORAGE_KEY, station)
    } else {
        // Later, owner is set by the backend
        const user = {
            id: getLoggedOnUser()._id,
            fullname: getLoggedOnUser().name
        }
        const stationToSave = {
            ...station, createdBy: user
        }
        savedStation = await storageService.post(STORAGE_KEY, stationToSave)
    }
    return savedStation
}

function getSongsFromYoutube() {
    return searchRes[0].items.slice(0, 4)
    // const searchTerm = 'rap-song'
    // const res = await fetch(`https://www.googleapis.com/youtube/v3/search?q=${searchTerm}&part=snippet&key=AIzaSyCUE7BdmEO9uF_gWcV5yY5O3eqyINxdavo`)
    // const data = await res.json()
    // console.log(data);
}


function getDemoStations() {
    return demoStations
    
}


async function saveStationByUser(station) {
   
    const stationToSave = {
        ...station, savedBy: [ ...station.savedBy , getLoggedOnUser()._id]
    }
   
    const stations = await getStations()
    const isExists = stations.some(_station => _station._id === station._id)
    if (isExists) {
        return Promise.resolve('already exist'); 
    }
    const savedStation = await storageService.post(STORAGE_KEY, stationToSave)

    
    return savedStation
}

async function addSongToStation(stationId, song) {
    // Later, this is all done by the backend
    const station = await getById(stationId)

    station.songs.push(song)
    await storageService.put(STORAGE_KEY, station)

    return station // ?
}


async function removeSongFromStation(stationId, songId) {

    const station = await getById(stationId)
    station.songs = station.songs.filter((song) => song.id !== songId)
    await storageService.put(STORAGE_KEY, station)

    return station // ?
}

async function addUserLikedToStation(stationId, userId) {
    const station = await getById(stationId)

    station.likedByUsers.push(userId)
    await storageService.put(STORAGE_KEY, station)

    return station // ?
}

async function removeUserLikedFromStation(stationId, userId) {
    const station = await getById(stationId)

    station.likedByUsers.filter((user) => user.id == userId)
    await storageService.put(STORAGE_KEY, station)

    return station // ?
}


async function updateStationDetails(stationToSave) {

    const station = await getById(stationToSave._id)

    // station.name = stationToSave.name;
    // station.description = stationToSave.description;
    // station.imgUrl = stationToSave.imgUrl;

    Object.assign(station, stationToSave);

    await storageService.put(STORAGE_KEY, station)

    return station // ?)

}


async function isSongInLikedSong(songId) {

    const station = await getLikedSongsStation();
    
     console.log('isSongInLikedSong songId:', songId)
     console.log('isSongInLikedSong station:', station)
    const isInStation = station.songs.some((song) => song.id === songId )
     console.log('isSongInLikedSong isInStation:', isInStation)
    return isInStation;
   
}





function formatSong(song) {
    const user = {
        id: getLoggedOnUser()._id,
        name: getLoggedOnUser().name
    }
    return {
        id: song.id.videoId,
        title: getSubstringBeforePipe(song.snippet.title),
        //title: song.snippet.title,
        channelTitle: song.snippet.channelTitle,
        url: `https://youtube.com/watch?v=${song.id.videoId}`,
        imgUrl: song.snippet.thumbnails.default.url,
        addedBy: user,
        addedAt: Date.now()
    }
}

function getSubstringBeforePipe(str) {
    // בדוק אם המחרוזת מכילה את התו '|'
    const pipeIndex = str.indexOf('|');

    // אם אין את התו '|', החזר את המחרוזת כולה
    if (pipeIndex === -1) {
        return str;
    }
    // אחרת, החזר את החלק של המחרוזת עד ל-| הראשון (לא כולל)
    return str.substring(0, pipeIndex);
}




// async function addCarMsg(carId, txt) {
//     // Later, this is all done by the backend
//     const car = await getById(carId)

//     const msg = {
//         id: utilService.makeId(),
//         by: userService.getLoggedinUser(),
//         txt
//     }
//     car.msgs.push(msg)
//     await storageService.put(STORAGE_KEY, car)

//     return msg
// }

// function getEmptyCar() {
//     return {
//         vendor: 'Susita-' + utilService.makeId(),
//         price: utilService.getRandomIntInclusive(1000, 9000),
//         msgs: []
//     }
// }





function _createStations() {
    let stations = utilService.loadFromStorage(STORAGE_KEY)
    if (!stations || !stations.length) {
        utilService.saveToStorage(STORAGE_KEY, initialStations)
    }
}


// storageService.post(STORAGE_KEY, {vendor: 'Subali Rahok 2', price: 980}).then(x => console.log(x))

