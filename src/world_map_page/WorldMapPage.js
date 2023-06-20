import React, { useState, useRef, useEffect } from "react";
import WorldMap from "react-svg-worldmap";

import { ReactSearchAutocomplete } from "react-search-autocomplete";
import { useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";

import { useGetCountriesQuery } from "../features/api/apiSlice";
import { Spinner } from "../components/Spinner";
import { Iso } from "../components/Iso";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";

export function WorldMapPage() {
  const data = Iso;
  const navigate = useNavigate();

  const {
    data: countries,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetCountriesQuery();

  const getThemeInStorage = () => {
    localStorage.getItem("theme");
  };

  const [isSearchVisible, setSearchVisible] = useState(false);

  const handleSearchClick = () => {
    setSearchVisible(true);
  };

  const handleSearchClose = () => {
    setSearchVisible(false);
  };

  function useOutsideAlerter(ref) {
    useEffect(() => {
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          handleSearchClose();
        }
      }
      function handleEsc(event) {
        if (event.key === "Escape") {
          handleSearchClose();
        }
      }
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleEsc);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
        document.removeEventListener("keydown", handleEsc);
      };
    }, [ref]);
  }

  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef);

  return (
    <div>
      <Header />
      <div className="container m-auto">
        <button
          className="absolute top-20 left-8 btn btn-circle btn-outline md:left-32"
          onClick={handleSearchClick}
        >
          <SearchIcon />
        </button>
        <div className="grid place-items-center">
          {isLoading && <Spinner text="Loading..." />}
          {isSuccess && (
            <div>
              <WorldMap
                backgroundColor={getThemeInStorage === "dark" ? "#1d232a" : ""}
                size="xxl"
                data={data}
                onClickFunction={(e) => {
                  const country = countries.filter((c) => {
                    return c.cca2 === e.countryCode;
                  });
                  navigate(`/CountryPedia/${country[0].name.common}`, {
                    state: country,
                  });
                }}
              />
              {isSearchVisible && (
                <div className="absolute inset-0 flex justify-center items-center z-10 backdrop-filter backdrop-blur-sm">
                  <div ref={wrapperRef} className="w-full max-w-xs">
                    <ReactSearchAutocomplete
                      items={countries.map((country, id) => {
                        return {
                          id: id,
                          ...country,
                          countryName: country.name.common,
                        };
                      })}
                      fuseOptions={{
                        keys: ["countryName"],
                        threshold: 0.0,
                      }}
                      resultStringKeyName="countryName"
                      autoFocus
                      className="w-full max-w-xs"
                      onSelect={(item) => {
                        navigate(`/CountryPedia/${item.cca2}`, {
                          state: [item],
                        });
                      }}
                    />
                    <p className={`mt-2 text-center text-lg font-bold`}>
                      Click anywhere to go back
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}
          {isError && <div>{error.toString()}</div>}
        </div>
      </div>
      <Footer />
    </div>
  );
}
