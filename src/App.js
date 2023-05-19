import TestPage from "./pages/TestPage";
import {Route, Routes} from "react-router-dom";
import SearchPage from "./pages/SearchPage";
import ReleasePage from "./pages/ReleasePage";
import PlayerPage from "./pages/PlayerPage";
import MainPage from "./pages/MainPage";
import LastReleasesPage from "./pages/LastReleasesPage";
import RandomReleaseFunc from "./pages/RandomReleaseFunc";
import AuthPage from "./pages/AuthPage";
import FavPage from "./pages/FavPage";
import AccountPage from "./pages/AccountPage";
import AppDownloadPage from "./pages/AppDownloadPage";
import HomePage from "./pages/HomePage";
import FourOfFour from "./pages/FourOfFour";

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

                <Route path="/auth">
                    <Route index element={<AuthPage/>}/>
                    <Route path="signin" element={<AuthPage defMode={"log"}/>}/>
                    <Route path="signup" element={<AuthPage defMode={"reg"}/>}/>
                </Route>

                <Route path="/favourite" element={<FavPage/>}/>
                <Route path="/account" element={<AccountPage/>}/>
                <Route path="/app" element={<AppDownloadPage/>}/>
                <Route path="/home/preview" element={<HomePage/>}/>
                <Route path="/" element={<MainPage/>}/>

                <Route path="*" element={<FourOfFour/>}/>

            </Routes>
        </>
    );
}

export default App;
