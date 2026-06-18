import { countryCode } from '@/modules/app/countries/constants/country.constant';

export const getCurrentCountryCode = (country: string) => {
  return country ?? countryCode.VN;
};
