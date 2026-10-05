const puppeteer = require('puppeteer-core');
const path = require('path');
const fs = require('fs');

async function generateTealPDF() {
  const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  
  console.log('Launching Chrome for #163D3C Theme PDF generation...');
  const browser = await puppeteer.launch({
    executablePath: chromePath,
    headless: true,
    defaultViewport: {
      width: 1440,
      height: 900,
      deviceScaleFactor: 2,
    },
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  try {
    const page = await browser.newPage();
    console.log('Navigating to http://localhost:3000...');
    await page.goto('http://localhost:3000', {
      waitUntil: 'networkidle0',
      timeout: 60000
    });

    console.log('Waiting for preloader animation to finish...');
    await new Promise(r => setTimeout(r, 3500));

    console.log('Injecting #163D3C Spruce Teal Theme styles...');
    await page.addStyleTag({
      content: `
        /* 1. Main Backgrounds & Canvas */
        html, body, .home-theme, main, [class*="bg-canvas"], [class*="bg-[#DDC7BB]"] {
          background-color: #163D3C !important;
          color: #F0F7F7 !important;
        }

        /* 2. Sticky Header & Announcement Bar */
        header, .sticky, [class*="bg-[#DDC7BB]"], [class*="bg-[#D5BFB1]"] {
          background-color: #163D3C !important;
          border-color: rgba(255, 255, 255, 0.12) !important;
        }
        header > div:nth-child(2), [class*="bg-[#D5BFB1]"] {
          background-color: #102E2D !important;
          border-color: rgba(255, 255, 255, 0.08) !important;
          color: #B4D5D3 !important;
        }
        header a, header button, header span, header p {
          color: #F0F7F7 !important;
        }
        header .hover\\:text-\\[\\#5B5BAB\\]:hover, header .hover\\:text-\\[\\#D83E78\\]:hover {
          color: #ffffff !important;
        }

        /* 3. Typography & Headings */
        h1, h2, h3, h4, h5, h6, .font-heading {
          color: #FFFFFF !important;
        }
        .text-\\[\\#252220\\], .text-\\[\\#252238\\], .text-\\[\\#473F3A\\], .text-slate-900, .text-slate-800, .text-slate-700 {
          color: #FFFFFF !important;
        }
        .text-\\[\\#5C534D\\], .text-\\[\\#686477\\], .text-slate-600, .text-slate-500 {
          color: #C2DFDD !important;
        }

        /* 4. Cards & Section Surfaces */
        [class*="bg-[#FAF7F4]"],
        [class*="bg-[#FCFAF7]"],
        [class*="bg-[#FAF6F2]"],
        [class*="bg-[#F3ECE6]"],
        [class*="bg-[#FAF8F5]"],
        .product-card,
        [class*="product-card"] {
          background-color: #0F2D2C !important;
          border-color: rgba(255, 255, 255, 0.15) !important;
          color: #F0F7F7 !important;
        }

        /* Product image cards inner background */
        .product-card > div:first-child,
        [class*="bg-[#FCFAF7]"] {
          background-color: #143736 !important;
        }

        /* 5. Pills, Badges, Tabs, and Input Fields */
        [class*="bg-[#EAE0D7]"],
        [class*="bg-[#DECFBE]"],
        [class*="bg-[#CBB3A5]"] {
          background-color: #1A4645 !important;
          border-color: rgba(255, 255, 255, 0.18) !important;
          color: #E8F5F4 !important;
        }

        input, select, textarea {
          background-color: #113332 !important;
          border-color: rgba(255, 255, 255, 0.2) !important;
          color: #FFFFFF !important;
        }
        input::placeholder, textarea::placeholder {
          color: #7AA2A0 !important;
        }

        /* 6. Universal Borders */
        [class*="border-[#"] {
          border-color: rgba(255, 255, 255, 0.14) !important;
        }

        /* 7. Footer Deep Teal Mode */
        footer {
          background-color: #0A2120 !important;
          border-color: rgba(255, 255, 255, 0.1) !important;
        }
        footer a {
          color: #B4D5D3 !important;
        }
        footer a:hover {
          color: #FFFFFF !important;
        }
        footer h3, footer h4, footer h5, footer .font-heading {
          color: #FFFFFF !important;
        }
        footer p {
          color: #B4D5D3 !important;
        }
        footer .border-slate-200 {
          border-color: rgba(255, 255, 255, 0.1) !important;
        }
      `
    });

    console.log('Scrolling down to trigger all animations and lazy images...');
    await page.evaluate(async () => {
      await new Promise((resolve) => {
        let totalHeight = 0;
        const distance = 400;
        const timer = setInterval(() => {
          const scrollHeight = document.body.scrollHeight;
          window.scrollBy(0, distance);
          totalHeight += distance;

          if (totalHeight >= scrollHeight) {
            clearInterval(timer);
            window.scrollTo(0, 0);
            setTimeout(resolve, 800);
          }
        }, 80);
      });
    });

    await new Promise(r => setTimeout(r, 1500));

    // Force screen media styling
    await page.emulateMediaType('screen');

    // Get exact page height
    const bodyHeight = await page.evaluate(() => {
      return Math.max(
        document.body.scrollHeight,
        document.documentElement.scrollHeight,
        document.body.offsetHeight,
        document.documentElement.offsetHeight
      );
    });

    console.log(`Measured full page height: ${bodyHeight}px`);

    const artifactDir = 'C:\\Users\\mehta\\.gemini\\antigravity-ide\\brain\\5fdd6b66-b39d-444d-9c1a-38a57203880f';

    // 1. Full continuous seamless PDF with #163D3C background
    const singlePdfPath = path.resolve(__dirname, '..', 'snowcem-homepage-teal.pdf');
    console.log('Generating continuous full-page Spruce Teal PDF...');
    await page.pdf({
      path: singlePdfPath,
      width: '1440px',
      height: `${bodyHeight + 50}px`,
      printBackground: true,
      margin: { top: 0, right: 0, bottom: 0, left: 0 }
    });
    console.log('Saved:', singlePdfPath);

    // 2. Paginated Presentation A4 PDF with #163D3C background
    const paginatedPdfPath = path.resolve(__dirname, '..', 'snowcem-homepage-teal-paginated.pdf');
    console.log('Generating paginated multi-page A4 Spruce Teal PDF...');
    await page.pdf({
      path: paginatedPdfPath,
      format: 'A4',
      printBackground: true,
      margin: { top: '10mm', right: '10mm', bottom: '10mm', left: '10mm' }
    });
    console.log('Saved:', paginatedPdfPath);

    // 3. High-res PNG preview
    const previewPngPath = path.resolve(__dirname, '..', 'snowcem-homepage-teal.png');
    console.log('Generating high-res PNG preview...');
    await page.screenshot({
      path: previewPngPath,
      fullPage: true
    });
    console.log('Saved preview PNG:', previewPngPath);

    // Copy to artifact directory
    if (fs.existsSync(artifactDir)) {
      fs.copyFileSync(singlePdfPath, path.join(artifactDir, 'snowcem-homepage-teal.pdf'));
      fs.copyFileSync(paginatedPdfPath, path.join(artifactDir, 'snowcem-homepage-teal-paginated.pdf'));
      fs.copyFileSync(previewPngPath, path.join(artifactDir, 'snowcem-homepage-teal.png'));
      console.log('Copied all teal assets to artifact directory');
    }

    console.log('All Spruce Teal (#163D3C) PDFs and preview generated successfully!');
  } catch (err) {
    console.error('Error generating teal PDF:', err);
    process.exit(1);
  } finally {
    await browser.close();
  }
}

generateTealPDF();
