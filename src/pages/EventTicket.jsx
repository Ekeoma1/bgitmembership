import { HiArrowLeft } from "react-icons/hi";
import { Link, useNavigate } from "react-router-dom";
import "../assets/scss/event.scss";

const EventTicket = () => {
  const navigate = useNavigate();

  return (
    <div className="event-ticket-page">
      <div className="container">
        <button onClick={() => navigate(-1)}>
          <HiArrowLeft className="text-color22" />
        </button>

        <div className="profile-wrapper">
          <div className="profile-pic"></div>
          <div>
            <h3>Claire Jenkins</h3>
            <div className="no-of-orders">2 orders</div>
          </div>
        </div>

        <div className="">
          <h4>Orders</h4>

          <Link to="1">
            <div className="order-detail-wrapper">
              <div className="order-date">
                <span className="month">Oct</span>
                <span className="day">8</span>
              </div>
              <div className="order-img"></div>
              <div className="order-info">
                <h4>BGIT Staycation</h4>
                <div className="other-info">Tue, October 8, 18:00</div>
                <div className="other-info">Free order no 89405736578 placed on Nov 14 18:00</div>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EventTicket;
