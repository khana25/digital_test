#!/bin/bash

# Download all our reports from S3
mkdir mocha-base-report
source=s3://bw-codeship-status-logs/frontend-e2e/${CODEBUILD_GIT_COMMIT}/results
aws s3 cp --no-progress --recursive ${source} mocha-base-results --exclude "*" --include "*.json"

# Now merge our report files
npx mochawesome-merge "./mocha-base-results/**/*.json" > mochawesome.json

# Re-order the report alphabetically
node -e 'require("./extract-report-summary").reorderReport()'

# Create the HTML report
npx --package mochawesome-report-generator marge mochawesome.json

# Also copy the underlying json that was used, so we can utilise this in the future
cp mochawesome.json mochawesome-report/

# Upload the report to S3
destination=s3://bw-codeship-status-logs/frontend-e2e/${CODEBUILD_GIT_COMMIT}/
aws s3 cp --no-progress --recursive mochawesome-report/ ${destination} --cache-control "public, max-age=0" --acl public-read
s3_coverage_link="https://s3-eu-west-1.amazonaws.com/bw-codeship-status-logs/frontend-e2e/${CODEBUILD_GIT_COMMIT}/mochawesome.html"

# If it's staging, also upload to the staging folder, so we can pick up the mochaawsome.json file to load balance
if [ "${GIT_BRANCH_RESOLVED}" == "staging" ]; then
  destination=s3://bw-codeship-status-logs/frontend-e2e/staging/
  aws s3 cp --no-progress --recursive mochawesome-report/ ${destination} --cache-control "public, max-age=0" --acl public-read
fi

echo "-------------------------------------------------------"
echo "[E2E REPORT]: $s3_coverage_link "
echo "-------------------------------------------------------"

# Set the GitHub status accordingly.
ghmsg=$(node -e 'require("./extract-report-summary").summary()')
ghstatus=$(node -e 'require("./extract-report-summary").status()')
curl -XPOST -H "User-Agent: B&W Test Coverage" -H "Authorization: token ${GITHUB_STATUS_TOKEN}" -H "Content-type: application/json" -d "{\"state\": \"$ghstatus\", \"target_url\": \"$s3_coverage_link\", \"description\": \"$ghmsg\", \"context\": \"fe-test/e2e\"}" "https://api.github.com/repos/bloomandwild/bloomandwild-frontend/statuses/${CODEBUILD_GIT_COMMIT}"

# Notify the channel if there is a failure
# Manage here: https://bloomandwild.slack.com/apps/A0F7XDUAZ-incoming-webhooks?next_id=0 and https://bloomandwild.slack.com/services/B01SX4ZLBFU
if [ "${GIT_BRANCH_RESOLVED}" == "staging" ]; then
  if [ "${ghstatus}" == "failure" ]; then
    curl https://hooks.slack.com/services/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 -d payload="{\"text\": \"Something Failed :( $ghmsg, report here: $s3_coverage_link\"}"
  else
    curl https://hooks.slack.com/services/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 -d payload="{\"text\": \"All passed! :) $ghmsg report here: $s3_coverage_link\"}"
  fi
fi