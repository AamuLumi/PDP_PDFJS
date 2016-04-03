# PDP_PDFJS
[University Project] A project to generate PDF in JS from a form / files / ...

## Features

- [x] Generate defaults forms
- [x] Send PDF datas (fields values)
- [x] Generate a PDF
- [x] Send PDF to client
- [x] Read XML template files
- [x] Read DOCX template files
- [x] Generate a PDF with a template

## Installation

This application need a Meteor >= 1.3 installation.
If you're running on a older Meteor, please update.

```
meteor npm install
```

## Running

```
meteor
```

This command will start a server on port 3000.
An application must run on **http://localhost:3000**.

## Test

### Unit tests

```
npm run unit-tests
```

### Load tests

This is tests based on PDF generation time and templates uploads time with
different amount of clients.

```
npm run load-tests
```

### Acceptance tests

This command needs a running application on port 3000.
It will launch a **Chimp** application to test basic stories.

```
npm run acceptance-tests
```

## Licence

This project is MIT Licensed.
