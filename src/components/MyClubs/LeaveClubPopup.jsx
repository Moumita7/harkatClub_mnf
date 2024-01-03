import React, { useState } from "react";

const LeaveClubPopup = () => {
    const closeLeavePopup = () => {
        document.querySelector(".leave-container").style.display = "none";
        document.querySelector(".dark-background").style.display = "none";
      };

    return (
        <>
            <div className="form-container leave-container">
                <div className="from-content deactivate-content">
                    <h2>Are you sure you want to Leave this club?</h2>
                    <button className="yes">Yes</button>
                    <button className="no" onClick={closeLeavePopup}>No</button>
                </div>
            </div>
        </>
    )
}

export default LeaveClubPopup;