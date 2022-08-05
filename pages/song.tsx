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
  const [loading, setLoading] = useState("scale-0")
  const list = props.data
  const originalItem = list.find(item => {
    return item.num == songnumber
  })
  const [index, setIndex] = useState(list.indexOf(originalItem))
  const currentItem = list[index]
  const link = currentItem.link
  const myNum = currentItem.num
  const change = (dir:any) => {
    setLoading("scale-1")
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
  const imgLoad = () => {
    setSongnumber(myNum)
    setLoading("scale-0")
  }
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
      <div id="loading" className={`transition-all duration-500 fixed ${loading}`}>
        <div className="z-20 backdrop-opacity-100 flex h-screen w-screen justify-center items-center backdrop-blur-3xl">
          <div
            className="
              animate-spin 
              inline-block 
              w-20
              h-20 
              border-t-8
              border-l-7
              border-r-7
              border-purple-500
              rounded-full
            "
            ></div>
        </div>
      </div>
      <div onClick={() => change("left")} className="z-50 fixed h-screen w-1/5 left-0"></div>
      <div onClick={() => change("right")} className="z-50 fixed h-screen w-1/5 right-0"></div>
      <img src={link} className="w-screen pt-14" alt="Not found" id="main-image" onLoad={() => imgLoad()}/>
    </div>
  )
}