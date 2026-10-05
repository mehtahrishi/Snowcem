const puppeteer = require('puppeteer-core');
const path = require('path');
const fs = require('fs');

async function generatePDF() {
  const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  
  console.log('Launching Chrome for PDF generation...');
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

    console.log('Scrolling down page to trigger animations and lazy assets...');
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

    // Force screen media styling so print CSS doesn't strip backgrounds/colors
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

    // 1. Full continuous seamless PDF (one long crystal-clear document matching the website)
    const singlePdfPath = path.resolve(__dirname, '..', 'snowcem-homepage.pdf');
    console.log('Generating continuous full-page PDF...');
    await page.pdf({
      path: singlePdfPath,
      width: '1440px',
      height: `${bodyHeight + 50}px`,
      printBackground: true,
      margin: { top: 0, right: 0, bottom: 0, left: 0 }
    });
    console.log('Saved:', singlePdfPath);

    // 2. Paginated Presentation A4 PDF (perfect for scrolling or printing page-by-page)
    const paginatedPdfPath = path.resolve(__dirname, '..', 'snowcem-homepage-paginated.pdf');
    console.log('Generating paginated multi-page A4 PDF...');
    await page.pdf({
      path: paginatedPdfPath,
      format: 'A4',
      printBackground: true,
      margin: { top: '10mm', right: '10mm', bottom: '10mm', left: '10mm' }
    });
    console.log('Saved:', paginatedPdfPath);

    // Copy to artifact directory
    if (fs.existsSync(artifactDir)) {
      fs.copyFileSync(singlePdfPath, path.join(artifactDir, 'snowcem-homepage.pdf'));
      fs.copyFileSync(paginatedPdfPath, path.join(artifactDir, 'snowcem-homepage-paginated.pdf'));
      console.log('Copied both PDFs to artifact directory');
    }

    console.log('All PDFs generated successfully!');
  } catch (err) {
    console.error('Error generating PDF:', err);
    process.exit(1);
  } finally {
    await browser.close();
  }
}

generatePDF();
