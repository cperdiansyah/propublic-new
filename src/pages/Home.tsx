'use client'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

const Home = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    // dispatch(configAction.getCurrency());
  }, [])

  return <div>Home</div>
}

export default Home
