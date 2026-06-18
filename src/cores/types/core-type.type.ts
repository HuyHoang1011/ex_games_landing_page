// ********************************** START: Entity Type **********************************
export type CoreIdType = string;
export type CoreIdNumberType = number;
// export type CoreIdType = number | string;
// ********************************** END: Entity Type ************************************

// ********************************** START: UI Type *************************************
export type ComboBoxType<T = string> = {
  label: React.ReactNode;
  value: T;
  icon?: any;
};
// ************************************* END: UI Type *************************************
