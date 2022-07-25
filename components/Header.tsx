import React from 'react'
import { ReactDOM } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Image from 'next/image'
import logo from '../assets/icon.png'
import '../styles/Home.module.css'
import {
  faSearch
} from "@fortawesome/free-solid-svg-icons";

export default function Header() {
  return (
    <nav className="flex flex-row items-center justify-between shadow-md fixed w-full p-1 bg-white">
      <div className="flex flex-row items-center">
        <div className="flex items-center justify-center m-1">
          <Image src={logo} width="60px" height="60px"/>
        </div>
        <div className="m-1 font-bold">Unity Song Book</div>
      </div>
      <div className="flex flex-row items-center">
        <input type="text" placeholder="search" className="m-1 rounded-lg border-gray-600 border-solid border p-1"/>
        <FontAwesomeIcon icon={faSearch} style={{ fontSize: 20, color: "black"}} className="m-1"/>
      </div>
    </nav>    
  )
}