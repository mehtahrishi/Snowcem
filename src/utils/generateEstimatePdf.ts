import { CalculatedSolution } from "@/data/paintCalculatorData";

interface CustomerDetails {
  fullName: string;
  phone: string;
  pincode: string;
  startTimeline: string;
  localPainterHired: string;
  space: string;
  need: string;
  carpetArea: number;
}

/**
 * Dynamically loads jsPDF from CDN if not already loaded.
 */
async function loadJsPdfLibrary(): Promise<any> {
  if (typeof window === "undefined") return null;
  if ((window as any).jspdf?.jsPDF) {
    return (window as any).jspdf.jsPDF;
  }

  return new Promise((resolve, reject) => {
    const existing = document.getElementById("jspdf-cdn-script");
    if (existing) {
      existing.addEventListener("load", () => {
        resolve((window as any).jspdf?.jsPDF);
      });
      return;
    }

    const script = document.createElement("script");
    script.id = "jspdf-cdn-script";
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js";
    script.crossOrigin = "anonymous";
    script.onload = () => {
      if ((window as any).jspdf?.jsPDF) {
        resolve((window as any).jspdf.jsPDF);
      } else {
        reject(new Error("jsPDF loaded but object missing"));
      }
    };
    script.onerror = () => reject(new Error("Failed to load jsPDF CDN"));
    document.head.appendChild(script);
  });
}

/**
 * Converts an image URL into a base64 Data URL for jsPDF embedding
 */
async function loadImageAsDataUrl(url: string): Promise<string | null> {
  if (!url) return null;
  try {
    const res = await fetch(url);
    if (!res.ok) return null;
    const blob = await res.blob();
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.onerror = () => resolve(null);
      reader.readAsDataURL(blob);
    });
  } catch {
    return null;
  }
}

/**
 * Generates and downloads a custom, branded Snowcem Paint Budget Estimate PDF
 * with Brand Logo and Product Images embedded!
 */
