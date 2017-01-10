module.exports = {
  url: '', // footlocker url of shoe
  size: '', // your shoe size, i.e, 10 | 10.5
  firstName: '',
  lastName: '',
  phoneNumber: '',
  email: '',
  shipping: { 
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '', // state code, i.e., CA or NY
    zipCode: ''
  },
  billing: {
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '', // state code, i.e., CA or NY
    zipCode: ''
  },
  payment: {
    number: '',
    month: '', // month in two digit, i.e., 01 - January | 02 - Feb | 03 - March ... 
    year: '', // last two digits, i.e., 23 - 2023 | 24 - 2024
    csc: '' // security code on your card
  }
};