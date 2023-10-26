import React from 'react';
import { colors } from '../../utils/helpers';

const infoData = [
  {
    text: 'Be kind and respectful.',
  },
  {
    text: 'Feel free to ask for advice and network.',
  },
  {
    text: 'Explore and share.',
  },
];

const Info = ({ forum }) => {
  return (
    <div className='info-wrapper shadow-sm'>
      <h3 className='mt-3 title'>Info</h3>
      <div className='info-content'>
        {forum.info.map((item, index) => {
          const backgroundColors = colors;
          const color =
            backgroundColors[index] ??
            backgroundColors[index % backgroundColors.length];

          return (
            <div key={index} className='info'>
              <span style={{ backgroundColor: color }}>
                <h3>{index + 1}</h3>
              </span>
              <h5>{item}</h5>
            </div>
          );
        })}
      </div>
      <p>Only members can contribute to this forum. </p>
    </div>
  );
};

export default Info;