export async function downloadEstimatePdf(
  solution: CalculatedSolution,
  customer: CustomerDetails
): Promise<void> {
  try {
    // 1. Preload Logo and all Product Images in parallel
    const [logoData, mainProductImgData, ...stepImages] = await Promise.all([
      loadImageAsDataUrl("/image.png"),
      loadImageAsDataUrl(solution.mainImage),
      ...solution.steps.map((s) => loadImageAsDataUrl(s.productImage)),
    ]);

    const jsPDFClass = await loadJsPdfLibrary();
    if (!jsPDFClass) {
      throw new Error("jsPDF unavailable");
    }

    const doc = new jsPDFClass({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    });

    const pageWidth = 210;
    const margin = 14;
    const contentWidth = pageWidth - margin * 2; // 182mm
    let y = margin;

    const formatINR = (val: number) => `Rs. ${Math.round(val).toLocaleString("en-IN")}`;

    // 1. BRAND HEADER BANNER WITH EMBEDDED LOGO
    doc.setFillColor(26, 27, 53); // #1A1B35 (Deep Navy)
    doc.roundedRect(margin, y, contentWidth, 22, 3, 3, "F");

    let logoEndX = margin + 6;
    if (logoData) {
      try {
        // Embed Brand Logo (width 28mm, height 12mm)
        doc.setFillColor(255, 255, 255);
        doc.roundedRect(margin + 5, y + 4.5, 30, 13, 2, 2, "F");
        doc.addImage(logoData, "PNG", margin + 6, y + 5.5, 28, 11);
        logoEndX = margin + 38;
      } catch (err) {
        console.warn("Logo embedding skipped:", err);
      }
    }

    // Header Titles beside the logo
    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);
    doc.text("SNOWCEM PAINTS", logoEndX + 4, y + 9);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(7.5);
    doc.setTextColor(210, 215, 240);
    doc.text("OFFICIAL PAINT BUDGET ESTIMATE & APPLICATION SPECIFICATION", logoEndX + 4, y + 16);

    // Right-aligned Date & Reference
    const today = new Date().toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
    const quoteRef = `REF: SC-${Date.now().toString().slice(-6)}`;
    doc.setFontSize(8);
    doc.setTextColor(255, 255, 255);
    doc.text(quoteRef, margin + contentWidth - 6, y + 9, { align: "right" });
    doc.setTextColor(190, 195, 220);
    doc.text(`Date: ${today}`, margin + contentWidth - 6, y + 15, { align: "right" });

    y += 26;

    // 2. CLIENT & PROJECT DETAILS BOX
    doc.setFillColor(248, 249, 252);
    doc.setDrawColor(225, 230, 240);
    doc.roundedRect(margin, y, contentWidth, 24, 2.5, 2.5, "FD");

    doc.setFont("helvetica", "bold");
    doc.setFontSize(8.5);
    doc.setTextColor(40, 45, 70);
    doc.text("CLIENT & PROJECT DETAILS", margin + 5, y + 5.5);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(7.5);
    doc.setTextColor(70, 75, 95);

    // Col 1
    doc.text(`Client Name: ${customer.fullName || "Valued Customer"}`, margin + 5, y + 11);
    doc.text(`Contact: ${customer.phone || "N/A"}`, margin + 5, y + 16);

    // Col 2
    const col2X = margin + 70;
    doc.text(`PIN Code: ${customer.pincode || "N/A"}`, col2X, y + 11);
    doc.text(`Space Type: ${customer.space.toUpperCase()} WALLS`, col2X, y + 16);
    doc.text(`Painting Need: ${customer.need.toUpperCase()}`, col2X, y + 21);

    // Col 3
    const col3X = margin + 130;
    doc.text(`Start Timeline: ${customer.startTimeline}`, col3X, y + 11);
    doc.text(`Painter Hired: ${customer.localPainterHired}`, col3X, y + 16);
    doc.text(`Multiplier Factor: ${solution.multiplier}x`, col3X, y + 21);

    y += 28;

    // 3. MAIN PRODUCT & ESTIMATE SUMMARY CARD (WITH EMBEDDED MAIN PRODUCT IMAGE)
    doc.setFillColor(255, 255, 255);
    doc.setDrawColor(220, 225, 238);
    doc.roundedRect(margin, y, contentWidth, 32, 3, 3, "FD");

    let productDetailsX = margin + 6;
    if (mainProductImgData) {
      try {
        // Thumbnail container box
        doc.setFillColor(248, 250, 252);
        doc.setDrawColor(230, 235, 245);
        doc.roundedRect(margin + 4, y + 3.5, 25, 25, 2, 2, "FD");
        // Embed Main Paint Bucket Image
        doc.addImage(mainProductImgData, "PNG", margin + 5.5, y + 4.5, 22, 23);
        productDetailsX = margin + 33;
      } catch (err) {
        console.warn("Main product image embedding skipped:", err);
      }
    }

    // System Name & Highlights
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.setTextColor(26, 27, 53);
    doc.text(solution.name, productDetailsX, y + 8);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(7.5);
    doc.setTextColor(90, 95, 115);
    const badgeText = `${solution.group} Tier • ${solution.warranty || "Long-lasting Protection"} • ${solution.finish || "Smooth Finish"}`;
    doc.text(badgeText, productDetailsX, y + 13.5);

    doc.setFontSize(7);
    doc.setTextColor(110, 115, 135);
    const cleanTagline = doc.splitTextToSize(solution.tagline, 75);
    doc.text(cleanTagline, productDetailsX, y + 18.5);

    // Pricing & Area Metrics Block (Right side of Card)
    const metricsBlockX = margin + 114;
    doc.setFillColor(248, 250, 255);
    doc.setDrawColor(225, 232, 250);
    doc.roundedRect(metricsBlockX, y + 3, 64, 26, 2, 2, "FD");

    // Total Cost
    doc.setFont("helvetica", "bold");
    doc.setFontSize(7);
    doc.setTextColor(100, 110, 130);
    doc.text("TOTAL ESTIMATED COST", metricsBlockX + 4, y + 8);
    doc.setFontSize(11);
    doc.setTextColor(16, 130, 85);
    doc.text(formatINR(solution.totalEstimatedCost), metricsBlockX + 4, y + 14);

    // Per Sq.Ft. Rate & Area
    doc.setFont("helvetica", "bold");
    doc.setFontSize(7);
    doc.setTextColor(100, 110, 130);
    doc.text("RATE / SQ.FT. (M+L)", metricsBlockX + 4, y + 20);
    doc.setFontSize(8.5);
    doc.setTextColor(91, 107, 181);
    doc.text(`Rs. ${solution.costPerSqFtML.toFixed(2)}`, metricsBlockX + 4, y + 25);

    doc.setFontSize(7);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(100, 110, 130);
    doc.text("PAINTING AREA", metricsBlockX + 38, y + 20);
    doc.setFontSize(8.5);
    doc.setTextColor(26, 27, 53);
    doc.text(`${solution.totalPaintingArea.toLocaleString()} Sq.Ft.`, metricsBlockX + 38, y + 25);

    y += 36;

    // 4. PRODUCTS IN THE SYSTEM & QUANTITY (DETAILED APPLICATION TABLE WITH EMBEDDED IMAGES)
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    doc.setTextColor(26, 27, 53);
    doc.text("PRODUCTS IN THE SYSTEM & QUANTITY BREAKDOWN", margin, y);
    y += 4;

    // Table Header
    doc.setFillColor(91, 107, 181); // #5B6BB5
    doc.roundedRect(margin, y, contentWidth, 8, 1, 1, "F");

    doc.setFontSize(7.5);
    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica", "bold");

    const colImg = margin + 2;
    const colStep = margin + 18;
    const colProduct = margin + 34;
    const colType = margin + 82;
    const colQty = margin + 115;
    const colPack = margin + 135;
    const colTotal = margin + 180;

    doc.text("Item", colImg + 2, y + 5.5);
    doc.text("Step", colStep, y + 5.5);
    doc.text("Product Name", colProduct, y + 5.5);
    doc.text("Coats & Type", colType, y + 5.5);
    doc.text("Quantity", colQty, y + 5.5);
    doc.text("Pack Sizing", colPack, y + 5.5);
    doc.text("Step Total", colTotal - 2, y + 5.5, { align: "right" });

    y += 8;

    // Table Rows with Step Thumbnails
    solution.steps.forEach((step, idx) => {
      const isEven = idx % 2 === 0;
      const rowHeight = 15;

      doc.setFillColor(isEven ? 255 : 250, isEven ? 255 : 251, isEven ? 255 : 254);
      doc.rect(margin, y, contentWidth, rowHeight, "F");
      doc.setDrawColor(230, 235, 245);
      doc.line(margin, y + rowHeight, margin + contentWidth, y + rowHeight);

      // Embedded Product Thumbnail in Row
      const stepImg = stepImages[idx];
      if (stepImg) {
        try {
          doc.setFillColor(255, 255, 255);
          doc.roundedRect(colImg, y + 1.5, 12, 12, 1, 1, "F");
          doc.addImage(stepImg, "PNG", colImg + 0.5, y + 2, 11, 11);
        } catch {
          // ignore image errors
        }
      }

      doc.setFont("helvetica", "bold");
      doc.setFontSize(7.5);
      doc.setTextColor(26, 27, 53);
      doc.text(`STEP 0${step.stepNumber}`, colStep, y + 8.5);

      // Product Name
      doc.setFont("helvetica", "bold");
      doc.setFontSize(8);
      const splitName = doc.splitTextToSize(step.productName, 44);
      doc.text(splitName, colProduct, y + 6.5);

      // Coats & Type
      doc.setFont("helvetica", "normal");
      doc.setFontSize(7.5);
      doc.setTextColor(70, 75, 95);
      doc.text(`${step.coats} Coats • ${step.type}`, colType, y + 8.5);

      // Quantity Required
      doc.setFont("helvetica", "bold");
      doc.setTextColor(223, 63, 111); // #DF3F6F
      doc.text(`${step.materialRequired.toFixed(1)} ${step.unit}`, colQty, y + 8.5);

      // Pack Sizing
      doc.setFont("helvetica", "normal");
      doc.setTextColor(70, 75, 95);
      doc.text(step.packRecommendation, colPack, y + 8.5);

      // Step Total (Mat + Labour)
      doc.setFont("helvetica", "bold");
      doc.setTextColor(26, 27, 53);
      doc.text(formatINR(step.stepTotalCost), colTotal - 2, y + 8.5, { align: "right" });

      y += rowHeight;
    });

    // Summary Totals Row
    doc.setFillColor(242, 245, 255);
    doc.rect(margin, y, contentWidth, 10, "F");
    doc.setDrawColor(185, 200, 240);
    doc.rect(margin, y, contentWidth, 10, "S");

    doc.setFont("helvetica", "bold");
    doc.setFontSize(8);
    doc.setTextColor(26, 27, 53);
    doc.text("TOTAL ESTIMATE SUMMARY", colStep, y + 6.5);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(7.5);
    doc.setTextColor(70, 75, 95);
    doc.text(`Material Cost: ${formatINR(solution.totalMaterialCost)}`, margin + 70, y + 6.5);
    doc.text(`Labour Cost: ${formatINR(solution.totalLabourCost)}`, margin + 115, y + 6.5);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    doc.setTextColor(16, 130, 85);
    doc.text(`Grand Total: ${formatINR(solution.totalEstimatedCost)}`, colTotal - 2, y + 6.5, {
      align: "right",
    });

    y += 15;

    // 5. APPLICATION INSTRUCTIONS & GUIDELINES
    doc.setFillColor(252, 252, 254);
    doc.setDrawColor(225, 230, 240);
    doc.roundedRect(margin, y, contentWidth, 23, 2, 2, "FD");

    doc.setFont("helvetica", "bold");
    doc.setFontSize(7.5);
    doc.setTextColor(40, 45, 70);
    doc.text("IMPORTANT APPLICATION GUIDELINES & SPECIFICATIONS", margin + 4, y + 4.5);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(6.8);
    doc.setTextColor(80, 85, 105);

    const notes = [
      "1. Surface Preparation: Ensure masonry/substrate is dry, clean, and free from loose paint, oil, or fungal growth.",
      "2. Priming & Putty: Allow 4-6 hours drying time after primer and putty application before sanding with emery paper.",
      "3. Inter-coat Drying: Ensure 4-6 hours drying interval between successive coats of emulsion topcoat.",
      "4. Disclaimer: Material quantities and cost estimates are indicative spread-rate projections based on typical regional surface conditions.",
    ];

    notes.forEach((note, nIdx) => {
      doc.text(note, margin + 4, y + 9 + nIdx * 3.3);
    });

    y += 27;

    // 6. OFFICIAL FOOTER
    doc.setDrawColor(210, 215, 230);
    doc.line(margin, y, margin + contentWidth, y);

    y += 4;
    doc.setFontSize(7);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(120, 125, 145);
    doc.text(
      "Snowcem Paints Helpline: 1800-22-3850 | care@snowcempaints.com | www.snowcempaints.com",
      margin,
      y
    );
    doc.text("Certified Estimate Document - Snowcem India Legacy Since 1959", margin + contentWidth, y, {
      align: "right",
    });

    // TRIGGER BROWSER DIRECT PDF DOWNLOAD
    const cleanFileName = `Snowcem_Paint_Estimate_${solution.name.replace(/[^a-zA-Z0-9]/g, "_")}.pdf`;
    doc.save(cleanFileName);
  } catch (err) {
    console.warn("jsPDF download failed, using isolated printable window fallback:", err);
    printEstimateFallback(solution, customer);
  }
}

