import React from 'react'
import '../../assets/scss/atoms.scss'
const Tag = ({text}) => {
  return (
    <div className='tag'>
      <h5>{text}</h5>
    </div>
  );
}

export default Tag