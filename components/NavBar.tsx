"use client"
import React from 'react';
import { CiSearch } from "react-icons/ci";
import { CiShoppingCart } from "react-icons/ci";
import { CiUser } from "react-icons/ci";
import Link from "next/link";

// type NavElem = {
//     Shop: string;
//     Categories: string;
//     Locations: string;
//     Goods: string
// }

const navItems = [
  { label: "SHOP", href: "/shop" },
  { label: "CATEGORIES", href: "/categories" },
  { label: "LOCATIONS", href: "/locations" },
  { label: "GOODS", href: "/goods" },
];

const NavBar = () => {
  return (

    <div className=''>
        <div className='navHeader'>
          <div className='track'>
            <p className="slide text-sm">Deal One: 50% Off</p>
            <p className="slide text-sm">Deal Two: Free Shipping</p>
            <p className="slide text-sm">Deal Three: Buy 1 Get 1 Free</p>
            
          </div>
          
        </div>
        <div className='flex pb-4 pt-4 justify-between gap-12 items-center'>
            <div>
              
            </div>
            <h1 className='text-2xl'>Sugar Rush Co.</h1>
            <div className='flex gap-4 pr-4'>
                <CiSearch size={25}/>
                <CiShoppingCart size={25} />
                <CiUser size={25}/>
            </div>
            
        </div>
        <ul className='bg-black  flex gap-16 justify-center pt-2 pb-2'>
            {navItems.map((elem, index) => (
                <li key={index} className='listHover text-sm'>
                    <Link href={elem.href}>{elem.label}</Link>
                </li>
            ))}
        </ul>
    </div>
  )
}

export default NavBar