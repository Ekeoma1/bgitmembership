import React, { useEffect, useRef, useState } from 'react';
import '../../assets/scss/event.scss';
import InputBox from '../Molecules/InputBox';
import MainButton from '../Molecules/MainButton';
import { useSelector } from 'react-redux';
const Checkout = ({ setTab }) => {
  const { bookEventData } = useSelector((state) => state.event);
  const [formData, setFormData] = useState({
    payment_method: '',
    card_number: '',
    expiration_date: '',
    security_code: '',
    post_code: '',
    first_name: '',
    last_name: '',
    email: '',
    confirm_email: '',
  });
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const getTotal = () => {
    const {
      general_admission,
      general_admission_price,
      general_admission_plus_merch,
      general_admission_plus_merch_price,
    } = bookEventData;

    const admissionPrice = general_admission_price.split('£')[1];
    const admissionPlusMerchPrice =
      general_admission_plus_merch_price.split('£')[1];
    const total =
      Number(admissionPrice) * general_admission +
      Number(admissionPlusMerchPrice) * general_admission_plus_merch;
    return total;
  };
  const [insideBoxContainerHeight, setInsideBoxContainerHeight] = useState(0);
  const insideBoxContainer = useRef(null);
  useEffect(() => {
    if (insideBoxContainer.current) {
      const height = insideBoxContainer.current.getBoundingClientRect().height;
      setInsideBoxContainerHeight(height);
      console.log(height);
    }
  }, [formData.payment_method]);

  console.log(formData);
  return (
    <div className='checkout-wrapper'>
      <div className='checkout-content-wrapper'>
        <div className='title'>
          <h3>Checkout</h3>
        </div>
        <div className='main-content-wrapper'>
          <div className='event-info'>
            <h3 className=''>Black Girls In Tech Summer Mixer</h3>
            <p className=''>Saturday 22nd August 2023, 09:00PM</p>
          </div>
          <div className='order-summary'>
            <div className='con'>
              <h3>Order Summary</h3>
              <div className='detail'>
                <p>{bookEventData.general_admission} x General Admission </p>
                <p>{bookEventData.general_admission_price}</p>
              </div>
              <div className='detail'>
                <p>
                  {bookEventData.general_admission_plus_merch} x General
                  Admission
                </p>
                <p>{bookEventData.general_admission_plus_merch_price}</p>
              </div>
            </div>
            <div className='total'>
              <p>Total </p>
              <p>{`£${getTotal()}`}</p>
            </div>
          </div>
          <div className='billing-info'>
            <h3>Billing Information</h3>
            <div className='section-wrapper'>
              <div className='con'>
                <p>First Name</p>
                <div className='input-wrapper'>
                  <InputBox
                    name='first_name'
                    onChange={handleChange}
                    value={formData.first_name}
                    placeholder={'First Name'}
                  />
                </div>
              </div>
              <div className='con'>
                <p>Last Name</p>
                <div className='input-wrapper'>
                  <InputBox
                    name='last_name'
                    onChange={handleChange}
                    value={formData.last_name}
                    placeholder={'Last Name'}
                  />
                </div>
              </div>
              <div className='con'>
                <p>Email</p>
                <div className='input-wrapper'>
                  <InputBox
                    name='email'
                    onChange={handleChange}
                    value={formData.email}
                    placeholder={'Email'}
                  />
                </div>
              </div>
              <div className='con'>
                <p>Confirm Email</p>
                <div className='input-wrapper'>
                  <InputBox
                    name='confirm_email'
                    onChange={handleChange}
                    value={formData.confirm_email}
                    placeholder={'Confirm Email'}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className='payment-method'>
            <h3>Payment Method</h3>
            <div className='section-wrapper'>
              <div className='section-box'>
                <div className='top-box'>
                  <input
                    className='input-radio'
                    type='radio'
                    name='payment_method'
                    id='payment_method'
                    value={'card'}
                    checked={formData.payment_method === 'card'}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        [e.target.name]: e.target.value,
                      })
                    }
                  />
                  <p>Credit or Debit Card</p>
                </div>
                <div
                  style={{
                    height:
                      formData.payment_method === 'card'
                        ? `${insideBoxContainerHeight}px`
                        : '0px',
                  }}
                  className={`inside-box-wrapper`}
                >
                  <div className='inside-box-content' ref={insideBoxContainer}>
                    <div className='top'>
                      <div className='input-wrapper'>
                        <InputBox
                          name='card_number'
                          onChange={handleChange}
                          value={formData.card_number}
                          placeholder={'Card Number'}
                        />
                      </div>
                    </div>

                    <div className='bottom'>
                      <div className='input-wrapper'>
                        <InputBox
                          name='expiration_date'
                          onChange={handleChange}
                          value={formData.expiration_date}
                          placeholder={'Expiration Date'}
                        />
                      </div>
                      <div className='input-wrapper'>
                        <InputBox
                          name='security_code'
                          onChange={handleChange}
                          value={formData.security_code}
                          placeholder={'Security Code'}
                        />
                      </div>
                      <div className='input-wrapper'>
                        <InputBox
                          name='post_code'
                          onChange={handleChange}
                          value={formData.post_code}
                          placeholder={'Post Code'}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className='section-box last-child'>
                <div className='top-box'>
                  <input
                    className='input-radio'
                    type='radio'
                    name='payment_method'
                    id='payment_method'
                    value={'paypal'}
                    checked={formData.payment_method === 'paypal'}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        [e.target.name]: e.target.value,
                        card_number: '',
                        expiration_date: '',
                        security_code: '',
                        post_code: '',
                      })
                    }
                  />
                  <p>PayPal</p>
                </div>
              </div>
            </div>
          </div>
          <div className='checkout-btn'>
            <MainButton
              text={'Place Order'}
              onClick={() => {
                setTab('order-success');
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
