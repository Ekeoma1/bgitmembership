import moment from 'moment';
import '../../assets/scss/molecules.scss';
import Icon from '../Icon';
import MainButton from './MainButton';
import { FaBookmark, FaRegBookmark } from 'react-icons/fa';

const JobInfoCard = ({
  jobSelected,
  setShowJobInfo,
  setApply,
  setJobSelected,
  getAllJobsLocal,
  setGetAllJobsLocal,
}) => {
  console.log('jobSelected', jobSelected);
  return (
    <div className='job-info'>
      <div className='back' onClick={() => setShowJobInfo(false)}>
        <Icon icon={'arrowLeft'} />
      </div>
      <div className='role-hybrid-con'>
        <div className='role-con'>
          <h4 className='role'>{jobSelected?.job?.jobTitle}</h4>
          <p className='company'>{jobSelected?.job?.company}</p>
        </div>
        <div className='hybrid'>
          {jobSelected?.isSaved ? (
            <FaBookmark size={20} className='icon active' />
          ) : (
            <FaRegBookmark size={20} className='icon' />
          )}
        </div>
      </div>
      <div className='location-con'>
        <p className=''>{jobSelected?.job?.location}</p>
        <p>{jobSelected?.job?.workPlacePolicy}</p>
      </div>
      <div className='sec-2'>
        <div className='detail d-flex gap-4'>
          <div className='icon'>
            <Icon icon={'money'} />
          </div>
          <div className='info-con'>
            <h5 className='title'>Salary</h5>
            <h5 className='info'>{`Up to ${jobSelected.job?.salary} a year`}</h5>
          </div>
        </div>
        <div className='detail d-flex gap-4'>
          <div className='icon'>
            <Icon icon={'box'} />
          </div>
          <div className='info-con'>
            <h5 className='title'>Job Type</h5>
            <div className='d-flex items-center justify-between test'>
              <h5 className='info'>{jobSelected?.job?.employmentType}</h5>
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
              {moment(jobSelected.job.deadlineDate).format(
                'dddd, MMMM Do YYYY'
              )}
            </h5>
          </div>
        </div>
      </div>
      <div className='overview'>
        <h3 className='title'>Overview</h3>
        <div className='content' dangerouslySetInnerHTML={{ __html: jobSelected.job.jobDescription }} />
      </div>

      <div className='btn'>
        {!jobSelected.hasApplied && (
          <MainButton
            text={'Apply'}
            size={'small'}
            onClick={() => setApply(true)}
          />
        )}
        <MainButton
          text={'Cancel'}
          size={'small'}
          outlined
          onClick={() => {
            setShowJobInfo(false);
            setJobSelected({});
          }}
        />
      </div>
    </div>
  );
};

export default JobInfoCard;
