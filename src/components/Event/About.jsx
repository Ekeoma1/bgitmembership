import React from 'react';
import bgitlogo from '../../assets/images/bgit-logo.svg';
import { LuCalendarDays } from 'react-icons/lu';
import { MdOutlineLocationOn } from 'react-icons/md';
import '../../assets/scss/event.scss';
import Tag from '../Atoms/Tag';
const About = ({ setTab }) => {
  return (
    <div className='about-wrapper'>
      <div className='about-content-wrapper'>
        <div className='details'>
          <div className='event-details-card'>
            <h3 className='title'>Black Girls In Tech Summer Mixer</h3>
            <div className='info'>
              <div className='date-wrapper'>
                <LuCalendarDays className='icon' />
                <div className=''>
                  <h5 className=''>Date</h5>
                  <p className=''>Saturday, 22nd August 2023, 09:00PM </p>
                </div>
              </div>
              <div className='location-wrapper'>
                <MdOutlineLocationOn className='icon' />
                <div className=''>
                  <h5 className=''>Location</h5>
                  <p className=''>Saturday, 22nd August 2023, 09:00PM </p>
                </div>
              </div>
            </div>
          </div>
          <div className='about'>
            <h3 className='title'>About</h3>
            <div className='info'>
              <p>
                Welcome to the EmpowerTech Summer Mixer - an exhilarating
                celebration of brilliance, innovation, and sisterhood for Black
                women in the world of technology! Join us at the EmpowerTech
                Summer Mixer and be a part of the movement that elevates Black
                women in tech to new heights.
              </p>
              <p>
                Our mission is to unite and uplift a community of trailblazing
                Black women who are driving change and making waves in the tech
                industry. This event is designed to foster meaningful
                connections, inspire creativity, and empower one another to
                reach new heights in our careers and personal growth.
              </p>
              <p>
                At EmpowerTech, we recognize the unique challenges and triumphs
                faced by Black women in the tech field. This gathering is a safe
                and inclusive space where we can share experiences, exchange
                knowledge, and explore the limitless possibilities that lie
                ahead. Our aim is to strengthen bonds between like-minded
                professionals, encouraging collaboration, mentorship, and
                networking that will lead to even greater accomplishments.
              </p>
              <p>
                Throughout the Summer Mixer, we have curated an exciting lineup
                of inspiring speakers, visionary leaders, and accomplished
                experts who will share their stories, insights, and wisdom.
                Prepare to be captivated by captivating keynote talks,
                thought-provoking panel discussions, and engaging workshops, all
                designed to cultivate innovation and resilience in our tech
                careers.
              </p>
              <p>
                Whether you're a seasoned industry veteran, a budding
                entrepreneur, or an ambitious student, the EmpowerTech Summer
                Mixer offers something for everyone. Learn from the best,
                exchange ideas, and discover the latest trends that will keep
                you at the forefront of tech's ever-evolving landscape.
              </p>
              <p>
                But it's not all business at EmpowerTech! We understand the
                importance of unwinding and having fun. Join us for vibrant
                entertainment, interactive activities, and delightful
                refreshments that will create an unforgettable summer
                experience.
              </p>
              <p>
                Let's come together, celebrate our accomplishments, and chart a
                course for an even brighter future. EmpowerTech's Summer Mixer
                promises to be an event where you can forge lifelong
                friendships, forge valuable professional connections, and leave
                feeling invigorated and motivated to take on the world.
              </p>
              <p>
                Together, we'll shatter glass ceilings, conquer challenges, and
                create a thriving and inclusive tech industry that represents
                the true diversity of talent and brilliance within our
                community. See you there!
              </p>
            </div>
          </div>
          <div className='tags'>
            <h3 className='title'>Tags</h3>
            <div className='tags-wrapper'>
              <Tag text={'Summer'} />
              <Tag text={'London'} />
              <Tag text={'Interactive'} />
              <Tag text={'Interactive'} />
              <Tag text={'Interactive'} />
              <Tag text={'Workshop'} />
              <Tag text={'Workshop'} />
              <Tag text={'Workshop'} />
              <Tag text={'Workshop'} />
              <Tag text={'Workshop'} />
              <Tag text={'Workshop'} />
              <Tag text={'Workshop'} />
            </div>
          </div>
          <div className='event-creator'>
            <h3 className='title'>Event creators</h3>
            <div className='info'>
              <div className='img-con'>
                <img src={bgitlogo} alt='creator-logo' className='' />
              </div>
              <h5>BGIT Team</h5>
            </div>
          </div>
        </div>
        <div className='price'>
          <div className='price-card'>
            <h3 className='title'>Price</h3>
            <h5>From $25.00</h5>
            <button onClick={() => setTab('booking')}>Get tickets</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
