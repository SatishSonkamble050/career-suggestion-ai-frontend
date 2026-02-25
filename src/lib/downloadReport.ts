/**
 * Download Report Utility
 * Path: src/lib/downloadReport.ts
 * 
 * Handles downloading the career report in PDF format with styling preserved
 */

import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

/**
 * Generate and download report as PDF with all styling preserved
 * @param reportElement - The HTML element containing the report
 * @param fileName - The name of the file to download
 */
export async function downloadReportAsPDF(
  reportElement: HTMLElement | null,
  fileName: string = 'career-report.pdf'
): Promise<void> {
  if (!reportElement) {
    console.error('Report element not found');
    return;
  }

  try {
    // Create a clone of the element to avoid modifying the original
    const clonedElement = reportElement.cloneNode(true) as HTMLElement;
    
    // Create a temporary container for rendering
    const tempContainer = document.createElement('div');
    tempContainer.style.position = 'fixed';
    tempContainer.style.left = '-10000px';
    tempContainer.style.top = '-10000px';
    tempContainer.style.width = reportElement.offsetWidth + 'px';
    tempContainer.style.backgroundColor = '#ffffff';
    tempContainer.appendChild(clonedElement);
    document.body.appendChild(tempContainer);

    // Remove interactive elements
    const buttons = clonedElement.querySelectorAll('button');
    buttons.forEach(btn => {
      btn.style.display = 'none';
    });

    console.log('Converting HTML to canvas...');

    // Convert HTML to canvas with higher quality
    const canvas = await html2canvas(clonedElement, {
      scale: 2,
      useCORS: true,
      logging: false,
      backgroundColor: '#ffffff',
      imageTimeout: 0,
    });

    // Remove temporary container
    document.body.removeChild(tempContainer);

    console.log('Creating PDF from canvas...');

    // Create PDF with proper dimensions
    const imgData = canvas.toDataURL('image/png');
    const imgWidth = 210; // A4 width in mm
    const pageHeight = 297; // A4 height in mm
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    let heightLeft = imgHeight;

    const pdf = new jsPDF('p', 'mm', 'a4');
    let position = 0;

    // Add multiple pages if content exceeds one page
    while (heightLeft >= 0) {
      if (heightLeft < imgHeight) {
        pdf.addPage();
      }
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
      position -= pageHeight;
    }

    // Generate filename with date if not provided
    const finalFileName = fileName.includes('.pdf') 
      ? fileName 
      : `${fileName}.pdf`;

    pdf.save(finalFileName);
    console.log('PDF downloaded successfully');
  } catch (error) {
    console.error('Error generating PDF:', error);
    // Fallback to HTML download
    downloadReportAsHTML(reportElement, fileName);
  }
}

/**
 * Download report as styled HTML
 * @param reportElement - The HTML element containing the report
 * @param fileName - The name of the file to download
 */
