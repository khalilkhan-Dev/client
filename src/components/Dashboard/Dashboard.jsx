import React from "react";
import { Routes, Route, Outlet } from "react-router-dom";
import './Dashboard.css';

import UserList from "../users/UsersList";
import CreateUser from "../users/CreateUser";
import UpdateUser from "../users/UpdateUser";
import GenreList from "../genre/GenreList";
import GenreCreate from "../genre/GenreCreate";
import GenreEdit from "../genre/GenreEdit";
import GenreSeriesList from "../genresSeries/GenreSeriesList";
import GenreSeriesCreate from "../genresSeries/GenreSeriesCreate";
import SeriesList from "../series/SeriesList";
import SeriesCreate from "../series/SeriesCreate";
import SeriesEdit from "../series/SeriesEdit";
import SeasonsList from "../season/SeasonsList";
import SeasonCreate from "../season/SeasonCreate";
import SeasonEdit from "../season/SeasonEdit";
import Navbar from "../Navbar/Navbar";
import Sidebar from "../Sidebar/Sidebar";

const Dashboard = () => {
  return (
    <>
      <Navbar />
      <div className="dashboard" style={{ height: "calc(100vh - 70px)" }}>
        <div className="sidebar">
          <Sidebar />
        </div>
        <div className="main">
          <div className="bg-white h-100 rounded p-1">
            <Routes>
              <Route path="/" element={<Outlet />}>
                <Route path="users" element={<UserList />} />
                <Route path="create" element={<CreateUser />} />
                <Route path="update/:id" element={<UpdateUser />} />
                <Route path="genres" element={<GenreList />} />
                <Route path="genres/create" element={<GenreCreate />} />
                <Route path="genres/update/:id" element={<GenreEdit />} />
                <Route path="genres-series" element={<GenreSeriesList />} />
                <Route path="genres-series/create" element={<GenreSeriesCreate />} />
                <Route path="series" element={<SeriesList />} />
                <Route path="series/create" element={<SeriesCreate />} />
                <Route path="series/edit/:id" element={<SeriesEdit />} />
                <Route path="seasons" element={<SeasonsList />} />
                <Route path="seasons/create" element={<SeasonCreate />} />
                <Route path="seasons/edit/:id" element={<SeasonEdit />} />
              </Route>
            </Routes>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
