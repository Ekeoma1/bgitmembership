import { useDispatch, useSelector } from 'react-redux';
import '../../assets/scss/jobBoard.scss';
import per1 from '../../../src/assets/images/per1.svg';

import MainButton from '../Molecules/MainButton';
import { HiOutlineChevronDown } from 'react-icons/hi';
import { useEffect, useState } from 'react';
import UserProfilePhotoLoader from '../Atoms/skeleton-loaders/dashboard-page/UserProfilePhotoLoader';
import moment from 'moment';
import {
  resetApplyForJob,
  triggerApplyForJob,
} from '../../Features/jobs-application/jobs_application_slice';
import SingleLineLoader from '../Atoms/skeleton-loaders/SingleLineLoader';
import { renderToast } from '../Molecules/CustomToastify';
import { useNavigate } from 'react-router-dom';
const Apply = ({ setApply, jobSelected }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { getMyProfile } = useSelector((state) => state.users);
  const { applyForJob } = useSelector((state) => state.jobsApplication);
  const [profileImgOnLoadStatus, setProfileImgOnLoadStatus] = useState('base');
  const [formData, setFormData] = useState({
    JobId: jobSelected.job?.jobId,
    UserId: getMyProfile?.data?.userId,
    UserResumeUrl: '',
    CoverLetterUrl: '',
    YearsOfExp: '',
    IsAllowedToWork: true,
    DateApplied: '',
    resume: '',
    CoverLetter: '',
  });

  const handleChange = (e) => {
    let { value, type } = e.target;
    // console.log('value', e.target.value, type);
    if (type === 'radio') {
      value = JSON.parse(value);
    } else if (type === 'file') {
      value = e.target.files[0];
    }
    setFormData({ ...formData, [e.target.name]: value });
  };

  const handleSubmit = () => {
    const values = { ...formData };
    const date = moment(Date.now()).format('YYYY-MM-DD');
    values.DateApplied = date;
    dispatch(triggerApplyForJob(values));
  };
  useEffect(() => {
    if (
      applyForJob.status === 'successful' &&
      applyForJob.data === 'Job application successful.'
    ) {
      renderToast({
        status: 'success',
        message: 'Job applied successfully',
      });
      dispatch(resetApplyForJob());
      setFormData({
        JobId: jobSelected.job.jobId,
        UserId: getMyProfile?.data?.userId,
        UserResumeUrl: '',
        CoverLetterUrl: '',
        YearsOfExp: '',
        IsAllowedToWork: true,
        DateApplied: '',
        resume: '',
        CoverLetter: '',
      });
       setApply(false);
    } else if (applyForJob.status === 'error') {
      renderToast({
        status: 'error',
        message: 'something went wrong',
      });
      dispatch(resetApplyForJob());
    }
  }, [applyForJob]);

  // console.log('resume', resume);
  console.log('formdata', formData);
  // console.log('formdata.coverLetter', formData.CoverLetter);
  // console.log(applyForJob);
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
          {formData.resume && (
            <div className='resume-box'>
              <div className='pdf'>PDF</div>
              <div className='filename-wrapper'>
                <div className=''>
                  <p className='filename'>{formData.resume.name}</p>
                  {/* <p className='filesize'>{formData.resume.size}</p> */}
                </div>
              </div>
              <div className='btn-con'>
                <>
                  {/* <MainButton
                    text={'View'}
                    size={'small'}
                    onClick={() => {
                      console.log('click btn');
                    }}
                  /> */}
                </>
              </div>
            </div>
          )}
        </div>
        {formData.resume?.size > 3000000 && (
          <p className='error'>Resume size should not exceed 3MB</p>
        )}
      </div>
      <div className='cover-letter'>
        <p className='title'>Cover letter (Optional)</p>
        <div className='btn'>
          <div className=''>
            <label htmlFor='cover-letter'>
              <input
                type='file'
                accept='.pdf,.doc'
                style={{ display: 'none' }}
                name='CoverLetter'
                id='cover-letter'
                onChange={handleChange}
              />
              {formData.CoverLetter
                ? formData.CoverLetter.name
                : 'Upload Cover letter'}
            </label>
            {formData.CoverLetter?.size > 3000000 && (
              <p className='error'>Cover letter size should not exceed 3MB</p>
            )}
          </div>
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
              value={formData.UserResumeUrl}
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
              value={formData.CoverLetterUrl}
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
              value={formData.YearsOfExp}
            />
          </div>
        </div>
        <div className='qstn'>
          <p className=''>
            Do you have a right to work in {jobSelected?.job.location} without
            restrictions*
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
        <MainButton
          text={'Submit'}
          onClick={handleSubmit}
          loading={applyForJob.status === 'loading'}
          disabled={
            formData.resume === '' ||
            formData.CoverLetter === '' ||
            formData.CoverLetterUrl === '' ||
            formData.UserResumeUrl === '' ||
            formData.resume.size > 3000000 ||
            formData.CoverLetter.size > 3000000
          }
        />
      </div>
    </div>
  );
};

export default Apply;
