import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Shell } from "./components/Shell";
import { MovieListPage } from "./pages/MovieListPage";
import { MovieDetailPage } from "./pages/MovieDetailPage";

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Shell />}>
          <Route path="/" element={<MovieListPage />} />
          <Route path="/movies/:id" element={<MovieDetailPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;