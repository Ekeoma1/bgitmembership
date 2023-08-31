import React from 'react';
import filterIcon from '../../assets/images/filter-icon.svg';
import '../../assets/scss/molecules.scss';

const FilterBtn = ({ onClick }) => {
  return (
    <div className='filter-component' onClick={onClick}>
      <img src={filterIcon} alt='' className='' />
      <h5>Filter</h5>
    </div>
  );
};

export default FilterBtn;
