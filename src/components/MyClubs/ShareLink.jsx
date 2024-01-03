import React, { useEffect, useState } from "react";
import close from "../../assets/close.png";
import msg from "../../assets/msg.png";
import fb from "../../assets/fb.png";
import insta from "../../assets/insta.png";
import thread from "../../assets/thread.png";
import pinterest from "../../assets/pinterest.png";
import x from "../../assets/x.png";
import linkedin from "../../assets/linkedin.png";
import axios from "axios";
import { config } from "../myServer";
import { useGetClubMemberQuery, useGetHatkatDataNewQuery } from "../../app/EndPoints/HarkatClub";

const ShareLink = () => {
  const { data: clubsm } = useGetClubMemberQuery();

  const arr = clubsm || []

  let id = arr.id

  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://mynextfilm.ai/memberpage/centraldatabaseapi/${740}`, config);
        setData(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  const handleFbLink = () => {
    const inputElement = document.getElementById("textInput");
    const facebookLink = data.facebook_link;
    inputElement.value = facebookLink || '';
  };

  const handleInstaLink = () => {
    const inputElement = document.getElementById("textInput");
    const instagramLink = data.instagram_link;
    inputElement.value = instagramLink || '';
  };

  const handleALink = () => {
    const inputElement = document.getElementById("textInput");
    inputElement.value = "";
  };

  const handlePinLink = () => {
    const inputElement = document.getElementById("textInput");
    inputElement.value = "";
  };

  const handleXLink = () => {
    const inputElement = document.getElementById("textInput");
    const twitterLink = data.twitter_link;
    inputElement.value = twitterLink || '';
  };

  const handleLinkedInLink = () => {
    const inputElement = document.getElementById("textInput");
    const linkedinLink = data.linkedin_link;
    inputElement.value = linkedinLink || '';
  };


  const closeFormPopup = () => {
    document.querySelector(".share-link-container").style.display = "none";
    document.querySelector(".dark-background").style.display = "none";
  };

  const [inputText, setInputText] = useState("");

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  const handleCopyButtonClick = () => {
    const inputElement = document.getElementById("textInput");

    if (inputElement) {
      inputElement.select();
      document.execCommand("copy");
    }
  };

  return (
    <>
      <div className="form-container share-link-container">
        <div className="from-content share-linik-content">
          <div className="close" onClick={closeFormPopup}>
            <img src={close} alt="close" />
            <span>X</span>
          </div>

          <div className="msg-container">
            <div>
              <img src={msg} alt="msg" />
              <p>Share link with MNF Members</p>
            </div>
          </div>

          <div className="social-icons-container">
            <div>
              <img src={fb} alt="fb" onClick={handleFbLink} />
              <img src={insta} alt="insta" onClick={handleInstaLink} />
              <img src={thread} alt="a" onClick={handleALink} />
              <img src={pinterest} alt="pintereset" onClick={handlePinLink} />
              <img src={x} alt="x" onClick={handleXLink} />
              <img src={linkedin} alt="linkedin" onClick={handleLinkedInLink} />
            </div>
          </div>

          <div className="share-link">
            <input
              type="url"
              id="textInput"
              value={inputText}
              onChange={handleInputChange}
              placeholder="Your Link..."
            />
            <button onClick={handleCopyButtonClick}>Copy Link</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ShareLink;
