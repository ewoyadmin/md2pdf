# md2pdf

A command-line tool to convert Markdown files to PDF.

## Installation

### Global Installation

```bash
npm install
npm link
```

This will make the `md2pdf` command available globally on your system.

## Usage

### Basic Usage

```bash
md2pdf input.md
```

This will generate `input.pdf` in the same directory.

### Specify Output Path

```bash
md2pdf input.md -o output.pdf
```

### Custom Styling

```bash
md2pdf input.md -s custom.css
```

### Read from stdin

Pass `-` as the input (or omit it) to read Markdown from stdin:

```bash
cat input.md | md2pdf - -o output.pdf
```

When reading from stdin, the output defaults to `output.pdf` in the current directory and the title defaults to `Document`.

### Set Document Title

```bash
md2pdf input.md -t "My Document Title"
```

### Help

```bash
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
