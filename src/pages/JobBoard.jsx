import React, { useEffect, useState } from "react";
import SearchBox from "../components/Molecules/SearchBox";
import google from "../../src/assets/images/google.svg";
import Icon from "../components/Icon";
import { HiOutlineChevronDown, HiOutlineChevronLeft, HiOutlineChevronRight } from "react-icons/hi";
import { VscSettings } from "react-icons/vsc";
import useWindowSize from "../hooks/useWindowSize";
import "../../src/assets/scss/jobBoard.scss";
import JobInfoCard from "../components/Molecules/JobInfoCard";
import { useDispatch, useSelector } from "react-redux";
import { triggerGetAllJobs } from "../Features/jobs/jobs_slice";
import JobCard from "../components/Molecules/JobCard";
import Apply from "../components/Job-Board/Apply";
import { triggerGetMyProfile } from "../Features/users/users_slice";
import JobCardsLoader from "../components/Atoms/skeleton-loaders/job-board-page/JobCardsLoader";

const JobBoard = () => {
  const { isMobile } = useWindowSize();
  const { getAllJobs } = useSelector((state) => state.jobs);
  const { getMyProfile } = useSelector((state) => state.users);
  const [searchValue, setSearchValue] = useState("");
  const [showJobInfo, setShowJobInfo] = useState(false);
  const [jobSelected, setJobSelected] = useState({});
  const [filter, setFilter] = useState(false);
  const [apply, setApply] = useState(false);
  const [mobileTab, setMobileTab] = useState("for you");
  const onChange = (e) => {
    setSearchValue(e.target.value);
  };
  const jobsData = [
    {
      id: 1,
      role: "UX Designer",
      company: "Google",
      location: "London (Hybrid)",
      currency: "$",
      price: "45000",
      type: "Contract",
      timePosted: "Just posted",
      status: "Applied 2 days ago",
    },
    {
      id: 2,
      role: "Data Analyst",
      company: "Google",
      location: "London (Hybrid)",
      currency: "$",
      price: "29500",
      type: "Contract",
      timePosted: "Just posted",
      status: "Posted 2 days ago",
    },
    {
      id: 3,
      role: "Software Engineer",
      company: "Apple",
      location: "Berlin (Hybrid)",
      currency: "$",
      price: "55500",
      type: "Contract",
      timePosted: "Just posted",
      status: "Application closed",
    },
    {
      id: 4,
      role: "Cyber security",
      company: "Amazon",
      location: "Paris (Hybrid)",
      currency: "$",
      price: "60000",
      type: "Contract",
      timePosted: "Just posted",
      status: "Posted 2 days",
    },
    {
      id: 5,
      role: "Cyber security",
      company: "Amazon",
      location: "Paris (Hybrid)",
      currency: "$",
      price: "60000",
      type: "Contract",
      timePosted: "Just posted",
      status: "Posted 2 days",
    },
  ];
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(triggerGetAllJobs());
    dispatch(triggerGetMyProfile());
  }, []);
  console.log("get my profile", getMyProfile);

  return (
    <div className="job-board-wrapper">
      <div className="search-box-section mx-auto">
        <div className="search-box-component-wrapper">
          <SearchBox onChange={onChange} value={searchValue} placeholder="Search" />
        </div>
        <button
          onClick={() => {
            setFilter(!filter);
            setShowJobInfo(false);
            // if (isMobile) {
            // }
          }}
          type="submit"
          className="primary-btn small-btn  filter-btn"
        >
          <VscSettings />
          Filter
          <HiOutlineChevronDown />
        </button>
      </div>
      {!filter && (
        <div className="tab-btns">
          <button onClick={() => setMobileTab("for you")} className={`${mobileTab === "for you" ? "active" : "inactive"}`}>
            For you
          </button>
          <button
            onClick={() => {
              setMobileTab("saved jobs");
              setShowJobInfo(false);
            }}
            className={`${mobileTab === "saved jobs" ? "active" : "inactive"}`}
          >
            Saved Jobs
          </button>
        </div>
      )}
      {!apply && (
        <div className="main-section">
          <div className={`recommended-filters-section ${isMobile && showJobInfo && "hide"} ${filter && "recommended-filters-section2"}`}>
            {!filter && (
              <div className="recommended">
                <div className="section-title">
                  <h5>Recommended for you</h5>
                  {mobileTab === "for you" && <p className="show-mobile">Jobs based on your interest</p>}
                </div>
                <div
                  className={` cards ${isMobile ? (mobileTab === "for you" ? " show " : "hide") : ""} 
                  `}
                >
                  {getAllJobs.status === "loading" ? (
                    <>
                      <JobCardsLoader />
                    </>
                  ) : getAllJobs.status === "successful" ? (
                    <>
                      {getAllJobs?.data?.jobs?.length === 0 ? (
                        <></>
                      ) : (
                        <>
                          {getAllJobs?.data?.jobs?.map((job, index) => (
                            <JobCard
                              key={index}
                              job={job}
                              jobSelected={jobSelected}
                              setJobSelected={setJobSelected}
                              setShowJobInfo={setShowJobInfo}
                            />
                          ))}
                        </>
                      )}
                    </>
                  ) : (
                    <></>
                  )}
                </div>
              </div>
            )}
            {filter && (
              <div className="filters">
                <div className="arrow" onClick={() => setFilter(false)}>
                  <div className="hide-mobile">
                    <Icon icon={"arrowLeft"} />
                  </div>
                  <div className="show-mobile">
                    {/* <Icon icon={'chevronLeft'} /> */}
                    <HiOutlineChevronLeft />
                    <h5 className="">filters</h5>
                  </div>
                </div>
                <div className="main">
                  <div className="section-title">
                    <h5>filters</h5>
                  </div>
                  <div className="sec">
                    <div className="group">
                      <h5 className="title">Job Mode</h5>
                      <div className="options-con">
                        <div className="option">
                          <input name="remote" id="remote" type="checkbox" className="" />
                          <label htmlFor="remote">Remote</label>
                        </div>
                        <div className="option">
                          <input name="hybrid" id="hybrid" type="checkbox" className="" />
                          <label htmlFor="hybrid">Hybrod</label>
                        </div>
                        <div className="option">
                          <input name="on-site" id="on-site" type="checkbox" className="" />
                          <label htmlFor="on-site">On-site</label>
                        </div>
                      </div>
                    </div>
                    <div className="group">
                      <h5 className="title">Sort By</h5>
                      <div className="options-con">
                        <div className="option">
                          <input name="sort-by" id="relevance" type="radio" className="" />
                          <label htmlFor="relevance">Relevance</label>
                        </div>
                        <div className="option">
                          <input name="sort-by" id="date" type="radio" className="" />
                          <label htmlFor="date">Date</label>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="sec">
                    <div className="group">
                      <h5 className="title">Date posted</h5>
                      <div className="options-con">
                        <div className="option">
                          <input name="date-posted" id="last-24-hours" type="radio" className="" />
                          <label htmlFor="last-24-hours">Last 24 hours</label>
                        </div>
                        <div className="option">
                          <input name="date-posted" id="last-3-days" type="radio" className="" />
                          <label htmlFor="last-3-days">Last 3 days</label>
                        </div>
                        <div className="option">
                          <input name="date-posted" id="last-7-days" type="radio" className="" />
                          <label htmlFor="last-7-days">Last 7 days</label>
                        </div>
                        <div className="option">
                          <input name="date-posted" id="last-14-days" type="radio" className="" />
                          <label htmlFor="last-14-days">Last 14 days</label>
                        </div>
                      </div>
                    </div>
                    <div className="group">
                      <h5 className="title">Salary</h5>
                      <div className="options-con">
                        <div className="option">
                          <input name="salary" id="all-salaries" type="radio" className="" />
                          <label htmlFor="all-salary">All salaries</label>
                        </div>
                        <div className="option">
                          <input name="salary" id="$20,000" type="radio" className="" />
                          <label htmlFor="$20,000">$20,000</label>
                        </div>
                        <div className="option">
                          <input name="salary" id="$30,000" type="radio" className="" />
                          <label htmlFor="$30,000">$30,000</label>
                        </div>
                        <div className="option">
                          <input name="salary" id="$40,000" type="radio" className="" />
                          <label htmlFor="$40,000">$40,000</label>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="sec">
                    <div className="group">
                      <h5 className="title">Job Type</h5>
                      <div className="options-con">
                        <div className="option">
                          <input name="full-time" id="full-time" type="checkbox" className="" />
                          <label htmlFor="full-time">Full-time</label>
                        </div>
                        <div className="option">
                          <input name="part-time" id="part-time" type="checkbox" className="" />
                          <label htmlFor="part-time">Part-time</label>
                        </div>
                        <div className="option">
                          <input name="permanent" id="permanent" type="checkbox" className="" />
                          <label htmlFor="permanent">Permanent</label>
                        </div>
                        <div className="option">
                          <input name="contract" id="contract" type="checkbox" className="" />
                          <label htmlFor="contract">contract</label>
                        </div>
                        <div className="option">
                          <input name="temporary" id="temporary" type="checkbox" className="" />
                          <label htmlFor="temporary">temporary</label>
                        </div>
                        <div className="option">
                          <input name="apprenticeship" id="apprenticeship" type="checkbox" className="" />
                          <label htmlFor="apprenticeship">apprenticeship</label>
                        </div>
                        <div className="option">
                          <input name="internship" id="internship" type="checkbox" className="" />
                          <label htmlFor="internship">internship</label>
                        </div>
                        <div className="option">
                          <input name="volunteer" id="volunteer" type="checkbox" className="" />
                          <label htmlFor="volunteer">volunteer</label>
                        </div>
                      </div>
                    </div>
                    <div className="">
                      <div className="group">
                        <h5 className="title">Experience Level</h5>
                        <div className="options-con">
                          <div className="option">
                            <input name="experience-level" id="internship-experience-level" type="radio" className="" />
                            <label htmlFor="internship-experience-level">internship</label>
                          </div>
                          <div className="option">
                            <input name="experience-level" id="entry-level" type="radio" className="" />
                            <label htmlFor="entry-level">entry level</label>
                          </div>
                          <div className="option">
                            <input name="experience-level" id="associate" type="radio" className="" />
                            <label htmlFor="associate">associate</label>
                          </div>
                          <div className="option">
                            <input name="experience-level" id="mid-level" type="radio" className="" />
                            <label htmlFor="mid-level">mid level</label>
                          </div>
                          <div className="option">
                            <input name="experience-level" id="senior-level" type="radio" className="" />
                            <label htmlFor="senior-level">Senior level</label>
                          </div>
                        </div>
                      </div>
                      <div className="group filter-by-location">
                        <h5 className="title">Filter by location</h5>
                        <div className="options-con">
                          <div className="range">
                            <input
                              name="experience-level"
                              id="location"
                              type="range"
                              className=""
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
                  <div className="save d-flex justify-center mt-4">
                    <button
                      onClick={() => {
                        setFilter(false);
                        //   if (isMobile) {
                        //     setShowJobInfo(false);
                        //   }
                      }}
                      className="primary-btn small-btn  filter-btn"
                    >
                      Save
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className={`saved-jobs-job-info-section ${filter && "saved-jobs-job-info-section2"}`}>
            {!showJobInfo && (
              <div
                className={` saved-jobs-section ${filter && "saved-jobs-section2 "}  ${
                  isMobile ? (mobileTab === "saved jobs" ? " show " : "hide") : ""
                } `}
              >
                <div className="section-title">
                  <h5>saved jobs</h5>
                </div>
                <div className="saved-jobs">
                  {jobsData.map((item, index) => (
                    <div key={index} className="saved-job">
                      <div className="img-con">
                        <img src={google} alt="company" className="" />
                      </div>
                      <div className="info">
                        <div className="details">
                          <div className="">
                            <h5 className="">{item.role}</h5>
                            <p className="company">{item.company}</p>
                            <p className="location">{item.location}</p>
                          </div>
                          <span className="status">{item.status}</span>
                        </div>
                        <div className="btn-con">
                          <HiOutlineChevronRight />
                        </div>
                      </div>
                    </div>
                  ))}
                  <div className="saved-job">
                    <div className="img-con">
                      <img src={google} alt="company" className="" />
                    </div>
                    <div className="info">
                      <div className="details">
                        <div className="">
                          <h5 className="">Data Analyst </h5>
                          <p className="company">Google</p>
                          <p className="location">London (Hybrid)</p>
                        </div>
                        <span className="status">Applied 2 days ago</span>
                      </div>
                      <div className="btn-con">
                        <HiOutlineChevronRight />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {showJobInfo && (
              <JobInfoCard jobSelected={jobSelected} setShowJobInfo={setShowJobInfo} setApply={setApply} setJobSelected={setJobSelected} />
            )}
          </div>
        </div>
      )}
      {apply && <Apply setApply={setApply} jobSelected={jobSelected} />}
    </div>
  );
};

export default JobBoard;
