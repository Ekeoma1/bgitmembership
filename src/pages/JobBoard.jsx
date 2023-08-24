import React, { useState } from 'react';
import SearchBox from '../components/Molecules/SearchBox';
import google from '../../src/assets/images/google.svg';
import '../../src/assets/scss/jobBoard.scss';
import Icon from '../components/Icon';
import { HiOutlineChevronDown, HiOutlineChevronRight } from 'react-icons/hi';
import { VscSettings } from 'react-icons/vsc';

const JobBoard = () => {
  const [searchValue, setSearchValue] = useState('');
  const [showJobInfo, setShowJobInfo] = useState(false);
  const [idJobSelected, setIdJobSelected] = useState();
  const [jobSelected, setJobSelected] = useState({});
  const onChange = (e) => {
    setSearchValue(e.target.value);
  };
  const handleSearch = () => {
    console.log('search', searchValue);
  };
  const jobsData = [
    {
      id: 1,
      role: 'UX Designer',
      company: 'Google',
      location: 'London (Hybrid)',
      currency: '$',
      price: '45000',
      type: 'Contract',
      timePosted: 'Just posted',
      status: 'Applied 2 days ago',
    },
    {
      id: 2,
      role: 'Data Analyst',
      company: 'Google',
      location: 'London (Hybrid)',
      currency: '$',
      price: '29500',
      type: 'Contract',
      timePosted: 'Just posted',
      status: 'Posted 2 days ago',
    },
    {
      id: 3,
      role: 'Software Engineer',
      company: 'Apple',
      location: 'Berlin (Hybrid)',
      currency: '$',
      price: '55500',
      type: 'Contract',
      timePosted: 'Just posted',
      status: 'Application closed',
    },
    {
      id: 4,
      role: 'Cyber security',
      company: 'Amazon',
      location: 'Paris (Hybrid)',
      currency: '$',
      price: '60000',
      type: 'Contract',
      timePosted: 'Just posted',
      status: 'Posted 2 days',
    },
    {
      id: 5,
      role: 'Cyber security',
      company: 'Amazon',
      location: 'Paris (Hybrid)',
      currency: '$',
      price: '60000',
      type: 'Contract',
      timePosted: 'Just posted',
      status: 'Posted 2 days',
    },
  ];
  return (
    <div className='job-board-wrapper'>
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
          className='primary-btn small-btn  filter-btn'
        >
          <VscSettings />
          Filter
          {/* <Icon icon={'chevronRight'} /> */}
          <HiOutlineChevronDown />
        </button>
      </div>
      <div className='main-section'>
        <div className='recommended-filters-section'>
          <div className='recommended'>
            <div className='section-title'>
              <h5>Recommended for you</h5>
            </div>
            <div className='cards'>
              {jobsData.map((item) => (
                <div
                  className={`job-card ${
                    item.id === idJobSelected && 'selected-job'
                  }`}
                  onClick={() => {
                    setShowJobInfo(true);
                    setIdJobSelected(item.id);
                    setJobSelected(jobsData.find((job) => job.id === item.id));
                  }}
                >
                  <div className='img-con'>
                    <img src={google} alt='' className='' />
                  </div>
                  <div className='info'>
                    <h5 className='role'>{item.role}</h5>
                    <h5 className='company'>{item.company}</h5>
                    <p className='location'>{item.location}</p>
                    <div className='salary-type'>
                      <div className='salary'>
                        <Icon icon='money' />
                        <div className='amount'>
                          <h5 className='currency'>{item.currency}</h5>
                          <h5 className='price'>
                            {Number(item.price).toLocaleString()}
                          </h5>
                        </div>
                      </div>
                      <div className='type'>
                        <Icon icon='box' />
                        <h5 className=''>{item.type}</h5>
                      </div>
                    </div>
                    <h5 className='just-posted'>{item.timePosted}</h5>
                  </div>
                  <div className='tag'>
                    <Icon icon={'tag'} />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className='filters'>
            <div className='section-title'>
              <h5>filters</h5>
            </div>
          </div>
        </div>
        <div className='saved-jobs-job-info-section'>
          {!showJobInfo && (
            <div className='saved-jobs-section'>
              <div className='section-title'>
                <h5>saved jobs</h5>
              </div>
              <div className='saved-jobs'>
                <div className='saved-job'>
                  <div className='img-con'>
                    <img src={google} alt='company' className='' />
                  </div>
                  <div className='info'>
                    <div className='details'>
                      <div className=''>
                        <h5 className=''>Data Analyst </h5>
                        <p className='company'>Google</p>
                        <p className='location'>London (Hybrid)</p>
                      </div>
                      <span className='status'>Applied 2 days ago</span>
                    </div>
                    <div className='btn-con'>
                      <HiOutlineChevronRight />
                    </div>
                  </div>
                </div>
                <div className='saved-job'>
                  <div className='img-con'>
                    <img src={google} alt='company' className='' />
                  </div>
                  <div className='info'>
                    <div className='details'>
                      <div className=''>
                        <h5 className=''>Data Analyst </h5>
                        <p className='company'>Google</p>
                        <p className='location'>London (Hybrid)</p>
                      </div>
                      <span className='status'>Applied 2 days ago</span>
                    </div>
                    <div className='btn-con'>
                      <HiOutlineChevronRight />
                    </div>
                  </div>
                </div>
                <div className='saved-job'>
                  <div className='img-con'>
                    <img src={google} alt='company' className='' />
                  </div>
                  <div className='info'>
                    <div className='details'>
                      <div className=''>
                        <h5 className=''>Data Analyst </h5>
                        <p className='company'>Google</p>
                        <p className='location'>London (Hybrid)</p>
                      </div>
                      <span className='status'>Applied 2 days ago</span>
                    </div>
                    <div className='btn-con'>
                      <HiOutlineChevronRight />
                    </div>
                  </div>
                </div>
                <div className='saved-job'>
                  <div className='img-con'>
                    <img src={google} alt='company' className='' />
                  </div>
                  <div className='info'>
                    <div className='details'>
                      <div className=''>
                        <h5 className=''>Data Analyst </h5>
                        <p className='company'>Google</p>
                        <p className='location'>London (Hybrid)</p>
                      </div>
                      <span className='status'>Applied 2 days ago</span>
                    </div>
                    <div className='btn-con'>
                      <HiOutlineChevronRight />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          {showJobInfo && (
            <div className='job-info'>
              <div className='role-hybrid-con'>
                <div className='role-con'>
                  <h4 className='role'>{jobSelected?.role}</h4>
                  <p className='company'>{jobSelected?.company}</p>
                  <p className='location'>Canary wharf London</p>
                </div>
                <div className='hybrid'>
                  <Icon icon={'tag'} />
                  <p>Hybrid</p>
                </div>
              </div>
              <div className='sec-2'>
                <div className='detail d-flex gap-4'>
                  <Icon icon={'money'} />
                  <div className='info-con'>
                    <h5 className='title'>Salary</h5>
                    <h5 className='info'>{`Up to ${
                      jobSelected.currency
                    }${Number(jobSelected.price).toLocaleString()} a year`}</h5>
                  </div>
                </div>
                <div className='detail d-flex gap-4'>
                  <Icon icon={'box'} />
                  <div className='info-con'>
                    <h5 className='title'>Job Type</h5>
                    <div className='d-flex items-center justify-between test'>
                      <h5 className='info'>Contract</h5>
                      <h5 className='info'>Part time</h5>
                    </div>
                  </div>
                </div>
                <div className='detail d-flex gap-4'>
                  <Icon icon={'clock'} />
                  <div className='info-con'>
                    <h5 className='title'>Application Deadline</h5>
                    <h5 className='info'>12th of August 2023</h5>
                  </div>
                </div>
              </div>
              <div className='overview'>
                <h3 className='title'>Overview</h3>
                <p>
                  Corem ipsum dolor sit amet, consectetur adipiscing elit. Etiam
                  eu turpis molestie, dictum est a, mattis tellus. Sed
                  dignissim, metus nec fringilla accumsan, risus sem
                  sollicitudin lacus, ut inte
                </p>
                <p>
                  Corem ipsum dolor sit amet, consectetur adipiscing elit. Etiam
                  eu turpis molestie, dictum est a, mattis tellus. Sed
                  dignissim, metus nec fringilla accumsan, risus sem
                  sollicitudin lacus, ut inte
                </p>
                <p>Corem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                <p>Corem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              </div>
              <div className='job-requirements'>
                <h3 className='title'>Job Requirements</h3>
                <p>Corem ipsum dolor sit amet, consectetur adipiscing elit</p>
                <p>
                  Corem ipsum dolor sit amet, consectetur adipiscing elit. Etiam
                  eu turpis molestie, dictum est a, mattis tellus. Sed
                  dignissim, metus nec fringilla accumsan, risus sem
                  sollicitudin lacus, ut inte
                </p>
                <p>
                  Corem ipsum dolor sit amet, consectetur adipiscing elit. Etiam
                  eu turpis molestie, dictum est a, mattis tellus. Sed
                  dignissim, metus nec fringilla accumsan, risus sem
                  sollicitudin lacus, ut inte
                </p>
              </div>
              <div className='benefits'>
                <h3 className='title'>Benefits</h3>
                <p>
                  Corem ipsum dolor sit amet, consectetur adipiscing elit. Etiam
                  eu turpis molestie, dictum est a, mattis tellus. Sed
                  dignissim, metus nec fringilla accumsan, risus sem
                  sollicitudin lacus, ut inte
                </p>
                <p>
                  Corem ipsum dolor sit amet, consectetur adipiscing elit. Etiam
                  eu turpis molestie, dictum est a, mattis tellus. Sed
                  dignissim, metus nec fringilla accumsan, risus sem
                  sollicitudin lacus, ut inte
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default JobBoard;
