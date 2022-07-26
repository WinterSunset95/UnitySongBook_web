import React from "react"
import Link from 'next/link'
import Router from 'next/router'

const SongItem: React.FC = ({title, composer, link, song, num, render}) => {
  if (render === true) {
    return (
      <div className="flex flex-row justify-between m-4 border border-solid p-2 rounded-lg shadow-md">
        <div>
          <h3 className="text-2xl">
            {title}
          </h3>
          <small>{composer}</small>
        </div>
        <small>Song: {num}</small>
      </div>
    )
  } else {
    return (
      <div></div>
    )
  }  
}
export default SongItem