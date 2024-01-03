import React, { useEffect, useState } from "react";
import close from "../../assets/close.png";
import { config } from "../myServer";
import axios from "axios";
import { toast } from "react-toastify";

const ViewAppPopup = ({harkat,member,fetchDataFun}) => {
    console.log("h",harkat,"m",member)

    let [data,setData]=useState([])
    const closeFormPopup = () => {
        document.querySelector(".view-app-container").style.display = "none";
        document.querySelector(".dark-background").style.display = "none";
    };


//    let api=`https://mynextfilm.ai/harkat/view_application/2171d54c-2319-4b31-b086-e22b1d6e1816/10`
let api=`https://mynextfilm.ai/harkat/view_application/${harkat}/${member}`


   useEffect(() => {
    const fetchData = async () => {
        console.log("call function")
      try {
        const response = await axios.get(api, config);
        // setData(response.data);
        console.log("ressDataaaaaaaa", response.data);
    
        setData( [response.data])
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [harkat,member]);


  const handleAcept = async (id) => {
    try {
    
      const response = await axios.get(`https://mynextfilm.ai/harkat/accept_join_request/${id}`,config);

      console.log('acepted data:', response.data);
      toast.success("Request Acepted", {
        position: toast.POSITION.BOTTOM_CENTER
    });
    closeFormPopup()
      fetchDataFun()

    } catch (error) {
      console.error('Error deleting data:', error);
      toast.error(`${error}`, {
        position: toast.POSITION.BOTTOM_CENTER
    });

    }
  };
  const handleReject = async (id) => {
    try {
    
      const response = await axios.get(`https://mynextfilm.ai/harkat/reject_join_request/${id}`,config);

      console.log('Delete Response:', response.data);
    //   fetchData()
    toast.success("Request Rejected", {
      position: toast.POSITION.BOTTOM_CENTER
  });
  closeFormPopup()
    fetchDataFun()
      
      // setMemberData(response.data)

    } catch (error) {
      console.error('Error deleting data:', error);
      toast.error(`${error}`, {
        position: toast.POSITION.BOTTOM_CENTER
    });

    }
  };

  console.log("vieww",[data])
    return <>
        <div className="view-app-container">
            {data.map((ele)=>(
                  <div className="view-app-content">
                  <div className="close" onClick={closeFormPopup}>
                      <img src={close} alt="close" />
                      <span>X</span>
                  </div>
                  <div className="club-names-container">
                      <p>Administrator of <span>(Club Name)</span></p>
                      <p>Member of <span>(Club Name), (Club Name 2)...</span></p>
                      <p>Requested to join <span>(Club Name), (Club Name 2)...</span></p>
                  </div>
                  <div className="personal-details-container">
                      <div>
                          <p>Mobile No.</p>
                          <p>Address</p>
                      </div>
                      <div>
                          {/* <input type="number" placeholder="+91 9999999999"  /> */}
                          <input type="number" placeholder="+91 9999999999" value={ele.join_request_data.mobile_no} />

                          <p>Delhi - 121912 (India)</p>
                          <p>Within 5 km View Location</p>
                      </div>
                  </div>
                  <div className="sub-details-container">
                      <p>Do you own any filmmaking equipment?</p>
                      <div>
                          <p>{ele.join_request_data.equipments}</p>
                          {/* <p>2. Tripod</p>
                          <p>3. Collar Mic</p>
                          <p>4. Clap Board</p> */}
                      </div>
                  </div>
                  <div className="sub-details-container">
                      <p>Why do you want to join (Club Name)?</p>
                      <div>
                        <p>{ele.join_request_data.join_reason}</p>
                          {/* <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Hic, ducimus dolorem esse molestiae corporis dolor nulla asperiores? Earum reiciendis iusto eligendi dolorum corporis totam libero officiis soluta sunt in, quas dignissimos eveniet, iste placeat tenetur laudantium deserunt beatae id eum ut exercitationem debitis quod consequuntur voluptates! Officiis veniam incidunt culpa.</p> */}
                      </div>
                  </div>
                  <div className="sub-details-container">
                      <p>Do you have any pnor experience in filmmaking? If yes, please explain in brief.</p>
                      <div>
                        <p>{ele?.join_request_data?.film_exp}</p>
                          {/* <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Hic, ducimus dolorem esse molestiae corporis dolor nulla asperiores? Earum reiciendis iusto eligendi dolorum corporis totam libero officiis soluta sunt in, quas dignissimos eveniet, iste placeat tenetur laudantium deserunt beatae id eum ut exercitationem debitis quod consequuntur voluptates! Officiis veniam incidunt culpa.</p> */}
                      </div>
                  </div>
                  <div className="sub-details-container">
                      <p>Do you have any experience of managing any club? If yes please describe the details.</p>
                      <div>
                          {/* <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Hic, ducimus dolorem esse molestiae corporis dolor nulla asperiores? Earum reiciendis iusto eligendi dolorum corporis totam libero officiis soluta sunt in, quas dignissimos eveniet, iste placeat tenetur laudantium deserunt beatae id eum ut exercitationem debitis quod consequuntur voluptates! Officiis veniam incidunt culpa.</p> */}
                      </div>
                  </div>
                  <div className="buttons-container">
                      <div>
                          <button className="send-msg-btn">Send Message</button>
                          <button className="view-profile-btn">View Profile</button>
                      </div>
                      <div>
                          <button className="accept-btn" onClick={()=>handleAcept(ele?.join_request_data?.member_Club_id)}>Accept</button>
                          <button className="reject-btn" onClick={()=>handleReject(ele?.join_request_data?.member_Club_id)}>Reject</button>
                      </div>
                  </div>
                </div>

          ))}  
      

       
          
        </div>
    </>
}

export default ViewAppPopup;