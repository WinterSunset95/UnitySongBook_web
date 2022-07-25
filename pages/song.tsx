import React from 'react'
import { useState } from "react"
import { useRouter } from 'next/router'
import Image from 'next/image'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft
} from "@fortawesome/free-solid-svg-icons";
function GetSortOrder(prop) {
  return function(a, b) {
    if(a[prop] > b[prop]) {
      return 1
    } else if(a[prop] < b[prop]) {
      return -1
    }
    return 0
  }
}
export const getServerSideProps = async (context) => {
  const res = await fetch("https://wintersunset95.github.io/UnitySongBook/list.json")
  const objList = await res.json()
  objList.sort(GetSortOrder("num"))
  return {
    props: {
      number: context.query.songNumber,
      data: objList
    }
  }
}
export default function Song(props:any) {
  const [index, setIndex] = useState(0)
  const songNumber = props.number
  const list = props.data
  const currentItem = list.find(item => {
    return item.num == songNumber
  })
  const link = currentItem.link
  console.log(index)
  return (
    <div>
      <div className="shadow-md fixed w-full p-1 bg-white flex flex-column items-center">
        <a href='/' className="flex items-center justify-start">
          <FontAwesomeIcon
            icon={faArrowLeft}
            style={{ fontSize: 30, color: "black" }}
            className="m-2"
          />
        </a>
        <div className="text-xl ml-8">No. {songNumber}</div>
      </div>
      <img src={link} className="w-screen pt-14" alt="Not found" />
    </div>
  )
}