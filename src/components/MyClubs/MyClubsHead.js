import React, { useEffect, useState } from "react";
import SingleClub from "./SingleClub";
import MoreClub from "./MoreClub";
import NearByClub from "./NearByClub";
import { CiSearch } from "react-icons/ci";
import { useSelector } from "react-redux";
import axios from "axios";
import { config } from "../myServer";

const MyClubsHead = () => {
  const [activeComponent, setActiveComponent] = useState(1);




const [searchText, setSearchText] = useState('');
  const [originalData, setOriginalData] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);
  let [val,setVal]=useState(false)

  useEffect(() => {
    const fetchDataFromApi = async (apiEndpoint) => {
      try {
        const response = await axios.get(apiEndpoint,  config);
        return response.data;
      } catch (error) {
        console.error('Error fetching data from API:', error);
        throw error;
      }
    };

    const fetchDataFromAllApis = async () => {
      const apiEndpoints = [
        // 'https://jsonplaceholder.typicode.com/posts',
        // 'https://jsonplaceholder.typicode.com/comments',
        'https://mynextfilm.ai/harkat/get_user_club_data',
      ];

      try {
        const apiResults = await Promise.all(apiEndpoints.map(fetchDataFromApi));
        const consolidatedResults = apiResults.reduce((acc, result) => {
          return acc.concat(result);
        }, []);

        // Set both original data and filtered results
        setOriginalData(consolidatedResults);
        setFilteredResults(consolidatedResults);
      } catch (error) {
        console.error('Error fetching data from APIs:', error);
      }
    };

    fetchDataFromAllApis();
  }, []); // Run once when the component mounts


  // console.log("originalData",originalData[0].club_data)
  const handleButtonClick = () => {
    // Update results with filtered data based on the title
    const newFilteredResults = originalData[0]?.club_data?.filter((result) =>
    // console.log("originalDataaa",result.club_data.club_id)
      result?.club_id?.club_name.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredResults(newFilteredResults);

  };

  // const renderComponent = () => {
  //   switch (activeComponent) {
  //     case 1:
  //       return <SingleClub />;
  //     case 2:
  //       return <NearByClub />;
  //     case 3:
     
  //       return <MoreClub />;

  //     default:
  //       return null;
  //   }
  // };

console.log("filteredResults",filteredResults)
  const renderComponent = () => {
    switch (activeComponent) {
      case 1:
        return <SingleClub filteredResults={filteredResults} />;
      case 2:
        return <NearByClub  />;
      case 3:
        return <MoreClub  />;
      default:
        return null;
    }
  };

  return (
    <div className="container mt-2 px-10">
      <div className="flex justify-between space-x-4 relative">
        <div className="flex gap-20">
          <button
            className={`${
              activeComponent === 1 ? "text-[#33B0CA] " : ""
            } font-semibold text-[#4D4D4D] text-[18px] relative transition-all duration-500 ease-in-out`}
            onClick={() => setActiveComponent(1)}
          >
            Administered / Proposed by me
            {activeComponent === 1 && (
              <span className="border-b-2  border-[#33B0CA] absolute bottom-0 left-0 w-full transition-all duration-500 ease-in-out transform scaleX-0"></span>
            )}
          </button>
          <button
            className={`${
              activeComponent === 2 ? "text-[#33B0CA] " : ""
            } font-semibold text-[#4D4D4D] text-[18px] relative transition-all duration-500 ease-in-out`}
            onClick={() => setActiveComponent(2)}
          >
            My Other clubs
            {activeComponent === 2 && (
              <span className="border-b-2 border-[#33B0CA] absolute bottom-0 left-0 w-full transition-all duration-500 ease-in-out transform scaleX-0"></span>
            )}
          </button>
          <button
            className={`${
              activeComponent === 3 ? "text-[#33B0CA] " : ""
            } font-semibold text-[#4D4D4D] text-[18px] relative transition-all duration-500 ease-in-out`}
            onClick={() => setActiveComponent(3)}
          >
            More Clubs near me
            {activeComponent === 3 && (
              <span className="border-b-2 border-[#33B0CA] absolute bottom-0 left-0 w-full transition-all duration-500 ease-in-out transform scaleX-0"></span>
            )}
          </button>
        </div>
        <div className='flex justify-center items-center'>

{/* <input type="text" name="" id="" placeholder='Search' className=' border-t border-l border-b rounded-tl-md rounded-bl-md py-1 px-2 border-zinc-400' /> */}

  {/* <div className=' border-t border-r border-b p-2  border-zinc-400 rounded-tr-md rounded-br-md '>

<CiSearch/>
  </div> */}
        {/* <input
      
          type="text"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
            className="rounded-[57px] bg-headingBg py-2 px-4 border border-headingBg w-[214px] "
            placeholder="Search "
          />
          <button   
         onClick={handleButtonClick} 
         className="">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-[24px] h-[24px] ml-[-32px]"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              />
            </svg>
          </button> */}
</div>
      </div>
      <div className="mt-8">{renderComponent()}</div>
    </div>
  );
};

export default MyClubsHead;
