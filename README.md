# md2pdf

A command-line tool to convert Markdown files to PDF.

## Installation

### Global Installation

```
npm install
chmod +x index.js
npm install -g md2pdf
```

## Usage

### Basic Usage

```
md2pdf input.md
```

This will generate `input.pdf` in the same directory.

### Specify Output Path

```
md2pdf input.md -o output.pdf
```

### Custom Styling

```
md2pdf input.md -s custom.css
```

### Set Document Title

```
md2pdf input.md -t "My Document Title"
```

### Help

```
md2pdf --help
```

## Options

- `-o, --output <output>`: Output PDF file path
- `-s, --style <style>`: Custom CSS file path
- `-t, --title <title>`: Document title
- `-h, --help`: Display help information
- `-V, --version`: Display version number

## License

MIT
