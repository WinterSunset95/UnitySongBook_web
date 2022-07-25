import React from 'react'
import { useState } from "react"
import { useRouter } from 'next/router'

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
export default function Song(props) {
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
      <img src={link} className="w-screen"/>
    </div>
  )
}