import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../assets/scss/molecules.scss';

const SearchResult = ({
  to,
  imageUrl,
  name,
  profession,
}) => {
  const navigate = useNavigate();
  return (
    <div onClick={() => navigate(to)} className='search-result-con'>
      <img src={imageUrl} alt={name} className='' />
      <div className='wrapper'>
        <div className='info'>
          <div className='name'>{name}</div>
          <div className='role'>{profession}</div>
        </div>
      </div>
    </div>
  );
};

export default SearchResult;
