// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  facURL: 'https://snickdx.me:3004/sta/faculties',
  allProgsBy: 'https://snickdx.me:3004/sta/programmes/',
  programmes: 'https://snickdx.me:3004/sta/programmes',
  subjects: 'https://snickdx.me:3004/subjects',
  errors: '', // update this when the endpoint is made
  testJSON: '../assets/mock-data/test.json',
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
