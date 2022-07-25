import type { NextPage } from 'next'
import { useState, useEffect } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Header from '../components/Header'
import SongItem from '../components/SongItem'

const Home: NextPage = () => {
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
    jsonDataRaw.sort(GetSortOrder("title"))
    setData(jsonDataRaw)
  }
  getJson()
  return (
    <div>
      <Header />
      <div className="pt-4">
        <SongItem />
        {
          data.map((item) => {
            return <SongItem key={item.title} title={item.title} composer={item.composer} link={item.link} song={item.song} num={item.num} array={data}/>
          })
        }
      </div>
    </div>
  )
}

export default Home
