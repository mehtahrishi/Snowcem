const puppeteer = require('puppeteer-core');
const path = require('path');
const fs = require('fs');

async function capture() {
  const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  
  console.log('Launching Chrome from:', chromePath);
  const browser = await puppeteer.launch({
    executablePath: chromePath,
    headless: true,
    defaultViewport: {
      width: 1440,
      height: 900,
      deviceScaleFactor: 1.5,
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

    console.log('Waiting 3.5s for PaintLoader preloader animation to finish...');
    await new Promise(r => setTimeout(r, 3500));

    console.log('Smooth scrolling to trigger any lazy animations...');
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
        }, 100);
      });
    });

    console.log('Waiting 1.5s for page to settle at top...');
    await new Promise(r => setTimeout(r, 1500));

    const outputPathProject = path.resolve(__dirname, '..', 'snowcem-homepage.png');
    const artifactDir = 'C:\\Users\\mehta\\.gemini\\antigravity-ide\\brain\\5fdd6b66-b39d-444d-9c1a-38a57203880f';
    const outputPathArtifact = path.join(artifactDir, 'snowcem-homepage.png');

    console.log('Capturing full page screenshot to:', outputPathProject);
    await page.screenshot({
      path: outputPathProject,
      fullPage: true
    });

    // Also copy to artifact dir for instant view
    if (fs.existsSync(artifactDir)) {
      fs.copyFileSync(outputPathProject, outputPathArtifact);
      console.log('Copied screenshot to artifact directory:', outputPathArtifact);
    }

    console.log('Screenshot successfully captured!');
  } catch (err) {
    console.error('Error during capture:', err);
    process.exit(1);
  } finally {
    await browser.close();
  }
}

capture();
