#!/usr/bin/env node

const { program } = require('commander');
const fs = require('fs-extra');
const path = require('path');
const marked = require('marked');
const puppeteer = require('puppeteer');

// Configure the CLI
program
  .name('md2pdf')
  .description('Convert Markdown files to PDF')
  .version('1.0.0')
  .argument('<input>', 'Input markdown file path')
  .option('-o, --output <output>', 'Output PDF file path')
  .option('-s, --style <style>', 'Custom CSS file path')
  .option('-t, --title <title>', 'Document title')
  .action(async (input, options) => {
    try {
      await convertToPdf(input, options);
      console.log('Conversion completed successfully!');
    } catch (error) {
      console.error('Error during conversion:', error.message);
      process.exit(1);
    }
  });

program.parse();

async function convertToPdf(inputPath, options) {
  // Validate input file
  if (!fs.existsSync(inputPath)) {
    throw new Error(`Input file not found: ${inputPath}`);
  }

  // Determine output path
  const outputPath = options.output || 
    path.join(path.dirname(inputPath), 
      `${path.basename(inputPath, path.extname(inputPath))}.pdf`);

  // Read markdown content
  const markdownContent = fs.readFileSync(inputPath, 'utf-8');
  
  // Convert markdown to HTML
  const htmlContent = marked.parse(markdownContent);

  // Read custom CSS if provided
  let customCss = '';
  if (options.style && fs.existsSync(options.style)) {
    customCss = fs.readFileSync(options.style, 'utf-8');
  }

  // Create full HTML document
  const title = options.title || path.basename(inputPath, path.extname(inputPath));
  const fullHtml = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <title>${title}</title>
      <style>
        body {
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
          line-height: 1.6;
          padding: 40px;
          max-width: 800px;
          margin: 0 auto;
        }
        pre {
          background-color: #f5f5f5;
          padding: 12px;
          border-radius: 4px;
          overflow-x: auto;
        }
        code {
          font-family: "SFMono-Regular", Consolas, "Liberation Mono", Menlo, monospace;
          font-size: 85%;
        }
        img {
          max-width: 100%;
        }
        table {
          border-collapse: collapse;
          width: 100%;
        }
        table, th, td {
          border: 1px solid #ddd;
        }
        th, td {
          padding: 8px;
          text-align: left;
        }
        th {
          background-color: #f2f2f2;
        }
        ${customCss}
      </style>
    </head>
    <body>
      ${htmlContent}
    </body>
    </html>
  `;

  // Launch browser and create PDF
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  await page.setContent(fullHtml, { waitUntil: 'networkidle0' });
  await page.pdf({
    path: outputPath,
    format: 'A4',
    margin: {
      top: '40px',
      right: '40px',
      bottom: '40px',
      left: '40px'
    },
    printBackground: true
  });

  await browser.close();
  
  return outputPath;
}