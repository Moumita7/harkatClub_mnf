import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import { useGetClubDataQuery } from "../../app/EndPoints/HarkatClub";
import PicturesLoading from "../isLoading/PicturesLoading";
import AllMembers from "../Members/AllMembers";
import HarkatCard from "../Harkat_administator/HarkatCard";
import RequestClub from "../MyClubs/RequestClub";
import MemberCard from "../Harkat_administator/MemberCard";

const Member = () => {
  const { id } = useParams();
  const [data, setData] = useState([]);

  const admin = useSelector((state) => state.admin.value);
  const clubMemberCheck = useSelector(
    (state) => state.clubcurrentmember.member_status
  );
  const { data: members, isLoading } = useGetClubDataQuery(id);
  const activeMembers = members.all_members.filter(
    (member) => member.member_status === "active"
  );

  console.log("id is w", id);
  return (
    <div>
      <div className="flex justify-center  gap-2 items-center mb-3 border-gray-300 pb-2"></div>
      <div className="flex flex-col justify-center">
        <div className="grid grid-cols-3 gap-3 mt-4 border">
          <MemberCard />
        </div>
      </div>
    </div>
  );
};

export default Member;
