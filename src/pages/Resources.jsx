import React, { useState, useEffect } from 'react';
import '../assets/scss/resources.scss';
import SearchBox from '../components/Molecules/SearchBox';
import { HiOutlineChevronRight } from 'react-icons/hi';

const Resources = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const data = [
    {
      title: 'CV Builder',
      info: 'Learn and create job-ready CVs with our dedicated HR team.',
      id: 1,
    },
    {
      title: 'Tech Guides (PDF)',
      info: 'Tailored tech guides for UX design, Data Analyst and more. ',
      id: 2,
    },
    {
      title: 'Event Recordings',
      info: 'Catch up on missed events with our official BGIT recordings and stay in the loop.',
      id: 3,
    },
    {
      title: 'Interview Prep',
      info: 'Practice with one of our HR professionals to get you ready for your next opportunity',
      id: 4,
    },
  ];
  const [searchValue, setSearchValue] = useState('');
  const onChange = (e) => {
    setSearchValue(e.target.value);
  };
  const handleSearch = () => {
    console.log('search', searchValue);
  };
  const handleResourceCard = (id) => {
    console.log(id);
  };

  return (
    <div className='resources-wrapper'>
      <div className='search-box-section mx-auto'>
        <div className='search-box-component-wrapper'>
          <SearchBox
            onChange={onChange}
            value={searchValue}
            placeholder='Search'
          />
        </div>
        <button
          onClick={handleSearch}
          type='submit'
          className='primary-btn small-btn'
        >
          Search
        </button>
      </div>
      <div className='main-section'>
        <div className='section-title'>
          <h5>Resources</h5>
        </div>
        <div className='resource-cards-wrapper'>
          {data.map((card, index) => (
            <div key={index} className='resource-card-component'>
              <h5 className='title'>{card.title}</h5>
              <div className='card-btn-con'>
                <p className='info'>{card.info}</p>
                <button
                  onClick={() => handleResourceCard(card.id)}
                  className='card-btn'
                >
                  Learn more
                </button>
                <button
                  onClick={() => handleResourceCard(card.id)}
                  className='card-btn-mobile'
                >
                  <HiOutlineChevronRight />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Resources;
