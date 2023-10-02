import { useDispatch, useSelector } from 'react-redux';
import '../../assets/scss/molecules.scss';
import per1 from '../../../src/assets/images/per1.svg';

import MainButton from '../Molecules/MainButton';
import { HiOutlineChevronDown } from 'react-icons/hi';
import { useState } from 'react';
import UserProfilePhotoLoader from '../Atoms/skeleton-loaders/dashboard-page/UserProfilePhotoLoader';
import moment from 'moment';
import { triggerApplyForJob } from '../../Features/jobs-application/jobs_application_slice';
import SingleLineLoader from '../Atoms/skeleton-loaders/SingleLineLoader';
const Apply = ({ setApply, jobSelected }) => {
  const dispatch = useDispatch();
  const { getMyProfile } = useSelector((state) => state.users);
  const [profileImgOnLoadStatus, setProfileImgOnLoadStatus] = useState('base');
  const [formData, setFormData] = useState({
    JobId: jobSelected.jobId,
    UserId: getMyProfile?.data?.userId,
    UserResumeUrl: '',
    CoverLetterUrl: '',
    YearsOfExp: 0,
    IsAllowedToWork: true,
    DateApplied: '',
    resume: '',
  });

  const handleChange = (e) => {
    let { value, type } = e.target;
    if (type === 'radio') {
      value = JSON.parse(value);
    } else if (type === 'file') {
      value = e.target.files[0];
    }
    setFormData({ ...formData, [e.target.name]: value });
  };

  const handleSubmit = () => {
    //  setApply(false);
    const values = { ...formData };
    const date = moment(Date.now()).format('YYYY-MM-DD');
    values.DateApplied = date;
    console.log('submit', values);
    dispatch(triggerApplyForJob(values));
  };

  // console.log('resume', resume);
  // console.log('values', formData);
  return (
    <div className='apply'>
      <div className='sec-1'>
        <div className='role-job-con'>
          <div className='role-con'>
            <h5 className='role'>{getMyProfile.data?.profession}</h5>
            <h5 className='company'>Google</h5>
          </div>
          <div className='job-con'>
            <p>View full job description</p>
            <HiOutlineChevronDown className='icon' />
          </div>
        </div>
        <div className='img-wrapper'>
          <div className='img-con'>
            <img
              src={getMyProfile.data?.imageUrl}
              alt={`${getMyProfile.data?.firstName} ${getMyProfile.data?.secondName}`}
              className={`${
                profileImgOnLoadStatus === 'success' ? 'd-block' : 'd-none'
              }`}
              onLoad={() => setProfileImgOnLoadStatus('success')}
              onError={() => setProfileImgOnLoadStatus('error')}
            />
            {profileImgOnLoadStatus === 'base' && <UserProfilePhotoLoader />}
            {profileImgOnLoadStatus === 'error' && (
              <div className='error-img'>couldn't load img</div>
            )}
          </div>
          <div className='details'>
            <h5 className='name'>
              {getMyProfile.data.firstName} {getMyProfile.data.secondName}
            </h5>
            <h5 className='role'>{getMyProfile.data?.profession}</h5>
            <p>{getMyProfile.data?.city}</p>
          </div>
        </div>
      </div>
      <div className='email-address'>
        <p className='title'>Email Address</p>
        {getMyProfile.status === 'base' ||
        getMyProfile?.status === 'loading' ? (
          <div className='loader-con'>
            <SingleLineLoader />
          </div>
        ) : getMyProfile.status === 'successful' ? (
          <>
            <p className='email'>{getMyProfile.data?.email}</p>
          </>
        ) : (
          <></>
        )}
      </div>
      <div className='resume'>
        <div className='title-wrapper'>
          <p className='title'>CV/Resume</p>
          <div className='edit'>
            <label htmlFor='resume' className='edit'>
              <h4 className='edit'>Edit</h4>

              <input
                name='resume'
                type='file'
                id='resume'
                style={{ display: 'none' }}
                onChange={handleChange}
                accept='.pdf,.doc'
              />
            </label>
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
          <p className=''>Enter your resume url*</p>
          <div className='input-wrapper'>
            <input
              name='UserResumeUrl'
              type='text'
              className='input-component'
              onChange={handleChange}
            />
          </div>
        </div>
        <div className='qstn'>
          <p className=''>Enter your cover letter url*</p>
          <div className='input-wrapper'>
            <input
              name='CoverLetterUrl'
              type='text'
              className='input-component'
              onChange={handleChange}
            />
          </div>
        </div>
        <div className='qstn'>
          <p className=''>
            How many years of UX design experience do you have*
          </p>
          <div className='input-wrapper'>
            <input
              name='YearsOfExp'
              type='number'
              className='input-component'
              onChange={handleChange}
            />
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
                name='IsAllowedToWork'
                className='input-component'
                id='yes'
                value={true}
                onChange={handleChange}
                checked={formData.IsAllowedToWork === true}
              />
              <label htmlFor='yes' className=''>
                Yes
              </label>
            </div>
            <div className='radio-con'>
              <input
                type='radio'
                name='IsAllowedToWork'
                className='input-component'
                id='no'
                value={false}
                onChange={handleChange}
              />
              <label htmlFor='no' className=''>
                No
              </label>
            </div>
          </div>
        </div>
      </div>
      <div className='submit-btn'>
        <MainButton text={'Submit'} onClick={handleSubmit} />
      </div>
    </div>
  );
};

export default Apply;
