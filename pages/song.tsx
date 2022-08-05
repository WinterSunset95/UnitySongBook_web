import React from 'react'
import { useState } from "react"
import { useRouter } from 'next/router'
import Link from 'next/link'
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
  const [songnumber, setSongnumber] = useState(props.number)
  const list = props.data
  const originalItem = list.find(item => {
    return item.num == songnumber
  })
  const [index, setIndex] = useState(list.indexOf(originalItem))
  const currentItem = list[index]
  const link = currentItem.link
  const myNum = currentItem.num
  const change = (dir:any) => {
    if (dir == "right") {
      console.log(dir)
      if (index < list.length - 1) {
        setIndex(index + 1)
      } else {
        setIndex(index)
      }
    }
    else {
      console.log(dir)
      if (index > 0) {
        setIndex(index - 1)
      } else {
        setIndex(index)
      }
    }
  }
  const router = useRouter()
  return (
    <div>
      <div className="shadow-md fixed z-10 w-full p-1 bg-white flex flex-column items-center">
        <div onClick={() => router.back()} className="flex items-center justify-start">
          <FontAwesomeIcon
            icon={faArrowLeft}
            style={{ fontSize: 30, color: "black" }}
            className="m-2"
          />
        </div>
        <div className="text-xl ml-8">No. {songnumber}</div>
      </div>
      <div onClick={() => change("left")} className="fixed h-screen w-1/5 left-0"></div>
      <div onClick={() => change("right")} className="fixed h-screen w-1/5 right-0"></div>
      <img src={link} className="w-screen pt-14" alt="Not found" id="main-image" onLoad={() => setSongnumber(myNum)}/>
    </div>
  )
}