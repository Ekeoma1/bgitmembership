import React from "react";

const Icon = ({ icon }) => {
  if (icon === "chevronDown") {
    return (
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clip-path="url(#clip0_96_597)">
          <mask id="mask0_96_597" style={{ maskType: "luminance" }} maskUnits="userSpaceOnUse" x="0" y="0" width="12" height="12">
            <path d="M0 0H12V12H0V0Z" fill="white" />
          </mask>
          <g mask="url(#mask0_96_597)">
            <mask id="mask1_96_597" style={{ maskType: "luminance" }} maskUnits="userSpaceOnUse" x="0" y="0" width="12" height="12">
              <path d="M12 12L0 12L0 0L12 0L12 12Z" fill="white" />
            </mask>
            <g mask="url(#mask1_96_597)">
              <path
                d="M2 4.5L4.586 7.086C5.2525 7.7525 5.586 8.086 6 8.086C6.414 8.086 6.7475 7.7525 7.414 7.086L10 4.5"
                stroke="black"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M2 4.5L4.586 7.086C5.2525 7.7525 5.586 8.086 6 8.086C6.414 8.086 6.7475 7.7525 7.414 7.086L10 4.5"
                stroke="black"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </g>
          </g>
        </g>
        <defs>
          <clipPath id="clip0_96_597">
            <rect width="12" height="12" fill="white" />
          </clipPath>
        </defs>
      </svg>
    );
  } else if (icon === "menu") {
    return (
      <svg width="18" height="12" viewBox="0 0 18 12" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M0.666992 1.00008C0.666992 0.539844 1.04009 0.166748 1.50033 0.166748H16.5003C16.9606 0.166748 17.3337 0.539844 17.3337 1.00008C17.3337 1.46032 16.9606 1.83341 16.5003 1.83341H1.50033C1.04009 1.83341 0.666992 1.46032 0.666992 1.00008Z"
          fill="#2D3648"
        />
        <path
          d="M0.666992 6.00008C0.666992 5.53984 1.04009 5.16675 1.50033 5.16675H16.5003C16.9606 5.16675 17.3337 5.53984 17.3337 6.00008C17.3337 6.46032 16.9606 6.83341 16.5003 6.83341H1.50033C1.04009 6.83341 0.666992 6.46032 0.666992 6.00008Z"
          fill="#2D3648"
        />
        <path
          d="M1.50033 10.1667C1.04009 10.1667 0.666992 10.5398 0.666992 11.0001C0.666992 11.4603 1.04009 11.8334 1.50033 11.8334H16.5003C16.9606 11.8334 17.3337 11.4603 17.3337 11.0001C17.3337 10.5398 16.9606 10.1667 16.5003 10.1667H1.50033Z"
          fill="#2D3648"
        />
      </svg>
    );
  } else if (icon === "chevronRight") {
    return (
      <svg width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M0.869701 0.771484L5.06152 4.96331L0.869701 9.15513"
          stroke="#33246A"
          stroke-width="0.993679"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    );
  } else {
    return "";
  }
};

export default Icon;
