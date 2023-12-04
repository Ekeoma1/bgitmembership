import moment from 'moment';
import '../../assets/scss/molecules.scss';
import Icon from '../Icon';
import MainButton from './MainButton';

const JobInfoCard = ({
  jobSelected,
  setShowJobInfo,
  setApply,
  setJobSelected,
  getAllJobsLocal,
  setGetAllJobsLocal,
}) => {
  return (
    <div className='job-info'>
      <div className='back' onClick={() => setShowJobInfo(false)}>
        <Icon icon={'arrowLeft'} />
      </div>
      <div className='role-hybrid-con'>
        <div className='role-con'>
          <h4 className='role'>{jobSelected?.jobTitle}</h4>
          <p className='company'>{jobSelected?.company}</p>
          <p className='location'>{jobSelected?.location}</p>
        </div>
        <div className='hybrid'>
          <div className='icon'>
            <Icon icon={'tag'} />
          </div>
          <p>{jobSelected?.jobType}</p>
        </div>
      </div>
      <div className='sec-2'>
        <div className='detail d-flex gap-4'>
          <div className='icon'>
            <Icon icon={'money'} />
          </div>
          <div className='info-con'>
            <h5 className='title'>Salary</h5>
            <h5 className='info'>{`Up to ${Number(
              jobSelected.salary
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
              <h5 className='info'>{jobSelected?.jobType}</h5>
            </div>
          </div>
        </div>
        <div className='detail d-flex gap-4'>
          <div className='icon'>
            <Icon icon={'clock'} />
          </div>
          <div className='info-con'>
            <h5 className='title'>Application Deadline</h5>
            <h5 className='info'>
              {moment(jobSelected.deadlineDate).format('dddd, MMMM Do YYYY')}
            </h5>
          </div>
        </div>
      </div>
      <div className='overview'>
        <h3 className='title'>Overview</h3>
        {jobSelected.overview}
      </div>
      <div className='job-requirements'>
        <h3 className='title'>Job Requirements</h3>
        {jobSelected.requirements}
      </div>
      <div className='benefits'>
        <h3 className='title'>Benefits</h3>
        {jobSelected.benefits}
      </div>
      <div className='btn'>
        {/* <button
          onClick={() => setApply(true)}
          type='submit'
          className='primary-btn small-btn'
        >
          Apply
        </button> */}
        <MainButton
          text={'Apply'}
          size={'small'}
          onClick={() => setApply(true)}
        />
        <MainButton
          text={'Cancel'}
          size={'small'}
          outlined
          onClick={() => {
            setShowJobInfo(false);
            setJobSelected({});
          }}
        />
        {/* <button
          onClick={() => setShowJobInfo(false)}
          type='submit'
          className='primary-btn small-btn'
        >
          Cancel
        </button> */}
      </div>
    </div>
  );
};

export default JobInfoCard;
