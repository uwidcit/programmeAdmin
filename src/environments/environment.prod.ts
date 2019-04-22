export const environment = {
  production: true,
  host:"https://nmendex.app:3004",
  config: {
    apiKey: 'AIzaSyCYRRom29CfnxtD6uQSTKL--SRGpV_S1HU',
    authDomain: 'uwiprogrammeadmin.firebaseapp.com',
    databaseURL: 'https://uwiprogrammeadmin.firebaseio.com',
    projectId: 'uwiprogrammeadmin',
    storageBucket: 'uwiprogrammeadmin.appspot.com',
    messagingSenderId: '904597835769'
  },
  facURL: 'https://nmendex.app:3004/sta/faculties', // returns an object contain the faculty abbreviation as the key and the full name as the value
  allProgsBy: 'https://nmendex.app:3004/sta/programmes/',
  facStats: 'https://nmendex.app:3004/sta/stats', // returns an object containing each faculty and the number of programmes offered in each
  subjects: 'https://nmendex.app:3004/subjects', // returns a list fo all CSEC and CAPE subjects stored in database
  testJSON: '../assets/mock-data/test.json',
  getErrors: 'https://nmendex.app:3004/errors', //  returns a JSON array of all subjects failing validation after parsing
  downloadErrors: '',
  upload: 'https://nmendex.app:3004/upload', // URL to upload excel file to
  errors: "https://nmendez.app/engine/out/errors.csv",
  faculties: {
    'Social Sciences': 'fss',
    'Engineering': 'eng',
    'Food & Agriculture': 'ffa',
    'Humanities & Education': 'fhe',
    'Medical Sciences': 'fms',
    'Law': 'law',
    'Science & Technology': 'fst',
  },
  facColour: {
    'Social Sciences': '#F36E21',
    'Engineering': '#00AEEF',
    'Food & Agriculture': '#00A54F',
    'Humanities & Education': '#0072BC',
    'Medical Sciences': '#ED028C',
    'Law': '#231F20',
    'Science & Technology': '#FCB814',
    'all_faculties': '#1E88E5'
  }
};
