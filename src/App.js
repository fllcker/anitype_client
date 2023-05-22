import {Route, Routes} from "react-router-dom";
import SearchPage from "./pages/SearchPage";
import ReleasePageAni from "./pages/ReleasePageAni";
import PlayerPage from "./pages/players/PlayerPage";
import MainPage from "./pages/MainPage";
import LastReleasesPage from "./pages/LastReleasesPage";
import AuthPage from "./pages/account/AuthPage";
import FavPage from "./pages/account/FavPage";
import AccountPage from "./pages/account/AccountPage";
import AppDownloadPage from "./pages/AppDownloadPage";
import HomePage from "./pages/HomePage";
import FourOfFour from "./pages/other/FourOfFour";
import KodikPlayerPage from "./pages/players/KodikPlayerPage";
import PravoPage from "./pages/other/PravoPage";
import AboutPage from "./pages/other/AboutPage";
import VerificationPage from "./pages/account/VerificationPage";

import './styles/index.css'
import './styles/media.css'
import './styles/main/footer.css'
import './styles/main/mainPage.css'
import './styles/main/header.css'
import './styles/main/searchPage.css'
import './styles/players/kodikPlayerPage.css'
import './styles/players/playerPage.css'
import './styles/players/main.css'
import './styles/components/episodeLineAni.css'
import './styles/components/lastReleaseAni.css'
import './styles/components/episodeList.css'
import './styles/ani/releasePage.css'
import './styles/account/accountPage.css'
import './styles/account/favPage.css'
import './styles/account/authPage.css'

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

                <Route path="/last" element={<LastReleasesPage/>}/>

                <Route path="/auth">
                    <Route index element={<AuthPage/>}/>
                    <Route path="signin" element={<AuthPage defMode={"log"}/>}/>
                    <Route path="signup" element={<AuthPage defMode={"reg"}/>}/>
                </Route>

                <Route path="/favourite" element={<FavPage/>}/>
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
