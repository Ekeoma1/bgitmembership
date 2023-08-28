import React, { useState } from 'react';
import SearchBox from '../components/Molecules/SearchBox';
import google from '../../src/assets/images/google.svg';
import per1 from '../../src/assets/images/per1.svg';
import Icon from '../components/Icon';
import {
  HiOutlineChevronDown,
  HiOutlineChevronLeft,
  HiOutlineChevronRight,
} from 'react-icons/hi';
import { VscSettings } from 'react-icons/vsc';
import useWindowSize from '../hooks/useWindowSize';
import MainButton from '../components/Molecules/MainButton';
import '../../src/assets/scss/jobBoard.scss';

const JobBoard = () => {
  const { isMobile, windowSize } = useWindowSize();
  const [searchValue, setSearchValue] = useState('');
  const [showJobInfo, setShowJobInfo] = useState(false);
  const [idJobSelected, setIdJobSelected] = useState();
  const [jobSelected, setJobSelected] = useState({});
  const [filter, setFilter] = useState(false);
  const [apply, setApply] = useState(false);
  const [mobileTab, setMobileTab] = useState('for you');
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
  console.log('filter', filter);
  console.log('showjobinfo', showJobInfo);
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
          onClick={() => {
            setFilter(!filter);
            setShowJobInfo(false);
            // if (isMobile) {
            // }
          }}
          type='submit'
          className='primary-btn small-btn  filter-btn'
        >
          <VscSettings />
          Filter
          <HiOutlineChevronDown />
        </button>
      </div>
      {!filter && (
        <div className='tab-btns'>
          <button
            onClick={() => setMobileTab('for you')}
            className={`${mobileTab === 'for you' ? 'active' : 'inactive'}`}
          >
            For you
          </button>
          <button
            onClick={() => setMobileTab('saved jobs')}
            className={`${mobileTab === 'saved jobs' ? 'active' : 'inactive'}`}
          >
            Saved Jobs
          </button>
        </div>
      )}
      {!apply && (
        <div className='main-section'>
          <div
            className={`recommended-filters-section ${
              isMobile && showJobInfo && 'hide'
            } ${filter && 'recommended-filters-section2'}`}
          >
            {!filter && (
              <div className='recommended'>
                <div className='section-title'>
                  <h5>Recommended for you</h5>
                  {mobileTab === 'for you' && (
                    <p className='show-mobile'>Jobs based on your interest</p>
                  )}
                </div>
                <div
                  className={` cards ${
                    isMobile
                      ? mobileTab === 'for you'
                        ? ' show '
                        : 'hide'
                      : ''
                  } 
                  `}
                >
                  {jobsData.map((item) => (
                    <div
                      className={`job-card ${
                        item.id === idJobSelected && 'selected-job'
                      }`}
                      onClick={() => {
                        setShowJobInfo(true);
                        setIdJobSelected(item.id);
                        setJobSelected(
                          jobsData.find((job) => job.id === item.id)
                        );
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
            )}
            {filter && (
              <div className='filters'>
                <div className='arrow' onClick={() => setFilter(false)}>
                  <div className='hide-mobile'>
                    <Icon icon={'arrowLeft'} />
                  </div>
                  <div className='show-mobile'>
                    {/* <Icon icon={'chevronLeft'} /> */}
                    <HiOutlineChevronLeft />
                    <h5 className=''>filters</h5>
                  </div>
                </div>
                <div className='main'>
                  <div className='section-title'>
                    <h5>filters</h5>
                  </div>
                  <div className='sec'>
                    <div className='group'>
                      <h5 className='title'>Job Mode</h5>
                      <div className='options-con'>
                        <div className='option'>
                          <input
                            name='remote'
                            id='remote'
                            type='checkbox'
                            className=''
                          />
                          <label htmlFor='remote'>Remote</label>
                        </div>
                        <div className='option'>
                          <input
                            name='hybrid'
                            id='hybrid'
                            type='checkbox'
                            className=''
                          />
                          <label htmlFor='hybrid'>Hybrod</label>
                        </div>
                        <div className='option'>
                          <input
                            name='on-site'
                            id='on-site'
                            type='checkbox'
                            className=''
                          />
                          <label htmlFor='on-site'>On-site</label>
                        </div>
                      </div>
                    </div>
                    <div className='group'>
                      <h5 className='title'>Sort By</h5>
                      <div className='options-con'>
                        <div className='option'>
                          <input
                            name='sort-by'
                            id='relevance'
                            type='radio'
                            className=''
                          />
                          <label htmlFor='relevance'>Relevance</label>
                        </div>
                        <div className='option'>
                          <input
                            name='sort-by'
                            id='date'
                            type='radio'
                            className=''
                          />
                          <label htmlFor='date'>Date</label>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='sec'>
                    <div className='group'>
                      <h5 className='title'>Date posted</h5>
                      <div className='options-con'>
                        <div className='option'>
                          <input
                            name='date-posted'
                            id='last-24-hours'
                            type='radio'
                            className=''
                          />
                          <label htmlFor='last-24-hours'>Last 24 hours</label>
                        </div>
                        <div className='option'>
                          <input
                            name='date-posted'
                            id='last-3-days'
                            type='radio'
                            className=''
                          />
                          <label htmlFor='last-3-days'>Last 3 days</label>
                        </div>
                        <div className='option'>
                          <input
                            name='date-posted'
                            id='last-7-days'
                            type='radio'
                            className=''
                          />
                          <label htmlFor='last-7-days'>Last 7 days</label>
                        </div>
                        <div className='option'>
                          <input
                            name='date-posted'
                            id='last-14-days'
                            type='radio'
                            className=''
                          />
                          <label htmlFor='last-14-days'>Last 14 days</label>
                        </div>
                      </div>
                    </div>
                    <div className='group'>
                      <h5 className='title'>Salary</h5>
                      <div className='options-con'>
                        <div className='option'>
                          <input
                            name='salary'
                            id='all-salaries'
                            type='radio'
                            className=''
                          />
                          <label htmlFor='all-salary'>All salaries</label>
                        </div>
                        <div className='option'>
                          <input
                            name='salary'
                            id='$20,000'
                            type='radio'
                            className=''
                          />
                          <label htmlFor='$20,000'>$20,000</label>
                        </div>
                        <div className='option'>
                          <input
                            name='salary'
                            id='$30,000'
                            type='radio'
                            className=''
                          />
                          <label htmlFor='$30,000'>$30,000</label>
                        </div>
                        <div className='option'>
                          <input
                            name='salary'
                            id='$40,000'
                            type='radio'
                            className=''
                          />
                          <label htmlFor='$40,000'>$40,000</label>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='sec'>
                    <div className='group'>
                      <h5 className='title'>Job Type</h5>
                      <div className='options-con'>
                        <div className='option'>
                          <input
                            name='full-time'
                            id='full-time'
                            type='checkbox'
                            className=''
                          />
                          <label htmlFor='full-time'>Full-time</label>
                        </div>
                        <div className='option'>
                          <input
                            name='part-time'
                            id='part-time'
                            type='checkbox'
                            className=''
                          />
                          <label htmlFor='part-time'>Part-time</label>
                        </div>
                        <div className='option'>
                          <input
                            name='permanent'
                            id='permanent'
                            type='checkbox'
                            className=''
                          />
                          <label htmlFor='permanent'>Permanent</label>
                        </div>
                        <div className='option'>
                          <input
                            name='contract'
                            id='contract'
                            type='checkbox'
                            className=''
                          />
                          <label htmlFor='contract'>contract</label>
                        </div>
                        <div className='option'>
                          <input
                            name='temporary'
                            id='temporary'
                            type='checkbox'
                            className=''
                          />
                          <label htmlFor='temporary'>temporary</label>
                        </div>
                        <div className='option'>
                          <input
                            name='apprenticeship'
                            id='apprenticeship'
                            type='checkbox'
                            className=''
                          />
                          <label htmlFor='apprenticeship'>apprenticeship</label>
                        </div>
                        <div className='option'>
                          <input
                            name='internship'
                            id='internship'
                            type='checkbox'
                            className=''
                          />
                          <label htmlFor='internship'>internship</label>
                        </div>
                        <div className='option'>
                          <input
                            name='volunteer'
                            id='volunteer'
                            type='checkbox'
                            className=''
                          />
                          <label htmlFor='volunteer'>volunteer</label>
                        </div>
                      </div>
                    </div>
                    <div className=''>
                      <div className='group'>
                        <h5 className='title'>Experience Level</h5>
                        <div className='options-con'>
                          <div className='option'>
                            <input
                              name='experience-level'
                              id='internship-experience-level'
                              type='radio'
                              className=''
                            />
                            <label htmlFor='internship-experience-level'>
                              internship
                            </label>
                          </div>
                          <div className='option'>
                            <input
                              name='experience-level'
                              id='entry-level'
                              type='radio'
                              className=''
                            />
                            <label htmlFor='entry-level'>entry level</label>
                          </div>
                          <div className='option'>
                            <input
                              name='experience-level'
                              id='associate'
                              type='radio'
                              className=''
                            />
                            <label htmlFor='associate'>associate</label>
                          </div>
                          <div className='option'>
                            <input
                              name='experience-level'
                              id='mid-level'
                              type='radio'
                              className=''
                            />
                            <label htmlFor='mid-level'>mid level</label>
                          </div>
                          <div className='option'>
                            <input
                              name='experience-level'
                              id='senior-level'
                              type='radio'
                              className=''
                            />
                            <label htmlFor='senior-level'>Senior level</label>
                          </div>
                        </div>
                      </div>
                      <div className='group filter-by-location'>
                        <h5 className='title'>Filter by location</h5>
                        <div className='options-con'>
                          <div className='range'>
                            <input
                              name='experience-level'
                              id='location'
                              type='range'
                              className=''
                              // min={minPrice}
                              // max={maxPrice}
                              // value={price}
                              // onChange={handleChange}
                            />
                            <p>100 miles</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='save d-flex justify-center mt-4'>
                    <button
                      onClick={() => {
                        setFilter(false);
                        //   if (isMobile) {
                        //     setShowJobInfo(false);
                        //   }
                      }}
                      className='primary-btn small-btn  filter-btn'
                    >
                      Save
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div
            className={`saved-jobs-job-info-section ${
              filter && 'saved-jobs-job-info-section2'
            }`}
          >
            {!showJobInfo && (
              <div
                className={` saved-jobs-section ${
                  filter && 'saved-jobs-section2 '
                }  ${
                  isMobile
                    ? mobileTab === 'saved jobs'
                      ? ' show '
                      : 'hide'
                    : ''
                } `}
              >
                <div className='section-title'>
                  <h5>saved jobs</h5>
                </div>
                <div className='saved-jobs'>
                  {jobsData.map((item, index) => (
                    <div key={index} className='saved-job'>
                      <div className='img-con'>
                        <img src={google} alt='company' className='' />
                      </div>
                      <div className='info'>
                        <div className='details'>
                          <div className=''>
                            <h5 className=''>{item.role}</h5>
                            <p className='company'>{item.company}</p>
                            <p className='location'>{item.location}</p>
                          </div>
                          <span className='status'>{item.status}</span>
                        </div>
                        <div className='btn-con'>
                          <HiOutlineChevronRight />
                        </div>
                      </div>
                    </div>
                  ))}
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
                <div className='back' onClick={() => setShowJobInfo(false)}>
                  <Icon icon={'arrowLeft'} />
                </div>
                <div className='role-hybrid-con'>
                  <div className='role-con'>
                    <h4 className='role'>{jobSelected?.role}</h4>
                    <p className='company'>{jobSelected?.company}</p>
                    <p className='location'>Canary wharf London</p>
                  </div>
                  <div className='hybrid'>
                    <div className='icon'>
                      <Icon icon={'tag'} />
                    </div>
                    <p>Hybrid</p>
                  </div>
                </div>
                <div className='sec-2'>
                  <div className='detail d-flex gap-4'>
                    <div className='icon'>
                      <Icon icon={'money'} />
                    </div>
                    <div className='info-con'>
                      <h5 className='title'>Salary</h5>
                      <h5 className='info'>{`Up to ${
                        jobSelected.currency
                      }${Number(
                        jobSelected.price
                      ).toLocaleString()} a year`}</h5>
                    </div>
                  </div>
                  <div className='detail d-flex gap-4'>
                    <div className='icon'>
                      <Icon icon={'box'} />
                    </div>
                    <div className='info-con'>
                      <h5 className='title'>Job Type</h5>
                      <div className='d-flex items-center justify-between test'>
                        <h5 className='info'>Contract</h5>
                        <h5 className='info'>Part time</h5>
                      </div>
                    </div>
                  </div>
                  <div className='detail d-flex gap-4'>
                    <div className='icon'>
                      <Icon icon={'clock'} />
                    </div>
                    <div className='info-con'>
                      <h5 className='title'>Application Deadline</h5>
                      <h5 className='info'>12th of August 2023</h5>
                    </div>
                  </div>
                </div>
                <div className='overview'>
                  <h3 className='title'>Overview</h3>
                  <p>
                    Corem ipsum dolor sit amet, consectetur adipiscing elit.
                    Etiam eu turpis molestie, dictum est a, mattis tellus. Sed
                    dignissim, metus nec fringilla accumsan, risus sem
                    sollicitudin lacus, ut inte
                  </p>
                  <p>
                    Corem ipsum dolor sit amet, consectetur adipiscing elit.
                    Etiam eu turpis molestie, dictum est a, mattis tellus. Sed
                    dignissim, metus nec fringilla accumsan, risus sem
                    sollicitudin lacus, ut inte
                  </p>
                  <p>
                    Corem ipsum dolor sit amet, consectetur adipiscing elit.
                  </p>
                  <p>
                    Corem ipsum dolor sit amet, consectetur adipiscing elit.
                  </p>
                </div>
                <div className='job-requirements'>
                  <h3 className='title'>Job Requirements</h3>
                  <p>Corem ipsum dolor sit amet, consectetur adipiscing elit</p>
                  <p>
                    Corem ipsum dolor sit amet, consectetur adipiscing elit.
                    Etiam eu turpis molestie, dictum est a, mattis tellus. Sed
                    dignissim, metus nec fringilla accumsan, risus sem
                    sollicitudin lacus, ut inte
                  </p>
                  <p>
                    Corem ipsum dolor sit amet, consectetur adipiscing elit.
                    Etiam eu turpis molestie, dictum est a, mattis tellus. Sed
                    dignissim, metus nec fringilla accumsan, risus sem
                    sollicitudin lacus, ut inte
                  </p>
                </div>
                <div className='benefits'>
                  <h3 className='title'>Benefits</h3>
                  <p>
                    Corem ipsum dolor sit amet, consectetur adipiscing elit.
                    Etiam eu turpis molestie, dictum est a, mattis tellus. Sed
                    dignissim, metus nec fringilla accumsan, risus sem
                    sollicitudin lacus, ut inte
                  </p>
                  <p>
                    Corem ipsum dolor sit amet, consectetur adipiscing elit.
                    Etiam eu turpis molestie, dictum est a, mattis tellus. Sed
                    dignissim, metus nec fringilla accumsan, risus sem
                    sollicitudin lacus, ut inte
                  </p>
                </div>
                <div className='btn'>
                  <button
                    onClick={() => setApply(true)}
                    type='submit'
                    className='primary-btn small-btn'
                  >
                    Apply
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
      {apply && (
        <div className='apply'>
          <div className='sec-1'>
            <div className='role-job-con'>
              <div className='role-con'>
                <h5 className='role'>UX Designer</h5>
                <h5 className='company'>Google</h5>
              </div>
              <div className='job-con'>
                <p>View full job description</p>
                <HiOutlineChevronDown className='icon' />
              </div>
            </div>
            <div className='img-wrapper'>
              <div className='img-con'>
                <img src={per1} alt='' className='' />
              </div>
              <div className='details'>
                <h5 className='name'>Claire Tomas</h5>
                <h5 className='role'>UI/UX Designer</h5>
                <p>London, UK</p>
              </div>
            </div>
          </div>
          <div className='email-address'>
            <p className='title'>Email Address</p>
            <p className='email'>clairejenkins@gmail.com</p>
          </div>
          <div className='resume'>
            <div className='title-wrapper'>
              <p className='title'>CV/Resume</p>
              <div className='edit'>
                <h4 className='edit'>Edit</h4>
              </div>
            </div>
            <div className='resume-box-wrapper'>
              <div className='resume-box'>
                <div className='pdf'>PDF</div>
                <div className='filename-wrapper'>
                  <div className=''>
                    <p className='filename'>Claire Jenkins' CV</p>
                    <p className='filesize'>84kb</p>
                  </div>
                </div>
                <div className='btn-con'>
                  <MainButton
                    text={'View'}
                    size={'small'}
                    onClick={() => {
                      console.log('click btn');
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className='cover-letter'>
            <p className='title'>Cover letter (Optional)</p>
            <div className='btn'>
              <button>Upload Cover letter</button>
            </div>
          </div>
          <div className='add-qstns'>
            <p className='title'>Additional questions</p>
            <div className='qstn'>
              <p className=''>
                How many years of UX design experience do you have*
              </p>
              <div className='input-wrapper'>
                <input type='text' className='input-component' />
              </div>
            </div>
            <div className='qstn'>
              <p className=''>
                Do you have a right to work in the UK without restrictions*
              </p>
              <div className='input-wrapper radio'>
                <div className='radio-con'>
                  <input
                    type='radio'
                    name='right-to-work'
                    className='input-component'
                    id='yes'
                  />
                  <label htmlFor='yes' className=''>
                    Yes
                  </label>
                </div>
                <div className='radio-con'>
                  <input
                    type='radio'
                    name='right-to-work'
                    className='input-component'
                    id='no'
                  />
                  <label htmlFor='no' className=''>
                    No
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div className='submit-btn'>
            <MainButton text={'Submit'} onClick={() => setApply(false)} />
          </div>
        </div>
      )}
    </div>
  );
};

export default JobBoard;
