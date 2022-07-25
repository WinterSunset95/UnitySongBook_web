import type { NextPage } from 'next'
import Link from 'next/link'
import Header from '../components/Header'
import SongItem from '../components/SongItem'

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
export const getStaticProps = async () => {
  const response = await fetch("https://wintersunset95.github.io/UnitySongBook/list.json")
  const jsonDataRaw = await response.json()
  jsonDataRaw.sort(GetSortOrder("title"))
  return {
    props: { array: jsonDataRaw }
  }  
}
const Home = (props:any) => {
  const array = props.array  
  return (
    <div>
      <Header />
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
