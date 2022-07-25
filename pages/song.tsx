import React from 'react'
import { useState } from "react"
import { useRouter } from 'next/router'

export default function Song() {
  const [data, setData] = useState([])
  // Sorting function
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
  async function getJson() {
    const response = await fetch("https://wintersunset95.github.io/UnitySongBook/list.json")
    const jsonDataRaw = await response.json()
    jsonDataRaw.sort(GetSortOrder("num"))
    setData(jsonDataRaw)
    console.log(jsonDataRaw)
  }
  getJson()
  const router = useRouter()
  const {
    query: {num},
  } = router
  const props = {num}
  const songNumber = props.num
  const songData = data.find(item => item.num === songNumber)
  return (
    <div>
      This is the song page: {songNumber}
    </div>
  )
}