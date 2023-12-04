// PrintButton.js
import React from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf"; // Import the jsPDF library

const PrintButton = ({ targetElementId, fileName = "download.pdf" }) => {
  const handlePrint = () => {
    const elementToPrint = document.getElementById(targetElementId);

    html2canvas(elementToPrint).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");

      const pdf = new jsPDF();
      pdf.addImage(imgData, "PNG", 10, 10, 190, 0);

      pdf.save(fileName);

      // If you want to open the print dialog directly
      //   pdf.autoPrint();

      // If you want to close the print dialog automatically
      window.close();
    });
  };

  return (
    <button className="primary-btn small-btn" onClick={handlePrint}>
      Print
    </button>
  );
};

export default PrintButton;
