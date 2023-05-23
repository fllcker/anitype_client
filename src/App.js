import {Route, Routes} from "react-router-dom";
import SearchPage from "./legacy/pages/SearchPage";
import ReleasePageAni from "./legacy/pages/ani/ReleasePageAni";
import PlayerPage from "./legacy/pages/ani/PlayerPage";
import MainPage from "./legacy/pages/MainPage";
import LastReleasesPageAni from "./legacy/pages/ani/LastReleasesPageAni";
import AuthPage from "./pages/account/AuthPage";
import FavPageAni from "./legacy/pages/FavPageAni";
import AccountPage from "./pages/account/AccountPage";
import AppDownloadPage from "./pages/AppDownloadPage";
import HomePage from "./pages/HomePage";
import FourOfFour from "./pages/other/FourOfFour";
import KodikPlayerPage from "./pages/kodik/KodikPlayerPage";
import PravoPage from "./pages/other/PravoPage";
import AboutPage from "./pages/other/AboutPage";
import VerificationPage from "./pages/account/VerificationPage";

function App() {
    return (
        <>
            <Routes>
                <Route path="/search">
                    <Route path=":query" element={<SearchPage/>}/>
                    <Route index element={<SearchPage/>}/>
                </Route>

                <Route path="/release">
                    <Route path=":id/play/:episode" element={<PlayerPage/>}/>
                    <Route path=":id" element={<ReleasePageAni/>}/>
                </Route>

                <Route path="/player">
                    <Route path="2/:orig/r/:releaseId" element={<KodikPlayerPage/>}/>
                    <Route path="2/:orig" element={<KodikPlayerPage/>}/>
                </Route>

                <Route path="/last" element={<LastReleasesPageAni/>}/>

                <Route path="/auth">
                    <Route index element={<AuthPage/>}/>
                    <Route path="signin" element={<AuthPage defMode={"log"}/>}/>
                    <Route path="signup" element={<AuthPage defMode={"reg"}/>}/>
                </Route>

                <Route path="/favourite" element={<FavPageAni/>}/>
                <Route path="/account" element={<AccountPage/>}/>
                <Route path="/app" element={<AppDownloadPage/>}/>
                <Route path="/home/preview" element={<HomePage/>}/>
                <Route path="/pravo" element={<PravoPage/>}/>
                <Route path="/about" element={<AboutPage/>}/>
                <Route path="/verification/:code" element={<VerificationPage/>} />
                <Route path="/" element={<MainPage/>}/>

                <Route path="*" element={<FourOfFour/>}/>

            </Routes>
        </>
    );
}

export default App;
