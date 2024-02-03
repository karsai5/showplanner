export const YES = "YES";
export const NO = "NO";
export const UNKNOWN = "UNKNOWN";

export const getBgColor = (value: string) => {
  switch (value) {
    case YES:
      return "bg-green-300";
    case NO:
      return "bg-red-300";
    case UNKNOWN:
      return "bg-amber-300";
    default:
      return "";
  }
};

export const getBooleanFromString = (value: string) => {
  switch (value) {
    case YES:
      return true;
    case NO:
      return false;
    case UNKNOWN:
      return undefined;
    default:
      throw new Error(`Value cannot be transformed: ${value}`);
  }
};

export const getStringFromBoolean = (value: boolean | undefined) => {
  switch (value) {
    case true:
      return YES;
    case false:
      return NO;
    case undefined:
      return UNKNOWN;
    default:
      throw new Error(`Value cannot be transformed: ${value}`);
  }
};
