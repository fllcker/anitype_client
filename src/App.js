import TestPage from "./pages/TestPage";
import {Route, Routes} from "react-router-dom";
import Header from "./components/Header";
import SearchPage from "./pages/SearchPage";
import ReleasePage from "./pages/ReleasePage";

function App() {
    return (
        <>
            <Header/>
            <Routes>
                <Route path="/test" element={<TestPage/>}/>

                <Route path="/search" element={<SearchPage/>}/>

                <Route path="/release">
                    <Route path=":id" element={<ReleasePage/>}/>
                </Route>
            </Routes>
        </>
    );
}

export default App;
