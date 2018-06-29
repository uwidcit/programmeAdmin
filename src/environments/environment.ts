// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  facURL: 'https://snickdx.me:3004/sta/faculties',
  // deptsURL: 'https://snickdx.me:3004/sta/faculties/',
  allProgsBy: 'https://snickdx.me:3004/sta/programmes/',
  // allProgsByFac: `https://snickdx.me:3004/sta/programmes/{fac_name}`,
  // allProgsByDept: `https://snickdx.me:3004/sta/programmes/{fac_name}/{dept_name}`,
  programmes: 'https://snickdx.me:3004/sta/programmes',
  subjects: 'https://snickdx.me:3004/subjects',
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

// const faculties = {
//   'fss':'Social Sciences',
//   'eng':'Engineering',
//   'ffa':'Food & Agriculture',
//   'fhe':'Humanities & Education',
//   'fms':'Medical Sciences',
//   'law':'Law',
//   'fst':'Science & Technology'
// };

// const departments = {
//   'fss': {
//     'dms:':'Management Studies',
//     'behaviouralsciences':'Behavioural Sciences',
//     'economics':'Economics',
//     'politicalscience':'Political Science'
//   },
//   'eng': {
//     'chemical':'Chemical Engineering',
//     'civil':'Civil & Environmental Engineering',
//     'electrical':'Electrical and Computer Engineering',
//     'mechanical':'Mechanical & Manufacturing Engineering',
//     'geomatics':'Geomatics Engineering and Land Management',
//     'dean':'Office of the Dean',
//     'open': 'Open Campus'
//   },
//   'ffa': {
//     'daee':'Agricultural Economics and Extension',
//     'foodprod':'Food Production',
//     'geography':'Department of Geography',
//   },
//   'fhe': {
//     'history':'History',
//     'dcfa':'Creative and Festival Arts (DCFA)',
//     'dlcc':'Literary, Cultural & Communication Studies',
//     'cll':'Centre for Language Learning/ Modern Languages & Linguistics',
//     'dean':'Office of the Dean',
//     'dmll':'Modern Languages and Linguistics',
//     'jvum':'Seminary of St John Vianney and the Uganda Martyrs'',
//     'education':'School of Education'
//   },
//   'fms': {
//     'nursing':'School of Nursing',
//     'dean':'Office of the Dean',
//     'pharmacy':'School of Pharmacy',
//     'dentistry':'School of Dentistry',
//     'medicine':'School of Medicine',
//     'vet':'School of Veterinary Medicine'
//   },
//   'Law': [
//     {'na':'NA'}
//   ],
//   'fst': {
//     'dms':'Mathematics and Statistics',
//     'lifesciences':'Life Sciences',
//     'physics':'Physics',
//     'dcit':'Computing & Information Technology',
//     'chemistry':'Department of Chemistry',
//     'dean':'Office of the Dean'
//   }
// };
