import '../../assets/scss/molecules.scss';
import Icon from '../Icon';
import MainButton from './MainButton';

const JobInfoCard = ({ jobSelected, setShowJobInfo, setApply }) => {
  return (
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
            <h5 className='info'>{`Up to ${jobSelected.currency}${Number(
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
          Corem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu
          turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec
          fringilla accumsan, risus sem sollicitudin lacus, ut inte
        </p>
        <p>
          Corem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu
          turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec
          fringilla accumsan, risus sem sollicitudin lacus, ut inte
        </p>
        <p>Corem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        <p>Corem ipsum dolor sit amet, consectetur adipiscing elit.</p>
      </div>
      <div className='job-requirements'>
        <h3 className='title'>Job Requirements</h3>
        <p>Corem ipsum dolor sit amet, consectetur adipiscing elit</p>
        <p>
          Corem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu
          turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec
          fringilla accumsan, risus sem sollicitudin lacus, ut inte
        </p>
        <p>
          Corem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu
          turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec
          fringilla accumsan, risus sem sollicitudin lacus, ut inte
        </p>
      </div>
      <div className='benefits'>
        <h3 className='title'>Benefits</h3>
        <p>
          Corem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu
          turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec
          fringilla accumsan, risus sem sollicitudin lacus, ut inte
        </p>
        <p>
          Corem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu
          turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec
          fringilla accumsan, risus sem sollicitudin lacus, ut inte
        </p>
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
          text={'Submit'}
          size={'small'}
          onClick={() => setApply(true)}
        />
        <MainButton
          text={'Cancel'}
          size={'small'}
          outlined
          onClick={() => setShowJobInfo(false)}
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
