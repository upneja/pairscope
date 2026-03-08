import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { Report } from "./types";

export async function exportReportToPDF(report: Report): Promise<void> {
  const pdf = new jsPDF("p", "mm", "a4");
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  const margin = 15;

  // --- Cover Page ---
  pdf.setFillColor(15, 23, 42); // navy
  pdf.rect(0, 0, pageWidth, pageHeight, "F");

  pdf.setTextColor(255, 255, 255);
  pdf.setFontSize(36);
  pdf.text("Pairscope", pageWidth / 2, pageHeight * 0.35, { align: "center" });

  pdf.setFontSize(14);
  pdf.setTextColor(249, 112, 102); // coral
  pdf.text("Your Relationship Health Report", pageWidth / 2, pageHeight * 0.42, {
    align: "center",
  });

  pdf.setFontSize(10);
  pdf.setTextColor(148, 163, 184); // slate-light
  const modeText =
    report.mode === "relationship"
      ? "In a Relationship Assessment"
      : "Flying Solo Assessment";
  pdf.text(modeText, pageWidth / 2, pageHeight * 0.5, { align: "center" });

  const dateStr = new Date(report.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  pdf.text(dateStr, pageWidth / 2, pageHeight * 0.55, { align: "center" });

  pdf.setFontSize(7);
  pdf.setTextColor(100, 116, 139);
  const disclaimerLines = pdf.splitTextToSize(
    report.disclaimerText,
    pageWidth - margin * 2
  );
  pdf.text(disclaimerLines, pageWidth / 2, pageHeight * 0.85, {
    align: "center",
  });

  // --- Capture each report section card ---
  const sectionElements = document.querySelectorAll(".report-section");

  for (let i = 0; i < sectionElements.length; i++) {
    pdf.addPage();
    const el = sectionElements[i] as HTMLElement;

    try {
      const canvas = await html2canvas(el, {
        backgroundColor: "#ffffff",
        scale: 2,
        useCORS: true,
        logging: false,
      });

      const imgData = canvas.toDataURL("image/png");
      const imgWidth = pageWidth - margin * 2;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      // If the image is taller than the page, scale it down
      const maxHeight = pageHeight - margin * 2;
      const finalHeight = Math.min(imgHeight, maxHeight);
      const finalWidth = imgHeight > maxHeight ? (canvas.width * finalHeight) / canvas.height : imgWidth;

      pdf.addImage(imgData, "PNG", margin, margin, finalWidth, finalHeight);
    } catch {
      // Fallback: just add text
      pdf.setTextColor(15, 23, 42);
      pdf.setFontSize(16);
      pdf.text(report.sections[i].title, margin, margin + 10);
      pdf.setFontSize(10);
      const lines = pdf.splitTextToSize(
        report.sections[i].narrative,
        pageWidth - margin * 2
      );
      pdf.text(lines, margin, margin + 20);
    }
  }

  pdf.save(`pairscope-report-${dateStr.replace(/\s/g, "-").toLowerCase()}.pdf`);
}
