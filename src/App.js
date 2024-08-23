import React from "react";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import UserList from "./components/users/UsersList";
import CreateUser from "./components/users/CreateUser";
import UpdateUser from "./components/users/UpdateUser";
import GenreList from "./components/genre/GenreList";
import GenreCreate from "./components/genre/GenreCreate";
import GenreEdit from "./components/genre/GenreEdit";
import GenreSeriesList from "./components/genresSeries/GenreSeriesList";
import GenreSeriesCreate from "./components/genresSeries/GenreSeriesCreate";
import SeriesList from "./components/series/SeriesList";
import SeriesCreate from "./components/series/SeriesCreate";
import SeriesEdit from "./components/series/SeriesEdit";
import SeasonsList from "./components/season/SeasonsList";
import SeasonCreate from "./components/season/SeasonCreate";
import SeasonEdit from "./components/season/SeasonEdit";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Link to="/">
          <h1>IPTV</h1>
        </Link>
        <nav>
          <button>
            <Link to="/users">Users</Link>
          </button>
          <button>
            <Link to="/genres">Genres</Link>
          </button>
          <button>
            <Link to="/genres-series">Genres-series</Link>
          </button>
          <button>
            <Link to="/series">Series</Link>
          </button>
          <button>
            <Link to="/seasons">Season</Link>
          </button>
        </nav>

        <Routes>
          <Route path="/users" exact element={<UserList />} />
          <Route path="/create" element={<CreateUser />} />
          <Route path="/update/:id" element={<UpdateUser />} />
          <Route path="/genres" element={<GenreList />} />
          <Route path="/genres/create" element={<GenreCreate />} />
          <Route path="/genres/update/:id" element={<GenreEdit />} />
          <Route path="/genres-series" element={<GenreSeriesList />} />
          <Route path="/genres-series/create" element={<GenreSeriesCreate />} />
          <Route path="/series" element={<SeriesList />} />
          <Route path="/series/create" element={<SeriesCreate />} />
          <Route path="/series/edit/:id" element={<SeriesEdit />} />
          <Route path="/seasons" element={<SeasonsList />} />
          <Route path="/seasons/create" element={<SeasonCreate />} />
          <Route path="/seasons/edit/:id" element={<SeasonEdit />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
