import React from 'react';
import Fb from '../../assets/images/logos_facebook.png';
import { useSelector } from 'react-redux';

const socialLinks = [
  {
    logo: Fb,
    link: 'facebook.com/claire.jenkins',
  },
];

const SocialLinksCard = ({ othersView }) => {
  const { getMyProfile } = useSelector((state) => state.users);
  return (
    <div className='dashboard-card'>
      <div className='dashboard-header'>Social Links</div>
      {getMyProfile.data.socials?.length > 0 ? (
        <>
          {getMyProfile.data.socials?.map((link, key) => {
            return (
              <div key={key} className='d-flex gap-1 align-items-center mt-1'>
                <img width={30} src={link.logo} alt='logo' />
                <span className='dashboard-text'>{link.link}</span>
              </div>
            );
          })}
        </>
      ) : (
        <>
          <div className='dashboard-text'>
            You have not added any social link yet
          </div>
        </>
      )}

      {!othersView && (
        <div className='text-center'>
          <button className='add-text-btn'>+Add Social Links</button>
        </div>
      )}
    </div>
  );
};

export default SocialLinksCard;
