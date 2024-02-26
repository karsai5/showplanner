const escape = require('shell-quote').quote;

function listQuote(filenames) {
  return filenames.map((filename) => `'${filename}'`);
}

function listEscape(filenames) {
  return filenames.map((filename) => escape([filename]));
}

module.exports = {
  '**/*.{js,jsx,mjs,ts,tsx,mts}': (filenames) => [
    `prettier --write ${listQuote(listEscape(filenames)).join(' ')}`,
    `next lint --fix --file ${listQuote(filenames).join(' --file ')}`,
    `git add ${listQuote(filenames).join(' ')}`,
  ],
  '**/*.{json,md,mdx,css,html,yml,yaml,scss}': (filenames) => [
    `prettier --write ${listQuote(listEscape(filenames)).join(' ')}`,
    `git add ${listQuote(filenames).join(' ')}`,
  ],
};
