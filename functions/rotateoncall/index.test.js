const rotateoncall = require('./index');
test('Rotate oncall user list', () => {
    const testResult = { lastname: 'testuser1',
    mobile: '123451',
    countrycode: '+61',
    firstname: 'testuser1',
    team: 'aws',
    id: 1,
    rank: 1 };
    
    const testArray = [ { lastname: 'testuser1',
    mobile: '123451',
    countrycode: '+61',
    firstname: 'testuser1',
    team: 'aws',
    id: 1,
    rank: 1 },
  { lastname: 'testuser2',
    mobile: '123452',
    countrycode: '+61',
    firstname: 'testuser2',
    team: 'aws',
    id: 2,
    rank: 2 },
  { lastname: 'testuser3',
    mobile: '123453',
    countrycode: '+61',
    firstname: 'testuser2',
    team: 'aws',
    id: 3,
    rank: 3 } ];
    
    const toBeResult = { lastname: 'testuser1',
    mobile: '123451',
    countrycode: '+61',
    firstname: 'testuser1',
    team: 'aws',
    id: 1,
    rank: 3 };

    //expect(rotateoncall.rotateOnCallDB(testResult, null, testArray)).toBe(new Error('Missing required props'));
    expect(rotateoncall.rotateOnCallDB(testResult, null, testArray)).toEqual(toBeResult);
});
test('Rotate oncall user list of size 1', () => {
    const testResult = { lastname: 'testuser1',
    mobile: '123451',
    countrycode: '+61',
    firstname: 'testuser1',
    team: 'aws',
    id: 1,
    rank: 1 };
    
    const testArray = [ { lastname: 'testuser1',
    mobile: '123451',
    countrycode: '+61',
    firstname: 'testuser1',
    team: 'aws',
    id: 1,
    rank: 1 },
    ];
    
    const toBeResult = { lastname: 'testuser1',
    mobile: '123451',
    countrycode: '+61',
    firstname: 'testuser1',
    team: 'aws',
    id: 1,
    rank: 1 };

    expect(rotateoncall.rotateOnCallDB(testResult, null, testArray)).toEqual(toBeResult);
});
