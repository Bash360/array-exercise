/**
 *
 *
 * @param {String} DOB
 * @returns number
 */
function getAge(DOB) {
  return new Date().getFullYear() - new Date(DOB).getFullYear();
}
/**
 *
 *
 * @param {Array} input
 * @returns Object
 */
function classifier(input) {
  if (!(input instanceof Array)) {
    throw new Error.TypeError('type of input not array');
  }
  const students = [...input];

  students.sort((a, b) => {
    a.age = getAge(a.dob);
    b.age = getAge(b.dob);
    return a.age - b.age;
  });

  const output = {
    noOfGroups: 0,
  };
  students.forEach((currentValue) => {
    let {
      age,
      regNo,
    } = currentValue;
    const details = currentValue;
    regNo = parseInt(regNo, 10);
    if (output.noOfGroups === 0 || (age - output[`group${output.noOfGroups}`].members[0].age > 5) || (output[`group${output.noOfGroups}`].members.length >= 3)) {
      output.noOfGroups += 1;
      output[`group${output.noOfGroups}`] = {
        members: [],
        oldest: 0,
        sum: 0,
        regNos: [],
      };
    }
    output[`group${output.noOfGroups}`].members.push(details);
    output[`group${output.noOfGroups}`].oldest = age;
    output[`group${output.noOfGroups}`].sum += age;
    output[`group${output.noOfGroups}`].regNos.push(regNo);
    output[`group${output.noOfGroups}`].regNos.sort((a, b) => a - b);
  });
  return output;
}
module.exports = classifier;