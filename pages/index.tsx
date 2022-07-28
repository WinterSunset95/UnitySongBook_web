import { useState } from 'react'
import Image from 'next/image'
import logo from '../assets/icon.png'
import Link from 'next/link'
import SongItem from '../components/SongItem'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faSearch
} from "@fortawesome/free-solid-svg-icons";

// Sorting function
function GetSortOrder(prop:any) {
  return function(a:any, b:any) {
    if(a[prop] > b[prop]) {
      return 1
    } else if(a[prop] < b[prop]) {
      return -1
    }
    return 0
  }
}
export const getServerSideProps = async () => {
  const response = await fetch("https://wintersunset95.github.io/UnitySongBook/list.json")
  const jsonDataRaw = await response.json()
  jsonDataRaw.sort(GetSortOrder("title"))
  for (let i = 0; i < jsonDataRaw.length; i++) {
    const item = jsonDataRaw[i]
    item['render'] = true
  }
  return {
    props: { array: jsonDataRaw }
  }  
}
const Home = (props:any) => {
  const [fulldata, setFulldata] = useState(props.array)
  const [array, setArray] = useState(props.array)
  const [text, setText] = useState("")
  const search = () => {
    const inputElement = document.getElementById("search-bar")
    if (inputElement === null) {
      console.log(inputElement)
    } else {
    const domElem = (inputElement as HTMLInputElement).value
    const new_arr:any = []
    for (let i = 0; i < fulldata.length; i++) {
      const item:any = fulldata[i]
      const search_text = domElem.toLowerCase()
      const title_formatted = item.title.toLowerCase()
      const length = domElem.length
      const to_match = title_formatted.slice(0, length)
      if (search_text === to_match) {
        new_arr.push(item)
      } else {
        console.log(item)
      }
    }
    setArray(new_arr)
    }
  }
  return (
    <div>
      <nav className="flex flex-row items-center justify-between shadow-md fixed w-full p-1 bg-white">
        <div className="flex flex-row items-center">
          <div className="flex items-center justify-center m-1">
            <Image src={logo} width="60px" height="60px"/>
          </div>
          <div className="m-1 font-bold">Unity Song Book</div>
        </div>
        <div className="flex flex-row items-center">
          <input id="search-bar" onInput={search} type="text" placeholder="search" className="m-1 rounded-lg border-gray-600 border-solid border p-1"/>
          <FontAwesomeIcon icon={faSearch} style={{ fontSize: 20, color: "black"}} className="m-1"/>
        </div>
      </nav> 
      <ul className="pt-20">
        {
          array.map((item:any) => {
            return (
              <li key={item.title}>
              <Link href={{
                pathname: "/song",
                query: {
                  songNumber: item.num
                }
              }}>
                <a>
                  <SongItem title={item.title} composer={item.composer} link={item.link} song={item.song} num={item.num} render={item.render}/>
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
