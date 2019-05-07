export const Mockdata = {
  'subs': {
    'good': [
      {'name': 'Sub 1 (CSEC)', 'level': 'CSEC'},
      {'name': 'Sub 2 (CAPE)', 'level': 'CAPE'},
      {'name': 'Sub 3 (CSEC)', 'level': 'CSEC'},
      {'name': 'Sub 4 (CAPE)', 'level': 'CAPE'},
      {'name': 'Sub 5 (CSEC)', 'level': 'CSEC'},
      {'name': 'Sub 6 (CAPE)', 'level': 'CAPE'},
      {'name': 'Sub 7 (CSEC)', 'level': 'CSEC'},
      {'name': 'Sub 8 (CAPE)', 'level': 'CAPE'},
      {'name': 'Sub 9 (CSEC)', 'level': 'CSEC'},
      {'name': 'Sub 10 (CAPE)', 'level': 'CAPE'}
    ],
    'bad': [
      {'name': 'Sub 1 (CSEC)', 'level': 'CAPE'},
      {'name': 'Sub 2 (CAPE)', 'level': 'CSEC'},
      {'name': 'Sub 3 (CSE)', 'level': 'CSEC'},
      {'name': 'Sub 4 (CAP)', 'level': 'CAPE'},
      {'name': 'Sub 5 (CSEC)', 'level': 'CSE'},
      {'name': 'Sub 6 (CAPE)', 'level': 'CAP'},
      {'name': 'Sub 7', 'level': 'CSEC'},
      {'name': 'Sub 8', 'level': 'CAPE'},
      {'sub_name': 'Sub 9 (CSEC)', 'level': 'CSEC'},
      {'name': 'Sub 10 (CAPE)', 'sub_level': 'CAPE'},
      {'level': 'CAPE'},
      {'name': 'Sub 10 (CAPE)'}
    ]
  },
  'filterSubs': {
    'csec_subs': [
      {'name': 'Sub 1 (CSEC)', 'level': 'CSEC'},
      {'name': 'Sub 3 (CSEC)', 'level': 'CSEC'},
      {'name': 'Sub 5 (CSEC)', 'level': 'CSEC'},
      {'name': 'Sub 7 (CSEC)', 'level': 'CSEC'},
      {'name': 'Sub 9 (CSEC)', 'level': 'CSEC'}
    ],
    'cape_subs': [
      {'name': 'Sub 2 (CAPE)', 'level': 'CAPE'},
      {'name': 'Sub 4 (CAPE)', 'level': 'CAPE'},
      {'name': 'Sub 6 (CAPE)', 'level': 'CAPE'},
      {'name': 'Sub 8 (CAPE)', 'level': 'CAPE'},
      {'name': 'Sub 10 (CAPE)', 'level': 'CAPE'}
    ]
  },
  'facNames': {
    'good': {
      'facOne': 'Alphabet',
      'facTwo': 'Abbreviation',
      'facThree': 'wiefwefjwef'
    },
    'bad': {
      'ab23': 'Bad fac',
      '*)#)': 'Bad fac',
      231243: 231234
    },
    'bad2': {
      'abc': '',
      'abcd': '',
    }
  },
  'facStats': {
    'good': {
      'fac1': 12,
      'fac2': 24,
      'fac3': 50,
      'fac4': 12
    },
    'bad': {
      '23123': 12,
      'fac1': 'wekoefw',
      'fac2': true,
      'fac3': '',
      'fac4': 0
    }
  },
  'programmes': {
    'good': {
      'requirements': {
        'cape_passes': 2,
        'csec_passes': 5,
        'mandatory': ['English Language (CSEC)', 'Mathematics (CSEC)'],
        'combinations': [{
          'amt': 2,
          'list': ['Chemistry (CSEC)', 'Biology (CSEC)', 'Agricultural Science (CSEC)', 'Physics (CSEC)', 'Geography (CSEC)']
        }, {
          'amt': 2,
          'list': ['Agricultural Science (CAPE)', 'Biology (CAPE)', 'Chemistry (CAPE)', 'Computer Science (CAPE)', 'Electrical and Electronic Engineering Technology (CAPE)', 'Environmental Science (CAPE)', 'Green Engineering (CAPE)', 'Information Technology (CAPE)', 'Physics (CAPE)', 'Physical Education and Sport (CAPE)']
        }]
      },
      'campus': 'sta',
      'description': 'Students pursuing the BSc in General Physics choose to minor in any of the following areas: Electronics, Environmental Physics, Material Science or Medical Physics with Bioengineering.',
      'type': 'BACHELOR OF SCIENCE (BSc) GENERAL',
      'careers': ['Research Laboratories', 'Academia', 'Teaching'],
      'url': 'http://sta.uwi.edu/fst/physics/',
      'faculty': 'Science & Technology',
      'part_time': true,
      'full_time': true,
      'name': 'Physics (Major)',
      'department': 'Physics',
      'evening': false,
      'id': 39
    },
    'bad': [
      {
        'name': 'Agriculture - Major in Agricultural Extnsion',
        'type': 'BACHELOR OF SCIENCE (BSc) GENERAL',
        'part_time': false,
        'evening': false,
        'full_time': false,
        'faculty': 'Food & Agriculture',
        'department': 'Agricultural Economics & Extension',
        'duration': 0,
        'url': '',
        'requirements': {
          'cape_passes': 0,
          'csec_passes': 0,
          'mandatory': [],
          'combinations': []
        },
        'corrected': '',
        'report': {
          'valid': false,
          'corrected': '',
          'missing_subjects': '',
          'mandatory': 'Empty array',
          'req_conflict': '',
          'passes': 'No cape and no csec passes',
          'classes': 'None specified'
        }
      }, {
        'name': 'Agriculture - Minor in Communication and Extension',
        'type': 'BACHELOR OF SCIENCE (BSc) GENERAL',
        'part_time': false,
        'evening': false,
        'full_time': false,
        'faculty': 'Food & Agriculture',
        'department': 'Agricultural Economics & Extension',
        'duration': 3,
        'url': '',
        'requirements': {
          'cape_passes': 0,
          'csec_passes': 0,
          'mandatory': [],
          'combinations': []
        },
        'corrected': '',
        'report': {
          'valid': false,
          'corrected': '',
          'missing_subjects': '',
          'mandatory': 'Empty array',
          'req_conflict': '',
          'passes': 'No cape and no csec passes',
          'classes': 'None specified'
        }
      }, {
        'name': 'Agriculture - Minor in Entrepreneurship',
        'type': 'BACHELOR OF SCIENCE (BSc) GENERAL',
        'part_time': false,
        'evening': false,
        'full_time': false,
        'faculty': 'Food & Agriculture',
        'department': 'Agricultural Economics & Extension',
        'duration': 3,
        'url': '',
        'requirements': {
          'cape_passes': 0,
          'csec_passes': 0,
          'mandatory': [],
          'combinations': []
        },
        'corrected': '',
        'report': {
          'valid': false,
          'corrected': '',
          'missing_subjects': '',
          'mandatory': 'Empty array',
          'req_conflict': '',
          'passes': 'No cape and no csec passes',
          'classes': 'None specified'
        }
      }
    ]
  },
  'faculty': {
    'facOne': [{
      'requirements': {
        'cape_passes': 2,
        'csec_passes': 5,
        'mandatory': ['English Language (CSEC)', 'Mathematics (CSEC)'],
        'combinations': [{
          'amt': 2,
          'list': ['Chemistry (CSEC)', 'Biology (CSEC)', 'Agricultural Science (CSEC)', 'Physics (CSEC)', 'Geography (CSEC)']
        }, {
          'amt': 2,
          'list': ['Agricultural Science (CAPE)', 'Biology (CAPE)', 'Chemistry (CAPE)', 'Computer Science (CAPE)', 'Electrical and Electronic Engineering Technology (CAPE)', 'Environmental Science (CAPE)', 'Green Engineering (CAPE)', 'Information Technology (CAPE)', 'Physics (CAPE)', 'Physical Education and Sport (CAPE)']
        }]
      },
      'campus': 'sta',
      'description': 'Students pursuing the BSc in General Physics choose to minor in any of the following areas: Electronics, Environmental Physics, Material Science or Medical Physics with Bioengineering.',
      'type': 'BACHELOR OF SCIENCE (BSc) GENERAL',
      'careers': ['Research Laboratories', 'Academia', 'Teaching'],
      'url': 'http://sta.uwi.edu/fst/physics/',
      'faculty': 'Science & Technology',
      'part_time': true,
      'full_time': true,
      'name': 'Physics (Major)',
      'department': 'Physics',
      'evening': false,
      'id': 39
    }],
    'facTwo': [{
      'requirements': {
        'cape_passes': 2,
        'csec_passes': 5,
        'mandatory': ['English Language (CSEC)', 'Mathematics (CSEC)'],
        'combinations': [{
          'amt': 2,
          'list': ['Caribbean Studies (CAPE)', 'Communication Studies (CAPE)']
        }]
      },
      'campus': 'sta',
      'description': `Answer at least one of the following questions \'what is (programme)\' / \'what skills will students acquire\' / \'what is the focus of the programme\' LIMIT - 200 WORDS`,
      'type': 'BACHELOR OF SCIENCE (BSc):',
      'careers': ['Management Consulting', 'Human Resources', 'Business Management', 'Small Business Management', 'Information Technology', 'Industrial Relations', 'Marketing', 'Operations Management', 'Finance', 'International Relations', 'Advertising and Public Relations'],
      'url': '',
      'faculty': 'Social Sciences',
      'part_time': false,
      'full_time': true,
      'name': 'Marketing',
      'department': 'Management Studies',
      'evening': false,
      'id': 3
    }],
    'facThree': [{
      'requirements': {
        'cape_passes': 3,
        'csec_passes': 5,
        'mandatory': ['English Language (CSEC)', 'Mathematics (CSEC)', 'Chemistry (CSEC)', 'Physics (CSEC)', 'Biology (CSEC)', 'Biology (CAPE)', 'Chemistry (CAPE)'],
        'combinations': []
      },
      'campus': 'sta',
      'description': 'The Dental Programme leads to the Doctor of Dental Surgery (DDS) and extends over five years. The Pre-Clinical phase spans two years and utilises a Problem-Based Learning (PBL) methodology. The three clinical years leading to graduation, involve supervised patient management and prevention of oral and dental diseases. Upon the successful completion of the DDS degree, graduates are required to follow a programme in General Dentistry for a period of 12 months prior to certification by the Dental Council as being eligible for full registration to practice dentistry.',
      'type': 'DOCTOR OF',
      'careers': ['Public and Private Dental Hospitals or Clinics', 'Private Practice', 'Academia'],
      'url': 'http://sta.uwi.edu/fms/programmes.asp',
      'faculty': 'Medical Sciences',
      'part_time': false,
      'full_time': true,
      'name': 'Dental Surgery (DDS)',
      'evening': false,
      'department': 'School of Dentistry',
      'id': 89
    }]
  },
  all: [
    {
      'requirements': {
        'cape_passes': 2,
        'csec_passes': 5,
        'mandatory': ['English Language (CSEC)', 'Mathematics (CSEC)'],
        'combinations': [{
          'amt': 2,
          'list': ['Chemistry (CSEC)', 'Biology (CSEC)', 'Agricultural Science (CSEC)', 'Physics (CSEC)', 'Geography (CSEC)']
        }, {
          'amt': 2,
          'list': ['Agricultural Science (CAPE)', 'Biology (CAPE)', 'Chemistry (CAPE)', 'Computer Science (CAPE)', 'Electrical and Electronic Engineering Technology (CAPE)', 'Environmental Science (CAPE)', 'Green Engineering (CAPE)', 'Information Technology (CAPE)', 'Physics (CAPE)', 'Physical Education and Sport (CAPE)']
        }]
      },
      'campus': 'sta',
      'description': 'Students pursuing the BSc in General Physics choose to minor in any of the following areas: Electronics, Environmental Physics, Material Science or Medical Physics with Bioengineering.',
      'type': 'BACHELOR OF SCIENCE (BSc) GENERAL',
      'careers': ['Research Laboratories', 'Academia', 'Teaching'],
      'url': 'http://sta.uwi.edu/fst/physics/',
      'faculty': 'Science & Technology',
      'part_time': true,
      'full_time': true,
      'name': 'Physics (Major)',
      'department': 'Physics',
      'evening': false,
      'id': 39
    },
    {
      'requirements': {
        'cape_passes': 2,
        'csec_passes': 5,
        'mandatory': ['English Language (CSEC)', 'Mathematics (CSEC)'],
        'combinations': [{
          'amt': 2,
          'list': ['Caribbean Studies (CAPE)', 'Communication Studies (CAPE)']
        }]
      },
      'campus': 'sta',
      'description': 'Answer at least one of the following questions \'what is (programme)\' / \'what skills will students acquire\' / \'what is the focus of the programme\' LIMIT - 200 WORDS',
      'type': 'BACHELOR OF SCIENCE (BSc):',
      'careers': ['Management Consulting', 'Human Resources', 'Business Management', 'Small Business Management', 'Information Technology', 'Industrial Relations', 'Marketing', 'Operations Management', 'Finance', 'International Relations', 'Advertising and Public Relations'],
      'url': '',
      'faculty': 'Social Sciences',
      'part_time': false,
      'full_time': true,
      'name': 'Marketing',
      'department': 'Management Studies',
      'evening': false,
      'id': 3
    },
    {
      'requirements': {
        'cape_passes': 3,
        'csec_passes': 5,
        'mandatory': ['English Language (CSEC)', 'Mathematics (CSEC)', 'Chemistry (CSEC)', 'Physics (CSEC)', 'Biology (CSEC)', 'Biology (CAPE)', 'Chemistry (CAPE)'],
        'combinations': []
      },
      'campus': 'sta',
      'description': 'The Dental Programme leads to the Doctor of Dental Surgery (DDS) and extends over five years. The Pre-Clinical phase spans two years and utilises a Problem-Based Learning (PBL) methodology. The three clinical years leading to graduation, involve supervised patient management and prevention of oral and dental diseases. Upon the successful completion of the DDS degree, graduates are required to follow a programme in General Dentistry for a period of 12 months prior to certification by the Dental Council as being eligible for full registration to practice dentistry.',
      'type': 'DOCTOR OF',
      'careers': ['Public and Private Dental Hospitals or Clinics', 'Private Practice', 'Academia'],
      'url': 'http://sta.uwi.edu/fms/programmes.asp',
      'faculty': 'Medical Sciences',
      'part_time': false,
      'full_time': true,
      'name': 'Dental Surgery (DDS)',
      'evening': false,
      'department': 'School of Dentistry',
      'id': 89
    }
  ],
  'errors': {
    'good': [{
      'name': 'Agriculture - Major in Agricultural Extnsion',
      'type': 'BACHELOR OF SCIENCE (BSc) GENERAL',
      'part_time': false,
      'evening': false,
      'full_time': false,
      'faculty': 'Food & Agriculture',
      'department': 'Agricultural Economics & Extension',
      'duration': 0,
      'url': '',
      'requirements': {
        'cape_passes': 0,
        'csec_passes': 0,
        'mandatory': [],
        'combinations': []
      },
      'corrected': '',
      'report': {
        'valid': false,
        'corrected': '',
        'missing_subjects': '',
        'mandatory': 'Empty array',
        'req_conflict': '',
        'passes': 'No cape and no csec passes',
        'classes': 'None specified'
      }
    }],
    'bad': [{
      'name': 'Agriculture - Major in Agricultural Extnsion',
      'type': 'BACHELOR OF SCIENCE (BSc) GENERAL',
      'part_time': false,
      'evening': false,
      'full_time': false,
      'faculty': 'Food & Agriculture',
      'department': 'Agricultural Economics & Extension',
      'duration': 0,
      'url': '',
      'requirements': {
        'cape_passes': 0,
        'csec_passes': 0,
        'mandatory': [],
        'combinations': []
      },
    }, {
      'name': 'Agriculture - Major in Agricultural Extnsion',
      'type': 'BACHELOR OF SCIENCE (BSc) GENERAL',
      'part_time': false,
      'evening': false,
      'full_time': false,
      'faculty': 'Food & Agriculture',
      'department': 'Agricultural Economics & Extension',
      'duration': 0,
      'url': '',
      'requirements': {
        'cape_passes': 0,
        'csec_passes': 0,
        'mandatory': [],
        'combinations': []
      },
      'corrected': '',
      'report': {
        'valid': false,
        'corrected': 1239123,
        'missing_subjects': 20414,
        'mandatory': 'Empty array',
        'req_conflict': [],
        'passes': {},
        'classes': undefined
      }
    }, {
      'type': 'BACHELOR OF SCIENCE (BSc) GENERAL',
      'part_time': false,
      'evening': false,
      'full_time': false,
      'faculty': 'Food & Agriculture',
      'department': 'Agricultural Economics & Extension',
      'duration': 0,
      'url': '',
      'requirements': {
        'cape_passes': 0,
        'csec_passes': 0,
        'mandatory': [],
        'combinations': []
      },
      'corrected': '',
      'report': {
        'valid': false,
        'corrected': '',
        'missing_subjects': '',
        'mandatory': 'Empty array',
        'req_conflict': '',
        'passes': 'No cape and no csec passes',
        'classes': 'None specified'
      }
    }]
  }
};
