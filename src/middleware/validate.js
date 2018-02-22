const validate = values => {
  const errors = {};
  if (!values.fullName) {
    errors.fullName = 'You must provide your name!';
  }
 /* if (!values.dob) {
    errors.dob = 'Please write your date of birth';
  }*/
  if (!/^(\d{4})-(\d{2})-(\d{2})$/i.test(values.dateOfBirth)) {
    errors.dateOfBirth = 'The formatting of the date is not valid. The date should look like this: 1971-01-25';
  }
  if (!values.sex) {
    errors.sex = 'You must provide your gender!';
  }
  if (!values.maritalStatus) {
    errors.maritalStatus = 'Required';
  }
   if (!values.ageFlag) {
    errors.ageFlag = 'You must provide your age or your date of birth!';
  }

  if (!values.familyFlag) {
        errors.familyFlag = 'You must select your family or enter a new family name';
    }
  return errors;
};

export default validate;
