import TestPage from "./pages/TestPage";
import {Route, Routes} from "react-router-dom";
import SearchPage from "./pages/SearchPage";
import ReleasePage from "./pages/ReleasePage";
import PlayerPage from "./pages/PlayerPage";
import MainPage from "./pages/MainPage";
import LastReleasesPage from "./pages/LastReleasesPage";
import RandomReleaseFunc from "./pages/RandomReleaseFunc";

function App() {
    return (
        <>
            <Routes>
                <Route path="/test" element={<TestPage/>}/>


                <Route path="/search">
                    <Route path=":query" element={<SearchPage/>}/>
                    <Route index element={<SearchPage/>}/>
                </Route>

                <Route path="/release">
                    <Route path=":id/play/:episode" element={<PlayerPage/>}/>
                    <Route path=":id" element={<ReleasePage/>}/>
                </Route>

                <Route path="/last" element={<LastReleasesPage/>}/>
                <Route path="/random" element={<RandomReleaseFunc/>}/>
                <Route path="/" element={<MainPage/>}/>

            </Routes>
        </>
    );
}

export default App;
