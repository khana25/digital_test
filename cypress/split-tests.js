/**
 * Require
 */
const fs = require('fs');
const glob = require('glob');
const rp = require('request-promise-native');

/**
 * Get the last tests results
 * @returns
 */
function getLastTestResults(url) {
  return rp
    .get(url)
    .then((data) => JSON.parse(data))
    .catch((e) => ({}));
}

module.exports.splitTests = () => {
  // Better format the arguments passed in
  const args = process.argv.reduce((acc, v) => {
    const split = v.split('=');
    return Object.assign(acc, { [split[0]]: split[1] || split[0] });
  }, {});
  const SET_SIZE = parseInt(args.workers);
  const WORKER_NUMBER = parseInt(args.worker);
  const PREVOUS_RESULTS_URL = args.previousResults;

  return getLastTestResults(PREVOUS_RESULTS_URL).then((lastReportData) => {
    /**
     * Spec directory and report url
     */
    const specFiles = glob.sync(`integration/**/*.spec.ts`);
    const report = lastReportData;

    /**
     * Get the duration for previously ran spec, or the average of them all
     */
    let averageDuration = 1;
    if (report && report.stats) {
      averageDuration = report.stats.duration / (report.stats.suites - report.stats.pending);
    }

    const specFilesWithDuration = specFiles.map((file) => {
      // attempt to match a previously ran spec
      const found = (report.results || []).find((f) => f.fullFile == file);
      // Sum the duration of any of the 'suites' within it
      const duration = found ? found.suites.reduce((acc, s) => acc + s.duration, 0) : 0;
      // If we can't find a duration, use the average
      return { file, duration: duration || averageDuration };
    });
    /**
     * Super basic Partition problem / Fair Division
     */
    const sets = new Array(SET_SIZE).fill(0).map((a) => []);
    const totals = new Array(SET_SIZE).fill(0);
    const specs = specFilesWithDuration.sort((a, b) => b.duration - a.duration); // descending
    specs.forEach((spec) => {
      const minIndex = totals.indexOf(Math.min(...totals));
      totals[minIndex] += spec.duration;
      sets[minIndex].push(spec);
    });
    const specsForWorker = sets[WORKER_NUMBER - 1];
    // Return it, so we can pick it up in a bash file
    console.log(specsForWorker.map((f) => f.file).join(','));
  });
};
