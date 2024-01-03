import React, { useEffect } from "react";
import { useContext } from "react";
import { useState } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { UserContext } from "../../App";
import { Url, config } from "../../MyServer";
import { Languages } from "../Shared/Languages";
import { Countries } from "../Shared/Countries";
import Loading from "../Shared/Loading";
import FindFriendCard from "../Friends/FindFriendCard";
import FriendCard from "../Friends/FriendCard";
import MessiahCard from "../Messiah/MessiahCard";
import HarkatCard from "./HarkatCard";

const HarkatAdministator = () => {
  const { userId } = useContext(UserContext);
  const [url, setUrl] = useState(`${Url}/rm/getLifeMembers`);

  const [data, setData] = useState([]);
  const [filter, setFilter] = useState({
    language: "",
    country: "",
    interest: "",
    skills_level: "",
  });

  const {
    isLoading,
    data: initialData = [],
    refetch,
  } = useQuery({
    queryKey: ["messiahs", url],
    queryFn: async () => {
      const response = await axios.get(url, config);
      return response.data;
    },
  });

  // creating copy of the main data
  useEffect(() => {
    if (initialData?.length > 0) {
      console.log("re initializing");
      setData(initialData);
    }
  }, [initialData]);

  // setting filter value
  const handleFilterData = (e) => {
    setFilter({
      ...filter,
      [e.target.name]: e.target.value,
    });
  };

  // setting filtered data
  useEffect(() => {
    if (initialData?.length > 0) {
      let filterData = initialData;

      if (filter.country) {
        filterData = filterData.filter(
          (item) =>
            item?.country?.toLowerCase() === filter?.country?.toLowerCase()
        );
        console.log(filterData);
      }
      setData(filterData);
    }
  }, [filter]);

  console.log("friends: ", data);
  return (
    <div className=" p-2 my-5 mx-7 rounded-lg border-2 border-gray-200 mt-2">
      <div className="flex justify-center">
        <span className="text-[24px] text-white text-center font-bold px-6 mt-3 py-2 rounded-full bg-[#33B0CA] mb-6">
          MNF Harkat administator
        </span>
      </div>
      {/* navbar section */}
      <div className="flex justify-center  gap-2 items-center border-b-2 mb-3 border-gray-300 pb-2">
        <select
          name="language"
          onChange={handleFilterData}
          className="select select-sm h-[40px] select-bordered  max-w-xs"
        >
          <option disabled selected>
            Language
          </option>
          {Object.keys(Languages)?.map((key, i) => (
            <option key={i} value={key}>
              {Languages[key]}
            </option>
          ))}
        </select>

        <select
          name="country"
          onChange={handleFilterData}
          className="select select-sm h-[40px] select-bordered  max-w-xs"
        >
          <option defaultValue={""} disabled selected>
            Country
          </option>
          <option value={""}>All</option>
          {Object.keys(Countries)?.map((key, i) => (
            <option key={i} value={Countries[key]}>
              {Countries[key]}
            </option>
          ))}
        </select>

        <select
          name="interest"
          onChange={handleFilterData}
          className="select select-sm h-[40px] select-bordered  max-w-xs"
        >
          <option value={""} disabled selected>
            Interests
          </option>
          <option value={""}>All</option>
          <option>Normal Apple</option>
          <option>Normal Orange</option>
          <option>Normal Tomato</option>
        </select>

        <select
          name="skills_level"
          onChange={handleFilterData}
          className="select  select-sm h-[40px]  select-bordered  max-w-xs"
        >
          <option value={""} disabled selected>
            Skills Level
          </option>
          <option value={""}>All</option>
          <option>Normal Apple</option>
          <option>Normal Orange</option>
          <option>Normal Tomato</option>
        </select>

        {/* searchbar */}
        <div className="relative border border-gray-200 rounded-lg w-[300px] max-w-lg">
          <input
            type="text"
            className="rounded-full p-2 w-full"
            placeholder="Search "
          />
          <button type="submit" className="absolute right-4 top-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* content section */}
      {isLoading ? (
        <Loading />
      ) : data?.length > 0 ? (
        <div className="flex flex-col justify-center">
          <div className="grid grid-cols-5 gap-3 mt-4">
            {data?.map((member, i) => (
              <HarkatCard key={i} member={member} />
            ))}
          </div>
        </div>
      ) : (
        <h1 className=" my-5 text-red-400">No Friends found!</h1>
      )}
    </div>
  );
};

export default HarkatAdministator;
