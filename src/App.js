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
import KodikPlayerPage from "./pages/KodikPlayerPage";
import PravoPage from "./pages/PravoPage";
import AboutPage from "./pages/AboutPage";
import VerificationPage from "./pages/VerificationPage";
import SecondPlayerPage from "./pages/SecondPlayerPage";

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
                    <Route path=":id/play2/:episode" element={<SecondPlayerPage/>}/>
                </Route>

                <Route path="/player">
                    <Route path="2/:orig/r/:releaseId" element={<KodikPlayerPage/>}/>
                    <Route path="2/:orig" element={<KodikPlayerPage/>}/>
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
