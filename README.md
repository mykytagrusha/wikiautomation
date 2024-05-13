# WikiAutomation
## Test cases description

Tests cases are placed [here](https://docs.google.com/document/d/1TP_CWfhmewxIf1AjNOHKviSSc6PN6ZM1J0dzIcBmAzU/edit?usp=sharing)

## How to run tests

### Locally

1. Install dependencies

```sh
npm i
```

2. Run tests

```sh
npm run test
```

3. Show reports

```sh
npm run show-report
```

In console you will see the link to the report (like `http://[::1]:9323/`). Open it in browser to see the report.
Video and screenshots are also available in the report for each step.


### Docker

1. Build image
```sh
docker build -t wiki-automation .
```

2. Run container with created image
```sh
docker run --rm --ipc=host -v $PWD/playwright-report:/app/playwright-report wiki-automation npm run test-html-report
```

3. Show reports

Open `playwright-report/index.html` in browser to see the report.
Video and screenshots are also available in the report for each step.