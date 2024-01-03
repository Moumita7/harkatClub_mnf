import React, { useState, useEffect } from "react";
import { config, Url, accessToken } from "../../components/myServer";
import { LuCalendarClock } from "react-icons/lu";
import { FaLocationDot } from "react-icons/fa6";
import { FaLanguage } from "react-icons/fa";
import { IoIosPeople } from "react-icons/io";
import { FaPeopleGroup } from "react-icons/fa6";
import { FaRegShareSquare } from "react-icons/fa";
import { useParams } from "react-router";
import {
  useGetClubDataQuery,
  useGetHatkatDataNewQuery,
} from "../../app/EndPoints/HarkatClub";
import { MdOutlineEdit } from "react-icons/md";
const SingleHarkatPage = () => {
  const { id } = useParams();
  const [selectedTab, setSelectedTab] = useState("about");

  const [formData, setFormData] = useState({
    // memberOfFilmMakingGroup: "",
    // ScriptWriting: false,
    // Acting: false,
    // Directing: false,
    // ProducingFilms: false,
    // Editing: false,
    // Animations: false,

    memberOfFilmMakingGroup: "yes",
  });

  const handleTabClick = (tab) => {
    setSelectedTab(tab);
  };

  const { data: club, isLoading } = useGetClubDataQuery(id);

  // const handleChange = (e) => {
  //   // const { name, value } = e.target;
  //   console.log("event", e.target.name);
  //   console.log("event val", e.target.value);

  //   // setFormData({ ...formData, [name]: value });
  // };

  // const handleChange = (e) => {
  //   const { name, type, value, checked } = e.target;
  //   // If it's a checkbox, update its checked status; otherwise, update its value
  //   const newValue = type === "checkbox" ? checked : value;
  //   setFormData((prevData) => ({
  //     ...prevData,
  //     [name]: newValue,
  //   }));
  // };

  const onSubmitHandle = (e) => {
    e.preventDefault();

    fetch(
      `https://mynextfilm.ai/harkat/edit_club_details/e06e073a-825f-4d60-b5c0-8168e02e99f3`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(formData),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log("Data updated successfully:", data);
      })
      .catch((error) => {
        console.error("Error updating data:", error);
      });
  };

  // -----------------------------------------
  const [fetData, setFetchData] = useState({
    interests: ", , , , , Animation",
    skills: "Expert",
    equipments: "Professional Camera, , , , ,  ",
    genres: "Action, , , , , , , , ,  ",
    managementSkills: "Excellent",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://mynextfilm.ai/harkat/edit_club_details/e06e073a-825f-4d60-b5c0-8168e02e99f3"
        );

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const data = await response.json();
        setFetchData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleChange = (event) => {
    const { name } = event.target;

    // Clone the current state to avoid mutating it directly
    const updatedClub = { ...fetData };

    // Toggle the status of the checkbox
    if (updatedClub.interests.includes(name)) {
      updatedClub.interests = updatedClub.interests.replace(`${name},`, "");
    } else {
      updatedClub.interests += `${name},`;
    }

    // Update the state with the new club data
    setFetchData(updatedClub);
  };

  const handleShareLink = () => {
    document.querySelector(".share-link-container").style.display = "block";
    document.querySelector(".dark-background").style.display = "block";
    console.log("clicked")
  }

  return (
    <div className="w-[100%] ">
      <div className=" mt-3 w-[100%] flex justify-between  ">
        <div className="ml-10">
          <h3 className="text-xl font-bold mb-2">
            {club?.club?.club_id?.club_name}
          </h3>
          <div className=" flex flex-col gap-3  text-colorGray">
            <div className="flex items-center gap-3 ">
              <LuCalendarClock />
              <p>
                {club?.club?.club_id?.activation_date
                  .split("T")[0]
                  .split("-")
                  .reverse()
                  .join("-")}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <FaLocationDot />
              <p>{club?.club?.club_id?.club_state}</p>
            </div>
            <div className="flex items-center  gap-3">
              <FaLanguage />
              <p>{club?.club?.club_id?.club_language}</p>
            </div>
            <div className="flex gap-3">
              <FaPeopleGroup />
              <p>{`${club?.club?.club_id?.activities} Activity per month`}</p>
            </div>
            <div className="flex gap-3">
              <IoIosPeople />
              <div className="flex gap-3">
                <div>
                  <p>Min</p>
                  <p>{club?.club?.club_id?.min_member}</p>
                </div>
                <div>
                  <p>Max</p>
                  <p>{club?.club?.club_id?.max_member}</p>
                </div>
                <div>
                  <p>Current</p>
                  {club?.club?.club_id?.current_member ? (
                    <p>{club?.club?.club_id?.current_member}</p>
                  ) : (
                    <p>0</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="  w-[30%]  pl-[110px]">
          <div className="flex mt-3 gap-3 cursor-pointer" onClick={handleShareLink}>
            <p>Share Link</p>
            <div className="mt-1">
              <FaRegShareSquare />
            </div>
          </div>
        </div>
      </div>

      <div className=" ml-9  w-[80%] text-colorGray">
        <h2 className="mt-5 text-base text-colorButton">Vision</h2>
        <p className="text-sm">{club?.club?.club_id?.club_vision}</p>
        <h2 className="mt-5 text-base text-colorButton">Club Description</h2>
        <p className="text-sm">
          {club?.club?.club_id?.club_description ? (
            <p>{club?.club?.club_id?.club_description}</p>
          ) : (
            <p>N/A</p>
          )}
        </p>
        <h2 className="mt-5 text-base text-colorButton">Unique Features</h2>
        <p className="text-sm">{club?.club?.club_id?.feactures}</p>
      </div>
      <form onSubmit={onSubmitHandle}>
        <div className="ml-9 text-colorBlack">
          <p className="mt-2 mb-1">
            Are you a member of another film-making group?
          </p>
          <label className="mr-2">
            <input
              type="radio"
              name="memberOfFilmMakingGroup"
              value="yes"
              checked={formData.memberOfFilmMakingGroup == "yes"}
              onChange={handleChange}
            />{" "}
            Yes{" "}
          </label>
          <label className="mr-2">
            <input
              type="radio"
              name="memberOfFilmMakingGroup"
              value="no"
              checked={formData.memberOfFilmMakingGroup == "no"}
              onChange={handleChange}
            />
            No
          </label>
          <p className="mt-2 mb-1">What are your interests in Film-making?</p>
          <label className="mr-2">
            <input
              type="checkbox"
              onChange={handleChange}
              name="ScriptWriting"
              checked={club?.club?.club_id?.interests?.includes(
                "ScriptWriting"
              )}
            />
            Script Writing
          </label>
          <label className="mr-2">
            <input
              type="checkbox"
              onChange={handleChange}
              name="Acting"
              checked={club?.club?.club_id?.interests?.includes("Acting")}
            />
            Acting
          </label>
          <label className="mr-2">
            <input
              type="checkbox"
              onChange={handleChange}
              name="Directing"
              checked={club?.club?.club_id?.interests?.includes("Directing")}
            />
            Directing
          </label>
          <label className="mr-2">
            <input
              type="checkbox"
              name="ProducingFilms"
              onChange={handleChange}
              checked={club?.club?.club_id?.interests?.includes(
                "ProducingFilms"
              )}
            />
            Producing Films
          </label>
          <label className="mr-2">
            <input
              type="checkbox"
              name="Editing"
              onChange={handleChange}
              checked={club?.club?.club_id?.interests?.includes("Editing")}
            />
            Editing
          </label>
          <label className="mr-2">
            <input
              type="checkbox"
              name="Animations"
              onChange={handleChange}
              checked={club?.club?.club_id?.interests?.includes("Animation")}
            />
            Animations
          </label>
          <p className="mt-2 mb-1">
            How much area is avilable for club activities?
          </p>
          <label className="mr-2">
            <input type="checkbox" />
            None
          </label>
          <label className="mr-2">
            <input type="checkbox" />
            Upto 200 sft
          </label>
          <label className="mr-2">
            <input type="checkbox" />
            200-500 sft
          </label>
          <label className="mr-2">
            <input type="checkbox" />
            More than 500 dft
          </label>
          <p className="mt-2 mb-1">
            Which Equipments do you have that can be used for club activites?
          </p>
          <label className="mr-2">
            <input
              type="checkbox"
              name="ProfessionalCamera"
              checked={club?.club?.club_id?.equipments?.includes(
                "Professional Camera"
              )}
            />
            Professional Camera
          </label>
          <label className="mr-2">
            <input
              type="checkbox"
              name="AmateurCamera"
              checked={club?.club?.club_id?.equipments?.includes(
                "Amateur Camera"
              )}
            />
            Amateur Camera
          </label>
          <label className="mr-2">
            <input
              type="checkbox"
              name="Tripod"
              checked={club?.club?.club_id?.equipments?.includes("Tripod")}
            />
            Tripod
          </label>
          <label className="mr-2">
            <input
              type="checkbox"
              name="Lights"
              checked={club?.club?.club_id?.equipments?.includes("Lights")}
            />
            Lights
          </label>
          <label className="mr-2">
            <input
              type="checkbox"
              name="SoundRecorder"
              checked={club?.club?.club_id?.equipments?.includes(
                "Sound Recorder"
              )}
            />
            Sound Recoder
          </label>
          <label className="mr-2">
            <input
              type="checkbox"
              name="EditingFacility"
              checked={club?.club?.club_id?.equipments?.includes(
                "Editing Facility"
              )}
            />
            Editing Facility
          </label>
          <label className="mr-2">
            <input
              type="checkbox"
              checked={club?.club?.club_id?.equipments?.includes("others")}
            />
            Others
          </label>
          <p className="mt-2 mb-1">What are your prefered genres in Films?</p>
          <label className="mr-2">
            <input
              type="checkbox"
              name="Action"
              checked={club?.club?.club_id?.genres?.includes("Action")}
            />
            Action
          </label>
          <label className="mr-2">
            <input
              type="checkbox"
              name="Adventure"
              checked={club?.club?.club_id?.genres?.includes("Adventure")}
            />
            Adventure
          </label>
          <label className="mr-2">
            <input
              type="checkbox"
              name="Crime"
              checked={club?.club?.club_id?.genres?.includes("Crime")}
            />
            Crime
          </label>
          <label className="mr-2">
            <input
              type="checkbox"
              name="Comedy"
              checked={club?.club?.club_id?.genres?.includes("Comedy")}
            />
            Comedy
          </label>
          <label className="mr-2">
            <input
              type="checkbox"
              name="Drama"
              checked={club?.club?.club_id?.genres?.includes("Drama")}
            />
            Drama
          </label>
          <label className="mr-2">
            <input
              type="checkbox"
              name="Fantasy"
              checked={club?.club?.club_id?.genres?.includes("Fantasy")}
            />
            Fantasy
          </label>
          <label className="mr-2">
            <input
              type="checkbox"
              name="Horror"
              checked={club?.club?.club_id?.genres?.includes("Horror")}
            />
            Horror
          </label>
          <label className="mr-2">
            <input
              type="checkbox"
              value="Romantic"
              checked={club?.club?.club_id?.genres?.includes("Romantic")}
            />
            Romantic
          </label>
          <label className="mr-2">
            <input
              type="checkbox"
              name="Sci_fi"
              checked={club?.club?.club_id?.genres?.includes("Sci_fi")}
            />
            Sci_fi
          </label>
          <label className="mr-2">
            <input
              type="checkbox"
              name="Thriller"
              checked={club?.club?.club_id?.genres?.includes("Thriller")}
            />
            Thriller
          </label>
          <p className="mt-2 mb-1">What is your Skill level in film-making?</p>
          <label className="mr-2">
            <input
              type="checkbox"
              name="skills"
              checked={club?.club?.club_id?.skills?.includes("Aspirant")}
            />
            Aspirant
          </label>
          <label className="mr-2">
            <input
              type="checkbox"
              name="skills"
              checked={club?.club?.club_id?.skills?.includes("Enthusiast")}
            />
            enthusiast
          </label>
          <label className="mr-2">
            <input
              type="checkbox"
              name="skills"
              checked={club?.club?.club_id?.skills?.includes("Amateur")}
            />
            Amateur
          </label>
          <label className="mr-2">
            <input
              type="checkbox"
              name="skills"
              checked={club?.club?.club_id?.skills?.includes("Professional")}
            />
            Professional
          </label>
          <label className="mr-2">
            <input
              type="checkbox"
              name="skills"
              checked={club?.club?.club_id?.skills?.includes("Expert")}
            />
            Expert
          </label>
          <p className="mt-2 mb-1">How strong are you management skills?</p>
          <label className="mr-2">
            <input
              type="radio"
              name="managementSkills"
              checked={club?.club?.club_id?.managementSkills?.includes(
                "Excellent"
              )}
            />
            Excellent
          </label>
          <label className="mr-2">
            <input
              type="radio"
              name="managementSkills"
              checked={club?.club?.club_id?.managementSkills?.includes("Good")}
            />
            Good
          </label>
          <label className="mr-2">
            <input
              type="radio"
              name="managementSkills"
              checked={club?.club?.club_id?.managementSkills?.includes(
                "Average"
              )}
            />
            Aaverage
          </label>
        </div>
        <div className="flex justify-end mr-20">
          <button className="border border-colorButton rounded-md  px-4 py-1 flex justify-center items-center mb-4 gap-2 text-colorButton">
            <p>
              <MdOutlineEdit />
            </p>{" "}
            Edit
          </button>
        </div>
      </form>
    </div>
  );
};

export default SingleHarkatPage;
