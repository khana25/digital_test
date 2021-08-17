#!/bin/bash

# Output that we are Running the tests
curl -XPOST -H "User-Agent: B&W Test Coverage" -H "Authorization: token ${GITHUB_STATUS_TOKEN}" -H "Content-type: application/json" -d "{\"state\": \"pending\", \"description\": \"Running tests...\", \"context\": \"fe-test/e2e\"}" "https://api.github.com/repos/bloomandwild/bloomandwild-frontend/statuses/${CODEBUILD_GIT_COMMIT}"

# If we have defined spec files, only run those, otherwise, split the tests evenly across the workers ...
if  [ ! -z "$SPEC_FILES" ]; then
  specs=$SPEC_FILES
  npm run cypress:run -- --browser chrome --spec $specs || true
elif [ ! -z "$WORKER" ]; then
  specs=$(node -e 'require("./split-tests.js").splitTests()' worker=$WORKER workers=$WORKERS previousResults=https://s3-eu-west-1.amazonaws.com/bw-codeship-status-logs/frontend-e2e/staging/mochawesome.json)
  npm run cypress:run -- --browser chrome --spec $specs || true
else
  # ... all run all the tests
  npm run cypress:run -- --browser chrome || true
fi


# Change all the video paths, ready for S3
node -e 'require("./extract-report-summary.js").changeVideoPath()' "results/*.json" "results/$WORKER/"

# copy to the to-upload file, ready to be uploaded to s3
mkdir to-upload
cp -R results/*.json to-upload/
cp -R videos/* to-upload/

# Upload the report to S3
destination=s3://bw-codeship-status-logs/frontend-e2e/${CODEBUILD_GIT_COMMIT}/results/${WORKER}/
aws s3 cp --no-progress --recursive to-upload/ ${destination} --cache-control "public, max-age=0" --acl public-read

# If we are not running in "worker mode", then combine our reports and upload to s3
if  [ -z "$WORKER" ]; then
  bash combine_e2e_reports.sh
fi

