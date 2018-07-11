const admin = require('firebase-admin');
const serviceAccount = require('./uwiprogrammeadmin-firebase-adminsdk-1sand-fe7ea404d4.json');
const allProgs = require('./results.json');
const allSubsObjs = require('./subjects.json');
// const fs = require('fs');
const query_arr = [
    "Caribbean Studies (CAPE)",
    "Communication Studies (CAPE)",
    "Physics (CAPE)",
    "Pure Mathematics (CAPE)",
    "Computer Science (CAPE)",
    'Mathematics (CSEC)',
    'English Language (CSEC)',
    'Additional Mathematics (CSEC)',
    "Information Technology (CSEC)",
    "Physics (CSEC)",
    "Chemistry (CSEC)",
    "Chemistry (CAPE)",
    "Spanish (CSEC)"
];

admin.initializeApp({credential: admin.credential.cert(serviceAccount)});

const db = admin.firestore();
const docRef = db.collection('allProgs');
// allProgs.forEach(prog => { docRef.add(prog); });
main();

function main() {
  console.time('exec');
  queryAll().then((passed) => {
    console.log(passed.length);
    console.log('execution finished');
  });

  console.timeEnd('exec');
}

// const txt_out = fs.createWriteStream('test.txt', {flags: 'a'});
// txt_out.write(new Date().toString() + "\n\n");

function queryAll() {
  let query_objs = getSubjectObjects(query_arr);
  let qualified = [];
  return new Promise( (resolve, reject) => {

    docRef.get().then((snapshot) => {
      if (snapshot.length === 0) { reject('Empty database'); }

      snapshot.forEach((doc) => {
        let prog = doc.data();
        isQualified(query_objs, prog).then(result => {
          if (result) { qualified.push(prog); }
        }).catch(err => { console.log(err); })
      });
      resolve(qualified);
    })

  })
}


function getSubjectObjects(sub_names) {
  let found = [];
  allSubsObjs.forEach(obj => {
    if (sub_names.includes(obj.name)) { found.push(obj); }
  });

  return found;
}

let isQualified = async (
  sublist,//array of subjects
  {
    requirements,
    mandlist=requirements.mandatory,
    combos=requirements.combinations,
    mand_amt=requirements.mandatory.length,
    cape_amt=requirements.cape_passes,
    csec_amt=requirements.csec_passes
  }
)=>{
  let subnames = [];
  //Counting csec and cape passes
  let count = sublist.reduce(
    (acc, sub)=> {
      acc[sub.level]++;
      subnames.push(sub.name);
      return acc;
    },
    {'CSEC': 0, 'CAPE': 0}
  );
  let cape_met = cape_amt <= count.CAPE;
  let csec_met = csec_amt <= count.CSEC;

  //Checking Mandatory Requirments
  let mandatory_met = requirements.mandatory.reduce(
    (acc, sub)=> acc && subnames.includes(sub),
    true
  );

  //Checking Combo Requirements
  let combos_met = true;
  if(requirements.hasOwnProperty("combinations")){
    requirements.combinations.forEach(combo=>{
      let combo_amt = subnames.reduce((acc, cur)=>{ acc += combo.list.includes(cur); return acc;}, 0);
      combos_met = combos_met && (combo.amt <= combo_amt )
    })
  }
  // console.log(cape_met, csec_met, mandatory_met, combos_met);
  return cape_met && csec_met && mandatory_met && combos_met;
};

