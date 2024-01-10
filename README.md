# HTML To PDF Lambda

This is a Lambda function code that generate PDF using Puppeteer. HTML is passed to the function to be rendered in the browser with JS and then PDF is generated from what is visible on the screen.

## Usage

### Deployment

In order to deploy the example, you need to run the following command:

```
$ serverless deploy
```

### Invocation

After successful deployment configure API Gateway on AWS to be the trigger for the Lambda. Using the HTTP endpoint you can hit it passed HTML content as POST body in the request and in return Lambda will return PDF data that is base64 encoded. You can Base64 decode it client side and save it as PDF file.

```bash
serverless invoke --function html-to-pdf
```

Which should result in response similar to the following:

```json
{
  "statusCode": 200,
  "body": "pdf-data-base64-encoded",
  "isBase64Encoded": true,
  "headers": {
    "content-type": "application/pdf"
  }
}
```
