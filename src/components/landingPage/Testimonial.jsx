import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Imag1 from "../../assets/images/person1.png";
import Imag2 from "../../assets/images/person2.png";
import Imag3 from "../../assets/images/person3.png";

const Testimonial = () => {
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 2.5,
    },
    tablet: {
      breakpoint: { max: 800, min: 464 },
      items: 1.3,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  const testimonies = [
    {
      name: "Abby Joe",
      title: `“I’ve had numerous opportunities”`,
      content:
        "As a member of BGIT, I have had numerous possibilities. From securing a bootcamp spot to assisting me in securing my first IT job as a Data Analyst. ",
      role: "Data Analyst at Google",
      image: Imag1,
    },

    {
      name: "Adam Smith",
      title: `“BGIT is the best community”`,
      content:
        "BGIT is the best community for women like me to pursue a career in technology. The community has been extremely supportive and contributed to my career.",
      role: "Webflow Developer",
      image: Imag2,
    },

    {
      name: "Jenny James",
      title: `“ I give back to the community”`,
      content: "Formerly a member of the BGIT Bootcamp, I now serve the community as a front-end developer, instructing sessions, etc. ",
      role: "Developer at DIWPC",
      image: Imag3,
    },
  ];

  const CustomDot = ({ onClick, ...rest }) => {
    const { active } = rest;
    return <button className={` testimonial-dot ${active ? "active" : "inactive"}`} onClick={() => onClick()}></button>;
  };

  return (
    <section className="testimonial-section">
      <div className="container">
        <header>
          <h2>“What our members have to say”</h2>
        </header>

        <div className="carousel-wrapper">
          <Carousel
            dotListClass="testimonial-dot-wrapper d-lg-none"
            removeArrowOnDeviceType={["mobile"]}
            showDots
            customDot={<CustomDot />}
            responsive={responsive}
            renderDotsOutside={true}
          >
            {testimonies.map((info, key) => {
              return (
                <div key={key} className="testimonial-card">
                  <h3 className="testimonial-card-header">{info.title}</h3>
                  <p className="mt-3 testimonial-card-body">{info.content}</p>

                  <div className="d-flex gap-2 align-items-center">
                    <div style={{ backgroundImage: `url(${info.image})` }} className="pic-image"></div>
                    <div className="person-details">
                      <div className="name">{info.name}</div>
                      <div className="role">{info.role}</div>
                    </div>
                  </div>
                </div>
              );
            })}
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default Testimonial;
