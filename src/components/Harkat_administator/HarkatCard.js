import axios from 'axios'
import React, { useEffect } from 'react'
import { BsPersonVideo, BsThreeDotsVertical } from 'react-icons/bs'
import { GoVideo } from 'react-icons/go'
import { Link } from 'react-router-dom'
import { Url, config } from '../myServer'

const HarkatCard = () => {

  // let membercardapi=()=>{
  //   axios.get("http://115.245.192.138/harkat/accepted_club_requests")
  //   .then(
  //     console.log()
  //   )
  // }


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${Url}/harkat/accepted_club_requests`, config);
        // setData(response.data);
        console.log("ress",response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);
  return (
    <>
    <div className='p-3 w-full  rounded-lg border-2 border-gray-300'>
      <div className="flex justify-between">
        <div className='flex gap-2 items-center'>
          <img className='rounded-full h-[42px] w-[42px]' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvFBa3G11OUBYADP7ouSBgwiiRzSYorF4dfg&usqp=CAU" alt="" />
          <div>
            <h4 className='font-bold text-xl'>Mita</h4>
              <div className="flex  items-center ">
                  <div className="w-5 h-5">
                    <img className='w-full h-full rounded-full' src="https://www.befunky.com/images/prismic/32083dff-734b-49a7-bb4d-c0dc512401af_hero-photo-effects-5.jpg?auto=avif,webp&format=jpg&width=896" alt='' />
                  </div>
                  <div className="w-5 h-5 z-2 -ml-2">
                    <img className='w-full h-full rounded-full' src="https://www.shyamparivar.com/uploads/gallery/Hanuman-Ji-4k-HD-Wallpaper-Free-Download.png" alt='' />
                  </div>
                  <span className=' text-sm ml-3'>2 mutual friends</span>
               </div>
               
              <p className='text-[10px]  text-[#7D7D7D]'>MNF Harkat Since- 07/11/23</p>
          </div>
        </div>

        <div className='flex gap-2'>
          <GoVideo size={24} />
          <BsPersonVideo size={24} />
         
          <BsThreeDotsVertical size={24} />
        </div>
      </div>

      <div className="information-div text-[11px] my-2">
        <p className='my-1'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. .</p>
        <p className='my-1'>MNF_harkat,profile, Harkat Admin</p>
        <p className="font-bold">Wants to:</p>
        <p className='my-1 text-[#33B0CA]'> {"{"}Make a feature film on Brahmaputra floods.{"}"} </p>
      </div>

      <div className="flex justify-between gap-4 mt-3 mb-2">
      <button className='py-1 px-3 bg-[] rounded-lg border border-[#33B0CA] text-[#33B0CA]' > <Link className='' to="/">View Profile</Link></button>
        <button className='py-1 px-3 bg-[#33B0CA] rounded-lg text-white'>Message</button>
      </div>

    </div>
    <div className='p-3 w-full rounded-lg border-2 border-gray-300'>
      <div className="flex justify-between">
        <div className='flex gap-2 items-center'>
          <img className='rounded-full h-[42px] w-[42px]' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvFBa3G11OUBYADP7ouSBgwiiRzSYorF4dfg&usqp=CAU" alt="" />
          <div>
            <h4 className='font-bold text-xl'>Mita</h4>
              <div className="flex">
                  <div className="w-5 h-5">
                    <img className='w-full h-full rounded-full' src="https://www.befunky.com/images/prismic/32083dff-734b-49a7-bb4d-c0dc512401af_hero-photo-effects-5.jpg?auto=avif,webp&format=jpg&width=896" alt='' />
                  </div>
                  <div className="w-5 h-5 z-2 -ml-2">
                    <img className='w-full h-full rounded-full' src="https://www.shyamparivar.com/uploads/gallery/Hanuman-Ji-4k-HD-Wallpaper-Free-Download.png" alt='' />
                  </div>
                  <span className='text-sm ml-3'>2 mutual friends</span>
               </div>
               
              <p className='text-[10px]  text-[#7D7D7D]'>MNF Harkat Since- 07/11/23</p>
          </div>
        </div>

        <div className='flex gap-2'>
          <GoVideo size={24} />
          <BsPersonVideo size={24} />
            <BsThreeDotsVertical size={24} />
        </div>
      </div>

      <div className="information-div text-[11px] my-2">
        <p className='my-1'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. .</p>
        <p className='my-1'>MNF_harkat,profile, Harkat Admin</p>
        <p className="font-bold">Wants to:</p>
        <p className='my-1 text-[#33B0CA]'> {"{"}Make a feature film on Brahmaputra floods.{"}"} </p>
      </div>

      <div className="flex justify-between gap-4 mt-3 mb-2">
        <button className='py-1 px-3 bg-[] rounded-lg border border-[#33B0CA] text-[#33B0CA]' > <Link className='' to="/">View Profile</Link></button>
        <button className='py-1 px-3 bg-[#33B0CA] rounded-lg text-white'>Message</button>

       
      </div>

    </div>
    <div className='p-3 w-full rounded-lg border-2 border-gray-300'>
      <div className="flex justify-between">
        <div className='flex gap-2 items-center'>
          <img className='rounded-full h-[42px] w-[42px]' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvFBa3G11OUBYADP7ouSBgwiiRzSYorF4dfg&usqp=CAU" alt="" />
          <div>
            <h4 className='font-bold text-xl'>Mita</h4>
              <div className="flex">
                  <div className="w-5 h-5">
                    <img className='w-full h-full rounded-full' src="https://www.befunky.com/images/prismic/32083dff-734b-49a7-bb4d-c0dc512401af_hero-photo-effects-5.jpg?auto=avif,webp&format=jpg&width=896" alt='' />
                  </div>
                  <div className="w-5 h-5 z-2 -ml-2">
                    <img className='w-full h-full rounded-full' src="https://www.shyamparivar.com/uploads/gallery/Hanuman-Ji-4k-HD-Wallpaper-Free-Download.png" alt='' />
                  </div>
                  <span className='text-sm ml-3'>2 mutual friends</span>
               </div>
               
              <p className='text-[10px]  text-[#7D7D7D]'>MNF Harkat Since- 07/11/23</p>
          </div>
        </div>

        <div className='flex gap-2'>
          <GoVideo size={24} />
          <BsPersonVideo size={24} />
            <BsThreeDotsVertical size={24} />
        </div>
      </div>

      <div className="information-div text-[11px] my-2">
        <p className='my-1'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. .</p>
        <p className='my-1'>MNF_harkat,profile, Harkat Admin</p>
        <p className="font-bold">Wants to:</p>
        <p className='my-1 text-[#33B0CA]'> {"{"}Make a feature film on Brahmaputra floods.{"}"} </p>
      </div>

      <div className="flex justify-between gap-4 mt-3 mb-2">
      <button className='py-1 px-3 bg-[] rounded-lg border border-[#33B0CA] text-[#33B0CA]' > <Link className='' to="/">View Profile</Link></button>
        <button className='py-1 px-3 bg-[#33B0CA] rounded-lg text-white'>Message</button>
      </div>

    </div>
    <div className='p-3 w-full rounded-lg border-2 border-gray-300'>
      <div className="flex justify-between">
        <div className='flex gap-2 items-center'>
          <img className='rounded-full h-[42px] w-[42px]' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvFBa3G11OUBYADP7ouSBgwiiRzSYorF4dfg&usqp=CAU" alt="" />
          <div>
            <h4 className='font-bold text-xl'>Mita</h4>
              <div className="flex">
                  <div className="w-5 h-5">
                    <img className='w-full h-full rounded-full' src="https://www.befunky.com/images/prismic/32083dff-734b-49a7-bb4d-c0dc512401af_hero-photo-effects-5.jpg?auto=avif,webp&format=jpg&width=896" alt='' />
                  </div>
                  <div className="w-5 h-5 z-2 -ml-2">
                    <img className='w-full h-full rounded-full' src="https://www.shyamparivar.com/uploads/gallery/Hanuman-Ji-4k-HD-Wallpaper-Free-Download.png" alt='' />
                  </div>
                  <span className='text-sm ml-3'>2 mutual friends</span>
               </div>
               
              <p className='text-[10px]  text-[#7D7D7D]'>MNF Harkat Since- 07/11/23</p>
          </div>
        </div>

        <div className='flex gap-2'>
          <GoVideo size={24} />
          <BsPersonVideo size={24} />
            <BsThreeDotsVertical size={24} />
        </div>
      </div>

      <div className="information-div text-[11px] my-2">
        <p className='my-1'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. .</p>
        <p className='my-1'>MNF_harkat,profile, Harkat Admin</p>
        <p className="font-bold">Wants to:</p>
        <p className='my-1 text-[#33B0CA]'> {"{"}Make a feature film on Brahmaputra floods.{"}"} </p>
      </div>

      <div className="flex justify-between gap-4 mt-3 mb-2">
      <button className='py-1 px-3 bg-[] rounded-lg border border-[#33B0CA] text-[#33B0CA]' > <Link className='' to="/">View Profile</Link></button>
        <button className='py-1 px-3 bg-[#33B0CA] rounded-lg text-white'>Message</button>
      </div>

    </div>
    <div className='p-3 w-full rounded-lg border-2 border-gray-300'>
      <div className="flex justify-between">
        <div className='flex gap-2 items-center'>
          <img className='rounded-full h-[42px] w-[42px]' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvFBa3G11OUBYADP7ouSBgwiiRzSYorF4dfg&usqp=CAU" alt="" />
          <div>
            <h4 className='font-bold text-xl'>Mita</h4>
              <div className="flex">
                  <div className="w-5 h-5">
                    <img className='w-full h-full rounded-full' src="https://www.befunky.com/images/prismic/32083dff-734b-49a7-bb4d-c0dc512401af_hero-photo-effects-5.jpg?auto=avif,webp&format=jpg&width=896" alt='' />
                  </div>
                  <div className="w-5 h-5 z-2 -ml-2">
                    <img className='w-full h-full rounded-full' src="https://www.shyamparivar.com/uploads/gallery/Hanuman-Ji-4k-HD-Wallpaper-Free-Download.png" alt='' />
                  </div>
                  <span className='text-sm ml-3'>2 mutual friends</span>
               </div>
               
              <p className='text-[10px]  text-[#7D7D7D]'>MNF Harkat Since- 07/11/23</p>
          </div>
        </div>

        <div className='flex gap-2'>
          <GoVideo size={24} />
          <BsPersonVideo size={24} />
            <BsThreeDotsVertical size={24} />
        </div>
      </div>

      <div className="information-div text-[11px] my-2">
        <p className='my-1'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. .</p>
        <p className='my-1'>MNF_harkat,profile, Harkat Admin</p>
        <p className="font-bold">Wants to:</p>
        <p className='my-1 text-[#33B0CA]'> {"{"}Make a feature film on Brahmaputra floods.{"}"} </p>
      </div>

      <div className="flex justify-between gap-4 mt-3 mb-2">
      <button className='py-1 px-3 bg-[] rounded-lg border border-[#33B0CA] text-[#33B0CA]' > <Link className='' to="/">View Profile</Link></button>
        <button className='py-1 px-3 bg-[#33B0CA] rounded-lg text-white'>Message</button>
      </div>

    </div>
    </>

  )
}

export default HarkatCard