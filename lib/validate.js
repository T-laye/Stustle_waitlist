export function validation(values) {
  const errors = {};

  if (!values.name) {
    errors.name = "Required";
  }
  if (!values.email) {
    errors.email = "Required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }
  if (!values.phone) {
    errors.phone = "Required";
  } else if (!/^\+?\d{10,}$/i.test(values.phone)) {
    errors.phone = "Invalid phone number";
  }
  if (!values.agreement) {
    errors.agreement = "Please check the checkbox";
  }

  return errors;
}

export function contact(values) {
  const errors = {};

  if (!values.message) {
    errors.message = "Required";
  }
  if (!values.subject) {
    errors.subject = "Required";
  }

  return errors;
}
