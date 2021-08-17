/**
 * Instead of installing jq to create the status
 * A super simple node module will do it for us.
 * Hacky, but simple
 */
const fs = require('fs');
const glob = require('glob');

/**
 * Return the summary, used for the github status
 */
module.exports.summary = () => {
  const data = JSON.parse(fs.readFileSync('./mochawesome.json'));
  console.log(
    `E2E: ${data.stats.passes} Passed | ${data.stats.failures} Failed | ${data.stats.pending} Skipped`
  );
};

/**
 * Return a github compatible "status"
 */
module.exports.status = () => {
  const data = JSON.parse(fs.readFileSync('./mochawesome.json'));
  console.log(data.stats.failures ? 'failure' : 'success');
};

/**
 * Re-order the report alphabetically, making it easier to find tests
 */
module.exports.reorderReport = () => {
  const data = JSON.parse(fs.readFileSync('./mochawesome.json'));

  data.results = data.results
    .slice()
    .sort((a, b) =>
      a.suites[0].title > b.suites[0].title ? 1 : b.suites[0].title > a.suites[0].title ? -1 : 0
    );

  fs.writeFileSync('./mochawesome.json', JSON.stringify(data, null, 2));
};

/**
 * We need to change any of the video paths inside the context, so that we can display
 * the video correctly when the mochawesome HTML is produced
 * Usage: node -e 'require("./extract-report-summary.js").changeVideoPath()' "results/*.json" "results/1/"
 */
module.exports.changeVideoPath = () => {
  const jsonReportPath = process.argv[1]; // eg 'results/*.json'
  const toPrepend = process.argv[2]; // eg `'results/1/'

  // Loop through directory, and change the video URL to add the prepended folder
  glob.sync(jsonReportPath).forEach((filePath) => {
    const data = JSON.parse(fs.readFileSync(filePath));

    if (!data || !data.results) {
      return;
    }

    data.results = data.results.map((r) => {
      r.suites = r.suites.map((s) => {
        s.tests = s.tests.map((t) => {
          const context = JSON.parse(t.context);
          // If there is a slash, we need to prepend the file
          if (context.value.indexOf('/') > 0 && !context.value.indexOf(toPrepend) > -1) {
            context.value = `${toPrepend}${context.value}`;
          }
          t.context = JSON.stringify(context);
          return t;
        });

        return s;
      });

      return r;
    });
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  });
};
