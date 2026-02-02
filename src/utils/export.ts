import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import logoHongLeongDesktop from '../assets/logo-hong-leong-desktop.png';

// Preload logo image
async function preloadLogo(): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = logoHongLeongDesktop;
  });
}

export async function exportToPDF(elementId: string, filename: string = 'loan-analysis-report.pdf') {
  const element = document.getElementById(elementId);
  if (!element) {
    throw new Error('Element not found');
  }

  // Find all page sections
  const pageSections = Array.from(element.querySelectorAll('[data-page]'));

  if (pageSections.length === 0) {
    // No page sections, use original logic
    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      logging: false,
    });

    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');

    const imgWidth = 210;
    const pageHeight = 297;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    let heightLeft = imgHeight;
    let position = 0;

    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;

    while (heightLeft >= 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }

    pdf.save(filename);
    return;
  }

  // Handle multiple pages by capturing each page section separately
  const pdf = new jsPDF('p', 'mm', 'a4');

  // Preload logo image
  const logoImg = await preloadLogo();

  // PDF margins in mm
  const marginLeft = 15;
  const marginRight = 15;
  const marginTop = 38; // Content starts after header

  const pageWidth = 210; // A4 width in mm
  const imgWidth = pageWidth - marginLeft - marginRight;

  // Helper function to add header to a page
  const addHeader = () => {
    // Add logo - maintaining aspect ratio (220x40 = 5.5:1)
    const logoWidth = 50;
    const logoHeight = 9; // 50 / 5.5 ≈ 9
    pdf.addImage(logoImg, 'PNG', 9, 10, logoWidth, logoHeight);

    // Add title
    pdf.setFontSize(12);
    pdf.setFont('helvetica', 'bold');
    pdf.text('Loan Analysis Report', marginLeft, 24);

    // Add generated date below title as subtitle
    const generatedDate = new Date().toLocaleDateString('en-MY', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    });
    pdf.setFontSize(9);
    pdf.setFont('helvetica', 'normal');
    pdf.setTextColor(128, 128, 128);
    pdf.text(`Generated on ${generatedDate}`, marginLeft, 30);
    pdf.setTextColor(0, 0, 0); // Reset to black

    // Add separator line
    pdf.setDrawColor(200, 200, 200);
    pdf.setLineWidth(0.5);
    pdf.line(marginLeft, 33, pageWidth - marginRight, 33);
  };

  for (let i = 0; i < pageSections.length; i++) {
    const section = pageSections[i] as HTMLElement;

    // Add new page for subsequent sections
    if (i > 0) {
      pdf.addPage();
    }

    // Add header to this page
    addHeader();

    // Capture this section
    const canvas = await html2canvas(section, {
      scale: 2,
      useCORS: true,
      logging: false,
      backgroundColor: '#ffffff',
    });

    const imgData = canvas.toDataURL('image/png');
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    // Add to PDF with margins
    pdf.addImage(imgData, 'PNG', marginLeft, marginTop, imgWidth, imgHeight);
  }

  pdf.save(filename);
}
