import React, { useState } from 'react';
import '../../assets/scss/event.scss';
import InputBox from '../Molecules/InputBox';
import SubtractBtn from '../Molecules/SubtractBtn';
import AddBtn from '../Molecules/AddBtn';
import MainButton from '../Molecules/MainButton';
import { useDispatch } from 'react-redux';
import { bookEvent } from '../../Features/eventSlice';
const Booking = ({ setTab }) => {
  const [formData, setFormData] = useState({
    promo_code: '',
    general_admission: 0,
    general_admission_plus_merch: 0,
    general_admission_price: '£25',
    general_admission_plus_merch_price: '£35',
  });
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const dispatch = useDispatch();
  return (
    <div className='booking-wrapper'>
      <div className='booking-content-wrapper'>
        <div className='title'>
          <h3>Booking</h3>
        </div>
        <div className='main-content-wrapper'>
          <div className='event-info'>
            <h3 className=''>Black Girls In Tech Summer Mixer</h3>
            <p className=''>Saturday 22nd August 2023, 09:00PM</p>
          </div>
          <form action=''>
            <div className='promo-code'>
              <h5>Enter promocode</h5>
              <div className='input-wrapper'>
                <InputBox
                  name='promo_code'
                  onChange={handleChange}
                  value={formData.promocode}
                  placeholder={'Enter Promo Code'}
                />
              </div>
            </div>
            <div className='booking-box'>
              <div className='top-box'>
                <p>General Admission</p>
                <div className='btns'>
                  <SubtractBtn
                    onClick={() => {
                      if (formData.general_admission === 1) {
                        return;
                      }
                      setFormData({
                        ...formData,
                        general_admission: formData.general_admission - 1,
                      });
                    }}
                  />
                  <p>{formData.general_admission}</p>
                  <AddBtn
                    onClick={() => {
                      if (formData.general_admission === 10) {
                        return;
                      }
                      setFormData({
                        ...formData,
                        general_admission: formData.general_admission + 1,
                      });
                    }}
                  />
                </div>
              </div>
              <div className='bottom-box'>
                <p className='val'>{formData.general_admission_price}</p>
                <p className='info'>Sales end on 22nd August 2023, 08:00PM </p>
              </div>
            </div>
            <div className='booking-box last-child'>
              <div className='top-box'>
                <p>General Admission + Merch</p>
                <div className='btns'>
                  <SubtractBtn
                    onClick={() => {
                      if (formData.general_admission === 1) {
                        return;
                      }
                      setFormData({
                        ...formData,
                        general_admission_plus_merch:
                          formData.general_admission_plus_merch - 1,
                      });
                    }}
                  />
                  <p>{formData.general_admission_plus_merch}</p>
                  <AddBtn
                    onClick={() => {
                      if (formData.general_admission_plus_merch === 10) {
                        return;
                      }
                      setFormData({
                        ...formData,
                        general_admission_plus_merch:
                          formData.general_admission_plus_merch + 1,
                      });
                    }}
                  />
                </div>
              </div>
              <div className='bottom-box'>
                <p className='val'>
                  {formData.general_admission_plus_merch_price}
                </p>
                <p className='info'>Sales end on 22nd August 2023, 08:00PM </p>
              </div>
            </div>
            <div className='checkout-btn'>
              <MainButton
                text={'Check Out'}
                onClick={() => {
                  dispatch(bookEvent(formData));
                  setTab('checkout');
                }}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Booking;
