import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home/Home";
import DataSearch from "./components/DataSearch/DataSearch";
import 'flowbite';
import { DataAll } from "./components/DataAll/DataAll";
import DataOwn from "./components/DataOwn/DataOwn";
import Admin from "./components/Admin/Admin";
import Proba from "./components/Proba/proba";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/dataSearch" element={<DataSearch />} />
      <Route path="/dataAll" element={<DataAll />} />
      <Route path="/dataOwn" element={<DataOwn />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/proba" element={<Proba />} />
    </Routes>
  );
};

export default App;
