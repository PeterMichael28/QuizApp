import React from 'react'
import { ThreeDots } from 'react-loader-spinner';

const ThreeDotsLoader = ({color}) => {
  return (
    <ThreeDots 
    height="30" 
    width="60" 
    radius="9"
    color={color}
    ariaLabel="three-dots-loading"
    visible={true}
    />
  )
}

export default ThreeDotsLoader