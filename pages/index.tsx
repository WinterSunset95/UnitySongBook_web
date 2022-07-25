import type { NextPage } from 'next'
import { useState, useEffect } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import styles from '../styles/Home.module.css'
import Header from '../components/Header'
import SongItem from '../components/SongItem'

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
export const getStaticProps = async () => {
  const response = await fetch("https://wintersunset95.github.io/UnitySongBook/list.json")
  const jsonDataRaw = await response.json()
  jsonDataRaw.sort(GetSortOrder("title"))
  return {
    props: { array: jsonDataRaw }
  }  
}
const Home: NextPage = (props) => {
  const array = props.array  
  return (
    <div>
      <Header />
      <ul className="pt-20">
        {
          array.map((item) => {
            return (
              <li key={item.title}>
              <Link href={{
                pathname: "/song",
                query: {
                  songNumber: item.num
                }
              }}>
                <a>
                  <SongItem title={item.title} composer={item.composer} link={item.link} song={item.song} num={item.num}/>
                </a>
              </Link>    
              </li>
            )
          })
        }
      </ul>
    </div>
  )
}

export default Home
