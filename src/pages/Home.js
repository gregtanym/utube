import React, {useEffect, useState} from 'react'
import Feed from '../components/Feed'
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { useGlobalContext } from '../context';

const Home = () => {
  const {initialSidebarState, setInitialSidebarState} = useGlobalContext()

  useEffect(() => {
    setInitialSidebarState(false)
  }, [])
  return (
    <div className="homepage-container">
      <Header/>
      {initialSidebarState && <Sidebar/>}
      <Feed/>
    </div>
  )
}

export default Home