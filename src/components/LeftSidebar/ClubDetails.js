import React, { useState } from 'react';
import CreateClubDetails from './CreateClubDetails.jsx';
import ExistingClubDetails from './ExistingClubDetails';

const ClubDetails = () => {
  const [isCreateClubDetails, setIsCreateClubDetails] = useState(false);
  const [isExistingClubDetails, setIsExistingClubDetails] = useState(true);

  return (
    <div>
      {isCreateClubDetails && (
        <CreateClubDetails
          setIsCreateClubDetails={setIsCreateClubDetails}
          setIsExistingClubDetails={setIsExistingClubDetails}
        />
      )}
      {isExistingClubDetails && (
        <ExistingClubDetails
          setIsCreateClubDetails={setIsCreateClubDetails}
          setIsExistingClubDetails={setIsExistingClubDetails}
        />
      )}
    </div>
  );
};

export default ClubDetails;



