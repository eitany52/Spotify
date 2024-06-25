import { Routes, Route } from 'react-router'
import { AppSearch } from './cmps/AppSearch'
import { StationDetails } from './cmps/StationDetails'
import { UserDetails } from './cmps/UserDetails'
import { ArtistDetails } from './cmps/ArtistDetails'
import { StationIndex } from './pages/StationIndex.jsx'


export function RootCmp() {
    return (
        <>
            <Routes>
                <Route path="/" element={<StationIndex />}>
                    <Route path="/search" element={<AppSearch />} />
                    <Route path="/station/:id" element={<StationDetails />} />
                    <Route path="/artist/:id" element={<ArtistDetails />} />
                    <Route path="/user/:id" element={<UserDetails />} />
                    {/* <Route path="/genre/:id" element={} /> */}
                    {/* <Route path="/recent-searches" element={} /> */}
                </Route>
            </Routes>
        </>
    )







    // import { HomePage } from './pages/HomePage'
    // import { Routes, Route } from 'react-router'
    // import { AboutUs, AboutTeam, AboutVision } from './pages/AboutUs'
    // import { CarIndex } from './pages/CarIndex.jsx'
    // import { BoardIndex } from './pages/BoardIndex.jsx'
    // import { ReviewIndex } from './pages/ReviewIndex.jsx'
    // import { ChatApp } from './pages/Chat.jsx'
    // import { AdminIndex } from './pages/AdminIndex.jsx'

    // import { CarDetails } from './pages/CarDetails'
    // import { UserDetails } from './cmps/UserDetails.jsx'
    // import { BoardDetails } from './pages/BoardDetails'
    // import { TaskDetails } from './pages/TaskDetails'

    // import { AppHeader } from './cmps/AppHeader'
    // import { AppFooter } from './cmps/AppFooter'

    // return (
    //     <div>
    //         <AppHeader />
    //         <main>
    //             <Routes>
    //                 <Route path="" element={<HomePage />} />
    //                 <Route path="about" element={<AboutUs />}>
    //                     <Route path="team" element={<AboutTeam />} />
    //                     <Route path="vision" element={<AboutVision />} />
    //                 </Route>
    //                 <Route path="car" element={<CarIndex />} />
    //                 <Route path="car/:carId" element={<CarDetails />} />
    //                 <Route path="user/:id" element={<UserDetails />} />
    //                 <Route path="board" element={<BoardIndex />} />
    //                 <Route path="board/:boardId" element={<BoardDetails />} >
    //                     <Route path="group/:groupId/task/:taskId" element={<TaskDetails />} />
    //                 </Route>
    //                 <Route path="review" element={<ReviewIndex />} />
    //                 <Route path="chat" element={<ChatApp />} />
    //                 <Route path="admin" element={<AdminIndex />} />
    //             </Routes>
    //         </main>
    //         <AppFooter />
    //     </div>
    // )
}


