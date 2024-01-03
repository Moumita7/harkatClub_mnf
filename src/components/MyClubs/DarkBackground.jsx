import React from "react";

const DarkBackground = () => {
  const closeOpenedPopup = () => {
    document.querySelector(".dark-background").style.display = "none";
    document.querySelector(".form-container").style.display = "none";
    document.querySelector(".leave-container").style.display = "none";
    document.querySelector(".deactivate-container").style.display = "none";
    document.querySelector(".share-link-container").style.display = "none";
    document.querySelector(".view-app-container").style.display = "none";
  };
  return <div className="dark-background" onClick={closeOpenedPopup}></div>;
};

export default DarkBackground;