/**
 * Isolated Fallback: Prints ONLY the quotation voucher in an isolated print window,
 * with Logo and Product Images!
 */
function printEstimateFallback(solution: CalculatedSolution, customer: CustomerDetails): void {
  const printWindow = window.open("", "_blank", "width=850,height=950");
  if (!printWindow) {
    window.print();
    return;
  }

  const formatINR = (val: number) => `Rs. ${Math.round(val).toLocaleString("en-IN")}`;

  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <title>Snowcem Paint Estimate - ${solution.name}</title>
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; margin: 24px; color: #1e293b; }
          .header { background: #1a1b35; color: white; padding: 16px 20px; border-radius: 8px; display: flex; justify-content: space-between; align-items: center; }
          .header-left { display: flex; align-items: center; gap: 14px; }
          .logo-box { background: white; padding: 4px 8px; border-radius: 6px; }
          .logo-box img { height: 32px; object-contain: contain; display: block; }
          .header h1 { margin: 0; font-size: 20px; letter-spacing: 0.5px; }
          .header p { margin: 4px 0 0; font-size: 11px; opacity: 0.8; }
          .box { border: 1px solid #e2e8f0; background: #f8fafc; border-radius: 8px; padding: 12px 16px; margin-top: 14px; font-size: 12px; }
          .product-card { border: 1px solid #cbd5e1; border-radius: 8px; padding: 14px; margin-top: 14px; display: flex; gap: 16px; align-items: center; background: white; }
          .product-img { width: 80px; height: 80px; object-fit: contain; border-radius: 6px; border: 1px solid #e2e8f0; padding: 4px; }
          .grid-3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; margin-top: 14px; }
          .card { border: 1px solid #cbd5e1; border-radius: 8px; padding: 12px; background: white; }
          .card span { font-size: 10px; font-weight: bold; color: #64748b; text-transform: uppercase; }
          .card h3 { margin: 4px 0 0; font-size: 16px; color: #0f172a; }
          table { width: 100%; border-collapse: collapse; margin-top: 16px; font-size: 12px; }
          th { background: #5b6bb5; color: white; text-align: left; padding: 8px 10px; font-size: 11px; }
          td { padding: 8px 10px; border-bottom: 1px solid #e2e8f0; vertical-align: middle; }
          .thumb { width: 40px; height: 40px; object-fit: contain; border-radius: 4px; border: 1px solid #e2e8f0; padding: 2px; }
          .total-row { background: #f1f5f9; font-weight: bold; }
          .footer { margin-top: 24px; font-size: 10px; color: #64748b; text-align: center; border-top: 1px solid #e2e8f0; padding-top: 12px; }
          @media print { body { margin: 0; } }
        </style>
      </head>
      <body>
        <div class="header">
          <div class="header-left">
            <div class="logo-box">
              <img src="/image.png" alt="Snowcem Logo" />
            </div>
            <div>
              <h1>SNOWCEM PAINTS</h1>
              <p>OFFICIAL PAINT BUDGET ESTIMATE & APPLICATION SPECIFICATION</p>
            </div>
          </div>
          <div style="text-align: right; font-size: 11px;">
            <div>DATE: ${new Date().toLocaleDateString("en-IN")}</div>
            <div>SPACE: ${customer.space.toUpperCase()} WALLS</div>
          </div>
        </div>

        <div class="box">
          <strong>Client:</strong> ${customer.fullName || "Valued Customer"} | Phone: ${customer.phone || "N/A"} | PIN: ${customer.pincode || "N/A"}
          <br />
          <strong>Project:</strong> ${customer.carpetArea} Sq.Ft. Carpet Area (${customer.need}) | Multiplier: ${solution.multiplier}x
        </div>

        <div class="product-card">
          <img src="${solution.mainImage}" alt="${solution.name}" class="product-img" />
          <div style="flex-grow: 1;">
            <h2 style="margin: 0 0 4px; font-size: 18px;">${solution.name}</h2>
            <div style="font-size: 12px; color: #64748b;">${solution.group} Tier • ${solution.warranty || "Warranty Protected"} • ${solution.finish || "Smooth Finish"}</div>
            <p style="margin: 4px 0 0; font-size: 11px; color: #475569;">${solution.tagline}</p>
          </div>
          <div style="text-align: right; border-left: 1px solid #e2e8f0; padding-left: 16px;">
            <div style="font-size: 10px; color: #64748b; font-weight: bold;">TOTAL ESTIMATED BUDGET</div>
            <div style="font-size: 18px; color: #16a34a; font-weight: bold;">${formatINR(solution.totalEstimatedCost)}</div>
            <div style="font-size: 11px; color: #5b6bb5; margin-top: 2px;">Rs. ${solution.costPerSqFtML.toFixed(2)} / Sq.Ft.</div>
          </div>
        </div>

        <h3 style="margin-top: 20px; font-size: 14px;">Products in the System & Quantity Breakdown</h3>

        <table>
          <thead>
            <tr>
              <th>Item</th>
              <th>Step</th>
              <th>Product Name</th>
              <th>Coats & Type</th>
              <th>Qty Required</th>
              <th>Pack Sizing</th>
              <th style="text-align: right;">Step Total</th>
            </tr>
          </thead>
          <tbody>
            ${solution.steps
              .map(
                (s) => `
              <tr>
                <td><img src="${s.productImage}" alt="${s.productName}" class="thumb" /></td>
                <td><strong>0${s.stepNumber}</strong></td>
                <td><strong>${s.productName}</strong></td>
                <td>${s.coats} Coats • ${s.type}</td>
                <td style="color: #e11d48; font-weight: bold;">${s.materialRequired.toFixed(1)} ${s.unit}</td>
                <td>${s.packRecommendation}</td>
                <td style="text-align: right; font-weight: bold;">${formatINR(s.stepTotalCost)}</td>
              </tr>
            `
              )
              .join("")}
            <tr class="total-row">
              <td colspan="4"><strong>TOTAL (Material + Labour)</strong></td>
              <td colspan="2">Material: ${formatINR(solution.totalMaterialCost)} | Labour: ${formatINR(solution.totalLabourCost)}</td>
              <td style="text-align: right; color: #15803d; font-size: 13px;">${formatINR(solution.totalEstimatedCost)}</td>
            </tr>
          </tbody>
        </table>

        <div class="box" style="margin-top: 16px; font-size: 11px;">
          <strong>Application Guidelines:</strong> Ensure masonry is clean, sound, and dry. Follow inter-coat drying times of 4-6 hours.
        </div>

        <div class="footer">
          Snowcem Paints Helpline: 1800-22-3850 | care@snowcempaints.com | www.snowcempaints.com
        </div>

        <script>
          window.onload = function() {
            window.print();
          };
        </script>
      </body>
    </html>
  `;

  printWindow.document.open();
  printWindow.document.write(html);
  printWindow.document.close();
}
