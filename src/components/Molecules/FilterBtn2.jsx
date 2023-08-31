import React from 'react';
import filterIcon from '../../assets/images/filter-icon.svg';
import '../../assets/scss/molecules.scss';

const FilterBtn2 = ({ onClick }) => {
  return (
    <div className='filter-component2' onClick={onClick}>
      <img src={filterIcon} alt='' className='' />
    </div>
  );
};

export default FilterBtn2;
