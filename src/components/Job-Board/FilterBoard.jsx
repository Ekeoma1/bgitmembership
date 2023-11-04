import { useDispatch, useSelector } from 'react-redux';
import '../../assets/scss/molecules.scss';
import per1 from '../../../src/assets/images/per1.svg';

import MainButton from '../Molecules/MainButton';
import { HiOutlineChevronDown } from 'react-icons/hi';
import { useState } from 'react';
import UserProfilePhotoLoader from '../Atoms/skeleton-loaders/dashboard-page/UserProfilePhotoLoader';
import moment from 'moment';
const FilterBoard = ({ setFilter, setFilterData }) => {
  const dispatch = useDispatch();
  const { getMyProfile } = useSelector((state) => state.users);
  const [formData, setFormData] = useState({
    remote: false,
    hybrid: true,
    on_site: false,
    sort_by: 'relevance',
    date_posted: 'last_24_hours',
    salary: 'all_salaries',
    full_time: false,
    part_time: false,
    permanent: false,
    contract: false,
    temporary: false,
    apprenticeship: false,
    internship: false,
    volunteer: false,
    experience_level: 'internship',
    location: '',
  });

  const handleChange = (e) => {
    let { name, value, type } = e.target;
    if (type === 'checkbox') {
      value = e.target.checked;
    }
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
    //  setApply(false);
    const values = { ...formData };
    const date = moment(Date.now()).format('YYYY-MM-DD');
    values.DateApplied = date;
    console.log('submit', values);
  };

  // console.log('formdata', formData);
  // console.log('values', formData);
  return (
    <div className='filter-board'>
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
                  onChange={handleChange}
                  name='remote'
                  id='remote'
                  type='checkbox'
                  className=''
                  checked={formData.remote}
                />
                <label htmlFor='remote'>Remote</label>
              </div>
              <div className='option'>
                <input
                  onChange={handleChange}
                  name='hybrid'
                  id='hybrid'
                  type='checkbox'
                  className=''
                  checked={formData.hybrid}
                />
                <label htmlFor='hybrid'>Hybrid</label>
              </div>
              <div className='option'>
                <input
                  onChange={handleChange}
                  name='on_site'
                  id='on_site'
                  type='checkbox'
                  className=''
                  checked={formData.on_site}
                />
                <label htmlFor='on_site'>On-site</label>
              </div>
            </div>
          </div>
          <div className='group'>
            <h5 className='title'>Sort By</h5>
            <div className='options-con'>
              <div className='option'>
                <input
                  onChange={handleChange}
                  name='sort_by'
                  id='relevance'
                  type='radio'
                  className=''
                  value='relevance'
                  checked={formData.sort_by === 'relevance'}
                />
                <label htmlFor='relevance'>Relevance</label>
              </div>
              <div className='option'>
                <input
                  onChange={handleChange}
                  name='sort_by'
                  id='date'
                  type='radio'
                  className=''
                  value='date'
                  checked={formData.sort_by === 'date'}
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
                  onChange={handleChange}
                  name='date_posted'
                  id='last_24_hours'
                  type='radio'
                  className=''
                  value={'last_24_hours'}
                  checked={formData.date_posted === 'last_24_hours'}
                />
                <label htmlFor='last_24_hours'>Last 24 hours</label>
              </div>
              <div className='option'>
                <input
                  onChange={handleChange}
                  name='date_posted'
                  id='last_3_days'
                  type='radio'
                  className=''
                  value={'last_3_days'}
                  checked={formData.date_posted === 'last_3_days'}
                />
                <label htmlFor='last_3_days'>Last 3 days</label>
              </div>
              <div className='option'>
                <input
                  onChange={handleChange}
                  name='date_posted'
                  id='last_7_days'
                  type='radio'
                  className=''
                  value={'last_7_days'}
                  checked={formData.date_posted === 'last_7_days'}
                />
                <label htmlFor='last_7_days'>Last 7 days</label>
              </div>
              <div className='option'>
                <input
                  onChange={handleChange}
                  name='date_posted'
                  id='last_14_days'
                  type='radio'
                  className=''
                  value={'last_14_days'}
                  checked={formData.date_posted === 'last_14_days'}
                />
                <label htmlFor='last_14_days'>Last 14 days</label>
              </div>
            </div>
          </div>
          <div className='group'>
            <h5 className='title'>Salary</h5>
            <div className='options-con'>
              <div className='option'>
                <input
                  onChange={handleChange}
                  name='salary'
                  id='all_salaries'
                  type='radio'
                  className=''
                  value={'all_salaries'}
                  checked={formData.salary === 'all_salaries'}
                />
                <label htmlFor='all_salaries'>All salaries</label>
              </div>
              <div className='option'>
                <input
                  onChange={handleChange}
                  name='salary'
                  id='20,000'
                  type='radio'
                  className=''
                  value={'20,000'}
                  checked={formData.salary === '20,000'}
                />
                <label htmlFor='20,000'>$20,000</label>
              </div>
              <div className='option'>
                <input
                  onChange={handleChange}
                  name='salary'
                  id='30,000'
                  type='radio'
                  className=''
                  value={'30,000'}
                  checked={formData.salary === '30,000'}
                />
                <label htmlFor='30,000'>$30,000</label>
              </div>
              <div className='option'>
                <input
                  onChange={handleChange}
                  name='salary'
                  id='40,000'
                  type='radio'
                  className=''
                  value={'40,000'}
                  checked={formData.salary === '40,000'}
                />
                <label htmlFor='40,000'>$40,000</label>
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
                  onChange={handleChange}
                  name='full_time'
                  id='full_time'
                  type='checkbox'
                  className=''
                  checked={formData.full_time}
                />
                <label htmlFor='full_time'>Full-time</label>
              </div>
              <div className='option'>
                <input
                  onChange={handleChange}
                  name='part_time'
                  id='part_time'
                  type='checkbox'
                  className=''
                  checked={formData.part_time}
                />
                <label htmlFor='part_time'>Part-time</label>
              </div>
              <div className='option'>
                <input
                  onChange={handleChange}
                  name='permanent'
                  id='permanent'
                  type='checkbox'
                  className=''
                  checked={formData.permanent}
                />
                <label htmlFor='permanent'>Permanent</label>
              </div>
              <div className='option'>
                <input
                  onChange={handleChange}
                  name='contract'
                  id='contract'
                  type='checkbox'
                  className=''
                  checked={formData.contract}
                />
                <label htmlFor='contract'>contract</label>
              </div>
              <div className='option'>
                <input
                  onChange={handleChange}
                  name='temporary'
                  id='temporary'
                  type='checkbox'
                  className=''
                  checked={formData.temporary}
                />
                <label htmlFor='temporary'>temporary</label>
              </div>
              <div className='option'>
                <input
                  onChange={handleChange}
                  name='apprenticeship'
                  id='apprenticeship'
                  type='checkbox'
                  className=''
                  checked={formData.apprenticeship}
                />
                <label htmlFor='apprenticeship'>apprenticeship</label>
              </div>
              <div className='option'>
                <input
                  onChange={handleChange}
                  name='internship'
                  id='internship'
                  type='checkbox'
                  className=''
                  checked={formData.internship}
                />
                <label htmlFor='internship'>internship</label>
              </div>
              <div className='option'>
                <input
                  onChange={handleChange}
                  name='volunteer'
                  id='volunteer'
                  type='checkbox'
                  className=''
                  checked={formData.volunteer}
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
                    onChange={handleChange}
                    name='experience_level'
                    id='internship_experience_level'
                    type='radio'
                    className=''
                    value={'internship'}
                    checked={formData.experience_level === 'internship'}
                  />
                  <label htmlFor='internship_experience_level'>
                    internship
                  </label>
                </div>
                <div className='option'>
                  <input
                    onChange={handleChange}
                    name='experience_level'
                    id='entry_level'
                    type='radio'
                    className=''
                    value={'entry_level'}
                    checked={formData.experience_level === 'entry_level'}
                  />
                  <label htmlFor='entry_level'>entry level</label>
                </div>
                <div className='option'>
                  <input
                    onChange={handleChange}
                    name='experience_level'
                    id='associate'
                    type='radio'
                    className=''
                    value={'associate'}
                    checked={formData.experience_level === 'associate'}
                  />
                  <label htmlFor='associate'>associate</label>
                </div>
                <div className='option'>
                  <input
                    onChange={handleChange}
                    name='experience_level'
                    id='mid_level'
                    type='radio'
                    className=''
                    value={'mid_level'}
                    checked={formData.experience_level === 'mid_level'}
                  />
                  <label htmlFor='mid_level'>mid level</label>
                </div>
                <div className='option'>
                  <input
                    onChange={handleChange}
                    name='experience_level'
                    id='senior_level'
                    type='radio'
                    className=''
                    value={'senior_level'}
                    checked={formData.experience_level === 'senior_level'}
                  />
                  <label htmlFor='senior_level'>Senior level</label>
                </div>
              </div>
            </div>
            <div className='group filter-by-location'>
              <h5 className='title'>Filter by location</h5>
              <div className='options-con'>
                <div className='range'>
                  <input
                    onChange={handleChange}
                    name='location'
                    id='location'
                    type='range'
                    className=''
                    // min={minPrice}
                    // max={maxPrice}
                    value={formData.location}
                    // onChange={handleChange}
                  />
                  <p>{formData.location} miles</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='save d-flex justify-center mt-4'>
          <button
            onClick={() => {
              setFilter(false);
              setFilterData(formData);
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
  );
};

export default FilterBoard;
