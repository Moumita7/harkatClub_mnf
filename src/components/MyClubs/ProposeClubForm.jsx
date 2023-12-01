import React from "react";
import close from "../../assets/close.png";

const ProposeClubForm = () => {
  const closeFormPopup = () => {
    document.querySelector(".form-container").style.display = "none";
  };

  return (
    <>
      <div className="form-container">
        <div className="from-content">
          <div className="close" onClick={closeFormPopup}>
            <img src={close} alt="close" />
            <span>X</span>
          </div>
          <div className="drop-downs-container">
            <div className="drop-downs">
              <p>
                Select Country <span>*</span>{" "}
              </p>
              <select name="" id="">
                <option value="">-- Select Country --</option>
                <option value="">India</option>
              </select>
            </div>

            <div className="drop-downs">
              <p>
                Select State <span>*</span>
              </p>
              <select name="" id="">
                <option value="">-- Select State --</option>
                <option value="">Delhi</option>
              </select>
            </div>

            <div className="drop-downs">
              <p>
                Select City <span>*</span>
              </p>
              <select name="" id="">
                <option value="">-- Select City --</option>
                <option value="">Delhi</option>
              </select>
            </div>
          </div>
          <div className="form-details-container">
            <div className="form-details">
              <p>Postal Code</p>
              <input type="number" placeholder="1234" />
            </div>
            <div className="form-details">
              <p>Mobile No.</p>
              <input type="number" placeholder="1234" />
            </div>
            <div className="form-details">
              <p>Do you own any filmmaking equipment?</p>
              <input type="text" placeholder="Type here" />
            </div>
            <div className="form-details">
              <p>Why do you want to join (Club name)?</p>
              <input type="text" placeholder="Type here" />
            </div>
            <div className="form-details">
              <p>
                Do you have any experience in filmmaking? If yes, please explain
                in brief.
              </p>
              <input type="text" placeholder="Type here" />
            </div>
            <div className="form-details">
              <p>
                Do you have any experience of managing any club? If yes, please
                specify the details.
              </p>
              <input type="text" placeholder="Type here" />
            </div>
            <div className="form-details location-container">
              <div>
                <input type="checkbox" id="location" />
                <label htmlFor="location">Share my location</label>
              </div>
              <button>Submit</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProposeClubForm;
