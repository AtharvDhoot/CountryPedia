import * as React from "react";
import { WorldMapPage } from "./world_map_page/WorldMapPage";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CountryPage } from "./country_page/CountryPage";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<WorldMapPage />}></Route>
          <Route path="/:countryIso" element={<CountryPage />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
