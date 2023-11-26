import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { AiOutlineHome } from 'react-icons/ai';
import { BiNews } from 'react-icons/bi';
import { MdOutlinePhotoSizeSelectActual } from 'react-icons/md';
import { BsListCheck } from 'react-icons/bs';
import { CgProfile } from 'react-icons/cg';
import { FiSettings } from 'react-icons/fi';
const Navbar = () => {
    const [navbar, setNavbar] = useState(false);
    const navbarSticky = () => {
        if (window.scrollY >= 480) {
            setNavbar(true);
        }
        else {
            setNavbar(false);
        }
    }
    window.addEventListener('scroll', navbarSticky);
    return (
        <div>
            <nav className={navbar ? 'fixed top-0 ml-0 bg-white z-30 w-full pt-3 pb-5' : 'pt-3 pb-5 bg-white border-b-2 border-accent z-30 w-full'}>
                <div className="container flex justify-between h-10 mx-auto sm:justify-center sm:space-x-20 lg:justify-center lg:space-x-20">
                    <ul className="items-stretch sm:space-x-16 md:space-x-20 lg:space-x-24 md:flex text-center">
                        <li className="flex justify-center pt-2 hover:text-neutral">
                            <NavLink to={`ClubDetails`} className="text-4xl hover:tooltip-accent hover:tooltip hover:tooltip-bottom" data-tip="Home"><AiOutlineHome /></NavLink>
                        </li>
                        <li className="flex justify-center pt-2 hover:text-neutral">
                            <NavLink to={`newsfeed`} className="text-4xl hover:tooltip-accent hover:tooltip hover:tooltip-bottom" data-tip="Feed"><BiNews /></NavLink>
                        </li>
                        <li className="flex justify-center pt-2 hover:text-neutral">
                            < NavLink to={`pictures`}Link className="text-4xl hover:tooltip-accent hover:tooltip hover:tooltip-bottom" data-tip="Gallery"><MdOutlinePhotoSizeSelectActual /></NavLink>
                        </li>
                        {/* <li className="flex justify-center pt-2 hover:text-neutral">
                            <NavLink to='activities' className="text-4xl hover:tooltip-accent hover:tooltip hover:tooltip-bottom" data-tip="Activities"><BsListCheck /></NavLink>
                        </li> */}
                        {/* <li className="flex justify-center pt-2 hover:text-neutral" >
                            <Link to={'http://115.245.192.138/memberProfile#/personaldetails'}  className="text-4xl hover:tooltip-accent hover:tooltip hover:tooltip-bottom" data-tip="Profile"><CgProfile /></Link>
                        </li> */}
                        {/* <li className="flex justify-center pt-2 hover:text-neutral">
                            <Link className="text-4xl hover:tooltip-accent hover:tooltip hover:tooltip-bottom" data-tip="Settings"><FiSettings /></Link>
                        </li> */}
                    </ul>
                </div>
            </nav>
        </div>
    );
};

export default Navbar;