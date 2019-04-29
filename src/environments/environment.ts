export const environment = {
  production: false,
  host: 'https://nmendez.app:8080',
  config: {
    apiKey: 'AIzaSyCYRRom29CfnxtD6uQSTKL--SRGpV_S1HU',
    authDomain: 'uwiprogrammeadmin.firebaseapp.com',
    databaseURL: 'https://uwiprogrammeadmin.firebaseio.com',
    projectId: 'uwiprogrammeadmin',
    storageBucket: 'uwiprogrammeadmin.appspot.com',
    messagingSenderId: '904597835769'
  },
  facURL: 'https://nmendez.app:8080/sta/faculties', // returns { fac_abbr: faculty_name }
  allProgsBy: 'https://nmendez.app:8080/sta/programmes/',
  facStats: 'https://nmendez.app:8080/sta/stats', // returns an object containing each faculty and the number of programmes offered in each
  subjects: 'https://nmendez.app:8080/subjects', // returns a list fo all CSEC and CAPE subjects stored in database
  testJSON: '../assets/mock-data/test.json',
  getErrors: 'https://nmendez.app:8080/errors', //  returns a JSON array of all subjects failing validation after parsing
  downloadErrors: 'https://nmendez.app:8080/files/errors/errors.csv',
  upload: 'https://nmendez.app:8080/upload', // URL to upload excel file to
  faculties: {
    'Social Sciences': 'fss',
    'Engineering': 'eng',
    'Food & Agriculture': 'ffa',
    'Humanities & Education': 'fhe',
    'Medical Sciences': 'fms',
    'Law': 'law',
    'Science & Technology': 'fst',
    'Sport': 'fos'
  },
  facColour: {
    'Social Sciences': '#F36E21',
    'Engineering': '#00AEEF',
    'Food & Agriculture': '#00A54F',
    'Humanities & Education': '#0072BC',
    'Medical Sciences': '#ED028C',
    'Law': '#231F20',
    'Science & Technology': '#FCB814',
    'Sport' :'#f6b412',
    'all_faculties': '#1E88E5'
  }
};
