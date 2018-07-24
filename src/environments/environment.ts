// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  facURL: 'https://snickdx.me:3004/sta/faculties', // returns an object contain the faculty abbreviation as the key and the full name as the value
  allProgsBy: 'https://snickdx.me:3004/sta/programmes/',
  facStats: 'https://snickdx.me:3004/sta/stats', // returns an object containing each faculty and the number of programmes offered in each
  subjects: 'https://snickdx.me:3004/subjects', // returns a list fo all CSEC and CAPE subjects stored in database
  testJSON: '../assets/mock-data/test.json',
  getErrors: 'https://snickdx.me:3004/errors', //  returns a JSON array of all subjects failing validation after parsing
  downloadErrors: 'https://snickdx.me:3004/errorsDownload.csv',
  upload: 'https://snickdx.me:3004/upload', // URL to upload excel file to
  faculties: {
    'Social Sciences': 'fss',
    'Engineering': 'eng',
    'Food & Agriculture': 'ffa',
    'Humanities & Education': 'fhe',
    'Medical Sciences': 'fms',
    'Law': 'law',
    'Science & Technology': 'fst'
  },
};
