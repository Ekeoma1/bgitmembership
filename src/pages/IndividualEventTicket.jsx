import { HiArrowLeft } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import PrintButton from "../components/PrintButton";

const IndividualEventTicket = () => {
  const navigate = useNavigate();
  return (
    <div className="event-ticket-page">
      <div className="container">
        <button onClick={() => navigate(-1)}>
          <HiArrowLeft className="text-color22" />
        </button>

        <h2>Order for Black Girls In Tech Summer Mixer</h2>

        <div className="ticket-details-wrapper">
          <div>
            <div className="serial-details">
              Free order #89405736578 on 20 Jul 2023 Event information: Tuesday, 14 November 22nd August 2023, 18:00 - 21:00PM London EC2A 2FA
            </div>

            <PrintButton targetElementId="elementId" fileName="Ticket name" />

            <div className="mt-4">
              <button className="secondary-btn small-btn">Cancel Order</button>
            </div>
          </div>

          <div id="elementId" className="general-admission-wrapper">
            <div>
              <h4>General Admission</h4>
              <hr />
            </div>

            <div className="general-admission-info">
              <div className="title">
                First Name <span className="text-danger">*</span>
              </div>
              <div className="info">Claire</div>
            </div>

            <div className="general-admission-info">
              <div className="title">
                SurName <span className="text-danger">*</span>
              </div>
              <div className="info">Jenkins</div>
            </div>

            <div className="general-admission-info">
              <div className="title">
                Email <span className="text-danger">*</span>
              </div>
              <div className="info">clairejenkins@gmail.com</div>
            </div>

            <div className="general-admission-info">
              <div className="title">
                Delivery Method <span className="text-danger">*</span>
              </div>
              <div className="info">eTickets</div>
            </div>

            <div className="general-admission-info">
              <div className="title">
                Mobile Number <span className="text-danger">*</span>
              </div>
              <div className="info">07868162723</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IndividualEventTicket;
