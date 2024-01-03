import React from "react";

const DarkBackground2 = () => {
  const closeOpenedPopup = () => {
    document.querySelector(".dark-background-2").style.display = "none";
    document.querySelector(".form-container").style.display = "none";
    document.querySelector(".leave-container").style.display = "none";
    document.querySelector(".deactivate-container").style.display = "none";
    document.querySelector(".share-link-container").style.display = "none";
    document.querySelector(".view-app-container").style.display = "none";
  };
  return <div className="dark-background-2" onClick={closeOpenedPopup}></div>;
};

export default DarkBackground2;