export function downloadReportAsHTML(
  reportElement: HTMLElement | null,
  fileName: string = 'career-report.html'
): void {
  if (!reportElement) {
    console.error('Report element not found');
    return;
  }

  try {
    const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Career Report</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #333;
            background-color: #f5f5f5;
            padding: 20px;
        }
        
        .container {
            max-width: 900px;
            margin: 0 auto;
            background-color: white;
            padding: 40px;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        
        h1 {
            color: #1a1a1a;
            margin-bottom: 10px;
            font-size: 2.5rem;
        }
        
        h2 {
            color: #2c3e50;
            margin-top: 30px;
            margin-bottom: 15px;
            font-size: 1.8rem;
            border-bottom: 3px solid #3498db;
            padding-bottom: 10px;
        }
        
        h3 {
            color: #34495e;
            margin-top: 20px;
            margin-bottom: 10px;
            font-size: 1.3rem;
        }
        
        .header {
            margin-bottom: 30px;
            padding-bottom: 20px;
            border-bottom: 2px solid #ecf0f1;
        }
        
        .date {
            color: #7f8c8d;
            font-size: 0.9rem;
        }
        
        .career-card {
            margin-bottom: 25px;
            padding: 20px;
            border-left: 4px solid #3498db;
            background-color: #f8f9fa;
            border-radius: 4px;
        }
        
        .career-card.best-match {
            border-left-color: #27ae60;
            background-color: #f0fdf4;
        }
        
        .career-title {
            font-size: 1.5rem;
            color: #2c3e50;
            margin-bottom: 10px;
        }
        
        .match-percentage {
            display: inline-block;
            background: linear-gradient(135deg, #3498db, #2980b9);
            color: white;
            padding: 8px 16px;
            border-radius: 20px;
            font-weight: bold;
            margin-bottom: 15px;
        }
        
        .section {
            margin-bottom: 20px;
        }
        
        .section-title {
            font-weight: bold;
            color: #2c3e50;
            margin-bottom: 8px;
            font-size: 1.1rem;
        }
        
        .stat-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
            gap: 15px;
            margin-top: 15px;
        }
        
        .stat {
            background-color: #ecf0f1;
            padding: 12px;
            border-radius: 4px;
            text-align: center;
        }
        
        .stat-value {
            font-size: 1.3rem;
            font-weight: bold;
            color: #27ae60;
        }
        
        .stat-label {
            font-size: 0.8rem;
            color: #7f8c8d;
            margin-top: 5px;
        }
        
        .badge {
            display: inline-block;
            background-color: #3498db;
            color: white;
            padding: 4px 12px;
            border-radius: 12px;
            font-size: 0.85rem;
            margin-right: 8px;
            margin-bottom: 8px;
        }
        
        .list {
            margin-left: 20px;
            margin-top: 8px;
        }
        
        .list li {
            margin-bottom: 8px;
            list-style-position: inside;
        }
        
        .college-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 15px;
            margin-top: 15px;
        }
        
        .college-card {
            border: 1px solid #ecf0f1;
            padding: 15px;
            border-radius: 4px;
            background-color: #fafafa;
        }
        
        .college-name {
            font-weight: bold;
            color: #2c3e50;
            margin-bottom: 5px;
        }
        
        .progress-bar {
            background-color: #ecf0f1;
            height: 8px;
            border-radius: 4px;
            overflow: hidden;
            margin-top: 5px;
        }
        
        .progress-fill {
            background-color: #27ae60;
            height: 100%;
        }
        
        .roadmap-step {
            margin-bottom: 20px;
            padding-left: 40px;
            position: relative;
        }
        
        .roadmap-step::before {
            content: '';
            position: absolute;
            left: 0;
            top: 0;
            width: 30px;
            height: 30px;
            background-color: #3498db;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-weight: bold;
        }
        
        .step-title {
            font-weight: bold;
            color: #2c3e50;
            margin-bottom: 5px;
        }
        
        .step-description {
            color: #555;
            margin-bottom: 8px;
        }
        
        .step-actions {
            margin-left: 15px;
            color: #666;
        }
        
        .step-actions li {
            margin-bottom: 5px;
        }
        
        .page-break {
            page-break-after: always;
            margin: 30px 0;
        }
        
        @media print {
            body {
                background-color: white;
                padding: 0;
            }
            .container {
                box-shadow: none;
                padding: 0;
                max-width: 100%;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        ${reportElement.innerHTML}
    </div>
    
    <script>
        // Auto-print when opened
        window.addEventListener('load', function() {
            window.print();
        });
    </script>
</body>
</html>
    `;

    // Create blob and download
    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName.replace('.html', '.html');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    console.log('Report downloaded successfully');
  } catch (error) {
    console.error('Error generating HTML report:', error);
  }
}

/**
 * Alternative: Download as plain text
 * @param careerReport - The career report data
 * @param fileName - The name of the file to download
 */
export function downloadReportAsText(
  careerReport: any,
  fileName: string = 'career-report.txt'
): void {
  try {
    let textContent = 'CAREER ASSESSMENT REPORT\n';
    textContent += '='.repeat(50) + '\n\n';
    textContent += `Generated on: ${new Date().toLocaleDateString('en-IN')}\n\n`;

    textContent += 'TOP CAREER RECOMMENDATIONS\n';
    textContent += '-'.repeat(50) + '\n\n';

    careerReport?.topCareers?.forEach((career: any, idx: number) => {
      textContent += `${idx + 1}. ${career.name} (${career.matchPercentage}% Match)\n`;
      textContent += `   Description: ${career.description || 'N/A'}\n`;
      textContent += `   Salary: ${career.avgSalary?.min || 'N/A'} - ${career.avgSalary?.max || 'N/A'}\n`;
      textContent += `   Growth Rate: ${career.growthRate}%\n`;
      textContent += '\n';
    });

    const blob = new Blob([textContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    console.log('Text report downloaded successfully');
  } catch (error) {
    console.error('Error downloading text report:', error);
  }
}
