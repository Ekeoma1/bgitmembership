import { useState } from "react";

const blockedList = [
  {
    name: "Janet Roch",
    role: "Freelance UX/UI Designer",
  },
  {
    name: "Abie Ansah",
    role: "UX Design Enthusiast",
  },
  {
    name: "Clare David",
    role: "Senior User Researcher",
  },
];

const BlockedUser = () => {
  const [actionModal, setActionModal] = useState(false);
  return (
    <div className="mt-4">
      <p>When you block someone, they won’t be able to follow or message you and you won’t see notifications from them.</p>

      {blockedList.map((list, key) => {
        return (
          <div key={key} className="mt-3 d-flex justify-content-between align-items-center flex-wrap">
            <div className="d-flex flex-wrap align-items-center gap-3">
              <div className="blocked-user-img bg-danger"></div>

              <div className="blocked-user-details">
                <div className="name">{list.name}</div>
                <div className="role">{list.role}</div>
              </div>
            </div>

            <button onClick={() => setActionModal(true)} className="unblock-btn">
              Unblock
            </button>
          </div>
        );
      })}

      <div className={`unblock-modal ${!actionModal && "d-none"}`}>
        <div className="text-center">Are you sure you want to unblock this person?</div>

        <div className="d-flex justify-content-center flex-wrap align-items-center gap-3 mt-3">
          <div className="blocked-user-img bg-danger"></div>

          <div className="blocked-user-details">
            <div className="name">Joah Roach</div>
            <div className="role">UI/UX professional</div>
          </div>
        </div>

        <div className="mt-3 d-flex justify-content-center gap-3 flex-wrap">
          <button className="secondary-btn small-btn">Yes</button>
          <button onClick={() => setActionModal(false)} className="primary-btn small-btn">
            No
          </button>
        </div>
      </div>
    </div>
  );
};

export default BlockedUser;
