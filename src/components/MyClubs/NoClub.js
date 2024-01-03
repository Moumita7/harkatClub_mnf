import React from 'react'

const NoClub = () => {
  function handleClick(){
    alert("Comming Soon");
}
  return (
    <div>
       <div style={{fontWeight:"bolder",color:"#ED3344",fontSize:"25px"}}>YOU HAVE NEITHER PROPOSED NOR JOINED ANY CLUB</div>
              <p style={{fontWeight:"bolder",color:"#ED3344",fontSize:"20px"}}>Please Propose a Club</p>
              <button className="mnf_btn hover:primary-bg text-[#ee3c4d] font-semibold rounded-xl text-xl hover:text-white py-2 px-5"><a href="https://mynextfilm.ai/harkat/propose">Propose Club</a> </button>

              <p style={{fontWeight:"bolder",color:"#ED3344",fontSize:"20px"}}>OR</p>

              <p style={{fontWeight:"bolder",color:"#ED3344",fontSize:"20px"}}>Join a Club</p>

              <button className="mnf_btn hover:primary-bg text-[#ee3c4d] font-semibold rounded-xl text-xl hover:text-white py-2 px-5" onClick={handleClick}>Find Club Near Me</button>
    </div>
  )
}

export default NoClub