import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import HomePage from "./components/pages/HomePage";
import CoinPage from "./components/pages/CoinPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <div className="app">
          <Header />
          <Routes>
            <Route path="/" Component={HomePage} exact />
            <Route path="/coins/:id" Component={CoinPage} />
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
