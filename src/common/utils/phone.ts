import {
  CountryCode,
  isValidPhoneNumber,
  parsePhoneNumber,
} from 'libphonenumber-js/mobile';

export const getInternationalPhoneNumber = (
  phoneNumber: string,
  countryCode: CountryCode = 'NG'
): string => {
  if (!isValidPhoneNumber(phoneNumber, countryCode)) {
    return phoneNumber; // If you do proper validation at the form level, you should never get to this block
  }

  const parsedPhoneNumber = parsePhoneNumber(phoneNumber, countryCode);

  return `${parsedPhoneNumber.number}`;
};
