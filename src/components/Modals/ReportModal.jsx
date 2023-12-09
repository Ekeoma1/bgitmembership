import { useState } from 'react';
import '../../assets/scss/modal.scss';
import { Stepper } from 'react-form-stepper';
import { Link } from 'react-router-dom';
import Icon from '../Icon';
import { useDispatch, useSelector } from 'react-redux';
import { triggerReportUser } from '../../Features/reports/reports_slice';

const ReportModal = ({ showReport, reportAction }) => {
  const dispatch = useDispatch();
  const { getUserProfileById } = useSelector((state) => state.users);
  const [currentTab, setCurrentTab] = useState(0);
  const [reasons, setReasons] = useState([]);
  const [moreinfo, setMoreInfo] = useState('');
  const [receiveUpdate, setReceiveUpdate] = useState(false);

  const listOfReasons = [
    'Impersonation',
    'Fruad or Scam',
    'Inappropriate Content',
    'Misinformation',
  ];

  const handleButtonClick = (buttonContent) => {
    if (reasons.includes(buttonContent)) {
      setReasons(reasons.filter((content) => content !== buttonContent));
    } else {
      setReasons([...reasons, buttonContent]);
    }
  };

  const handleChange = (event) => {
    setReceiveUpdate(event.target.checked);
  };

  const submitReport = () => {
    // console.log(reasons, moreinfo);
    const values = {
      reportUserId: getUserProfileById.data?.userId,
      reason: reasons.join(' , '),
      additionalReason: moreinfo,
    };

    dispatch(triggerReportUser(values));
    setCurrentTab(3);
  };

  const StepOne = () => {
    const [inputContent, setInputContent] = useState('');

    const handleInputAdd = () => {
      if (reasons.length < 1 && inputContent === '') {
        alert('Reason Required');
      } else {
        if (inputContent.trim() !== '') {
          setReasons([...reasons, inputContent]);
          setInputContent('');
        }

        setCurrentTab(currentTab + 1);
      }
    };
    return (
      <div>
        <div className='report-header'>Select a reasons(s) that apply</div>
        <div className='d-flex gap-3 flex-wrap my-3'>
          {listOfReasons.map((list, key) => {
            return (
              <button
                className={`reason-btn ${reasons.includes(list) && 'clicked'}`}
                onClick={() => handleButtonClick(list)}
                key={key}
              >
                {list}
              </button>
            );
          })}
        </div>
        <div>
          <div className='text-box-header'>Other</div>
          <form onSubmit={(e) => e.preventDefault()}>
            <input
              value={inputContent}
              onChange={(e) => setInputContent(e.target.value)}
              className='other-reason-input'
              type='text'
              placeholder='State reason'
            />

            <div className='text-center mt-5'>
              <button
                className='primary-btn small-btn'
                onClick={handleInputAdd}
              >
                Next
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  const StepTwo = () => {
    const [moreDetails, setMoreDetails] = useState('');
    const nextStep = () => {
      setCurrentTab(2);
      setMoreInfo(moreDetails);
    };
    return (
      <div>
        <div className='report-header'>Tell Us More</div>
        <div className='step-two-wrapper'>
          <p>
            {' '}
            We need your answer, so we can better understand what’s going on
            with this account’s profile.
          </p>
          <p>
            {' '}
            We take reports seriously. If we find a rule violation, we’ll either
            ask them to remove the content, temporarily or permanently block the
            account
          </p>
          <p>
            If there’s immediate danger, call your local emergency services, in
            addition to reporting.
          </p>

          <form onSubmit={(e) => e.preventDefault()}>
            <textarea
              id='more-details'
              value={moreDetails}
              onChange={(e) => setMoreDetails(e.target.value)}
              placeholder='Add further reason here'
              name=''
            ></textarea>
            <div className='text-center mt-3'>
              <button onClick={nextStep} className='primary-btn small-btn'>
                Next
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  const StepThree = () => {
    return (
      <div className='step-three-wrapper'>
        <div className='report-header'>
          You’ve selected the following reason
        </div>
        <ul>
          {reasons.map((reason, key) => {
            return <li key={key}>{reason}</li>;
          })}
        </ul>
        <div className='text-box-header mt-3'>
          Want to follow the status of your report
        </div>
        <div className='mt-2 checkbox-wrapper'>
          <input
            value={receiveUpdate}
            onChange={handleChange}
            type='checkbox'
            id='updatesCheckbox'
          />{' '}
          <label htmlFor='updatesCheckbox'>
            Receive updates on this report
          </label>
        </div>

        <div className='text-center mt-5'>
          <button onClick={submitReport} className='primary-btn small-btn'>
            Submit Report
          </button>
        </div>
      </div>
    );
  };

  const closeModal = () => {
    reportAction(false);
    setCurrentTab(0);
    setReasons([]);
    setMoreInfo('');
    setReceiveUpdate(false);
  };

  const FinalStep = () => {
    return (
      <div className='final-step-wrapper'>
        <div className='report-header'>Thank you for making this report</div>
        <p>
          {' '}
          We know it wasn’t easy, so we appreciate you taking the time to make
          this report.
        </p>

        <div>
          <div className='text-box-header'>What’s happening now</div>
          <p>
            Your report is in our queue. A member of our team will review your
            report and we will take neccessary actions.
          </p>
        </div>

        <div>
          <div className='text-box-header'>Additional things you can do</div>
          <p>
            Your report is in our queue. A member of our team will review your
            report and we will take neccessary actions.
          </p>
        </div>

        <div className='text-center mt-5'>
          <Link to='/' className='primary-btn small-btn'>
            Back to Home
          </Link>
        </div>
      </div>
    );
  };

  return (
    <div className={`report-content-wrapper ${!showReport && 'd-none'}`}>
      <div className='report-modal shadow-lg'>
        <div className='text-end'>
          <button onClick={closeModal}>
            <Icon icon='close' />
          </button>
        </div>
        <div>
          {currentTab <= 2 && (
            <Stepper
              className='register-stepper'
              steps={[{}, {}, {}]}
              activeStep={currentTab}
              connectorStateColors={true}
              styleConfig={{
                circleFontSize: '16px',
                size: '34px',
                completedBgColor: '#33246A',
                activeBgColor: '#33246A',
                inactiveBgColor: '#EFF0F6',
                inactiveTextColor: '#6F6C90',
              }}
              connectorStyleConfig={{
                completedColor: '#33246A',
                size: 4,
                disabledColor: '#EFF0F6',
                activeColor: '#33246A',
              }}
            />
          )}
        </div>
        {currentTab === 0 && <StepOne />}

        {currentTab === 1 && <StepTwo />}

        {currentTab === 2 && <StepThree />}
        {currentTab === 3 && <FinalStep />}
      </div>
    </div>
  );
};

export default ReportModal;
