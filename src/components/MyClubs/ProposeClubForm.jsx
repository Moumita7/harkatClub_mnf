import React, { useState, useEffect } from "react";
import { useGetHatkatDataNewQuery } from "../../app/EndPoints/HarkatClub";
import close from "../../assets/close.png";
import { config, Url, accessToken } from "../../components/myServer";

const ProposeClubForm = () => {
  const closeFormPopup = () => {
    document.querySelector(".form-container").style.display = "none";
    document.querySelector(".dark-background").style.display = "none";
  };

  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://battuta.medunes.net/api/country/all/?key=00000000000000000000000000000000"
        );

        const data = await response.json();
        setCountries(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const handleCountryChange = async (selectedCountryCode) => {
    try {
      const response = await fetch(
        `http://battuta.medunes.net/api/region/${selectedCountryCode}/all/?key=00000000000000000000000000000000`
      );

      const data = await response.json();
      setStates(data);
      setSelectedCountry(selectedCountryCode);
    } catch (error) {
      console.log(error);
    }
  };
  const handleStateChange = async (selectedState) => {
    try {
      const response = await fetch(
        `http://battuta.medunes.net/api/city/${selectedCountry}/search/?region=${selectedState}&key=00000000000000000000000000000000`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setCities(data);
    } catch (error) {
      console.log(error);
    }
  };

  const { data: clubss } = useGetHatkatDataNewQuery();

  useEffect(() => {
    if (clubss) {
      clubss.forEach((club, index) => {
        console.log(`club ${index + 1}:`, club?.club_id?.harkat_id);
      });
    }
  }, [clubss]);

  const handleSubmit = async (harkatId, formData) => {
    try {
      const response = await fetch(
        `https://mynextfilm.ai/harkat/harkat_join_request/${harkatId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({ harkat_id: harkatId, ...formData }),
        }
      );

      document.querySelector(".form-container").style.display = "none";
      document.querySelector(".dark-background").style.display = "none";
      console.log("Response:", response);
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  return (
    <>
      {clubss?.map((club, index) => (
        <form
          key={index}
          onSubmit={(e) => {
            e.preventDefault();
            const form = e.target;
            const formData = new FormData(form);
            const formObject = {};
            formData.forEach((value, key) => {
              formObject[key] = value;
            });
            handleSubmit(club?.club_id?.harkat_id, formObject);
          }}
        >
          <div className="form-container propose-club-form-popup">
            <div className="from-content">
              <div className="close" onClick={closeFormPopup}>
                <img src={close} alt="close" />
                <span>X</span>
              </div>
              <div className="drop-downs-container">
                <div className="drop-downs">
                  <p>Select Country</p>
                  <select
                    name="country"
                    id="country"
                    data-live-search="true"
                    required
                    onChange={(e) => handleCountryChange(e.target.value)}
                  >
                    <option value="" hidden>
                      -- Select Country --
                    </option>
                    {countries.map((country) => (
                      <option key={country.code} value={country.code}>
                        {country.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="drop-downs">
                  <p>Select State</p>
                  <select
                    name="state"
                    id="state"
                    required
                    onChange={(e) => handleStateChange(e.target.value)}
                  >
                    <option value="" hidden>
                      -- Select State --
                    </option>
                    {states.map((state) => (
                      <option key={state.region} value={state.region}>
                        {state.region}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="drop-downs">
                  <p>Select City</p>
                  <select name="city" id="city" required>
                    <option value="" hidden>
                      -- Select City --
                    </option>
                    {cities.map((city) => (
                      <option key={city.city} value={city.city}>
                        {city.city}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="form-details-container">
                <div className="form-details">
                  <p>Postal Code</p>
                  <input
                    type="number"
                    placeholder="1234"
                    name="postal_code"
                    required
                  />
                </div>
                <div className="form-details">
                  <p>Mobile No.</p>
                  <input
                    type="number"
                    placeholder="1234"
                    name="mobile_no"
                    required
                  />
                </div>
                <div className="form-details">
                  <p>Do you own any filmmaking equipment?</p>
                  <input
                    type="text"
                    placeholder="Type here"
                    name="equipments"
                    required
                  />
                </div>
                <div className="form-details">
                  <p>Why do you want to join (Club name)?</p>
                  <input
                    type="text"
                    placeholder="Type here"
                    name="join_reason"
                    required
                  />
                </div>
                <div className="form-details">
                  <p>
                    Do you have any experience in filmmaking? If yes, please
                    explain in brief.
                  </p>
                  <input
                    type="text"
                    placeholder="Type here"
                    name="film_exp"
                    required
                  />
                </div>
                <div className="form-details">
                  <p>
                    Do you have any experience of managing any club? If yes,
                    please specify the details.
                  </p>
                  <input
                    type="text"
                    placeholder="Type here"
                    name="club_exp"
                    required
                  />
                </div>
                <div className="form-details location-container">
                  <div>
                    <input type="checkbox" id="location" />
                    <label htmlFor="location">Share my location</label>
                  </div>
                  <button type="submit">Submit</button>
                </div>
              </div>
            </div>
          </div>
        </form>
      ))}
    </>
  );
};

export default ProposeClubForm;
