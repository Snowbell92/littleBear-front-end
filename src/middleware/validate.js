const validate = values => {
  const errors = {};
  if (!values.fullName) {
    errors.fullName = 'You must provide your name!';
  }
 /* if (!values.email) {
    errors.email = 'Required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }*/
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
