# xml-translate
a simple tool to translate xml/html with google translate

## install
```bash
npm i -g xml-translate
```
## CLI
```
xml-translate <file>

Options:
  --help          Show help                                            [boolean]
  --version       Show version number                                  [boolean]
  --to, -t        target language                                     [required]
  --from, -f      source language                              [default: "auto"]
  --selector, -s  a jQuery style selector to match elements       [default: "*"]
  --output, -o    a file to write
```
a example to translate Android's strings.xml to `zh-tw`
```bash
xml-translate strings.xml -t zh-tw -s "string:not([translatable=false])" -o values-zh-rTW/strings.xml
```