import { useLocation } from "react-router-dom";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";

import { useNavigate } from "react-router-dom";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";

export function CountryPage() {
  const location = useLocation();
  const country = location.state[0];
  const navigate = useNavigate();

  return (
    <div className="flex flex-col h-screen justify-between">
      <Header />
      <div className="mb-auto container mx-auto h-full">
        <button className="btn mt-16 mx-4 md:mx-0" onClick={() => navigate(-1)}>
          <ArrowBackIosNewIcon /> Back
        </button>
        <div className="grid grid-cols-1 h-5/6 md:grid-cols-2">
          <img
            src={country.flags.svg}
            alt={country.flags.alt}
            className="h-full items-center py-12 md:py-32"
          />
          <div className="h-full items-center">
            <h1 className="text-4xl font-extrabold mt-40 text-center">
              {country?.name.common}
            </h1>
            <div className="grid grid-cols-1 mt-4 text-lg text-center lg:grid-cols-2">
              <div className="grid gap-8 mx-12">
                <p>
                  <span className="font-bold">Capital: </span>
                  {country?.capital}
                </p>
                <p>
                  <span className="font-bold">Side of driving: </span>
                  {country?.car?.side}
                </p>
                <p>
                  <span className="font-bold">Continent(s): </span>
                  {country?.continents
                    ?.map((conti) => {
                      return `${conti}`;
                    })
                    .join(", ")}
                </p>
                <p>
                  <span className="font-bold">Landlocked: </span>
                  {country?.landlocked ? "Yes" : "No"}
                </p>
                <p>
                  <span className="font-bold">Population: </span>
                  {country?.population}
                </p>
              </div>
              <div className="grid gap-8 mx-12">
                <p>
                  <span className="font-bold">Currencies: </span>
                  {Object.values(country?.currencies)
                    .map((currency) => {
                      return `${currency.name} (${currency.symbol})`;
                    })
                    .join(", ")}
                </p>
                <p>
                  <span className="font-bold">Language(s): </span>
                  {Object.values(country?.languages)
                    .map((language) => {
                      return `${language}`;
                    })
                    .join(", ")}
                </p>
                <p>
                  <span className="font-bold">Top Level Domain(s): </span>
                  {country?.tld
                    .map((tld) => {
                      return `${tld}`;
                    })
                    .join(", ")}
                </p>
                <p>
                  <span className="font-bold">UN Member: </span>
                  {country?.unMember ? "Yes" : "No"}
                </p>
                <p>
                  <span className="font-bold">Sub Region: </span>
                  {country?.subregion}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
