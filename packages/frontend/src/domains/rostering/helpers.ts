export const YES = "Yes";
export const NO = "No";
export const UNKNOWN = "Unknown";

export const getBgColor = (
  value: string,
  options: { alternateColors?: boolean } = {}
) => {
  switch (value) {
    case YES:
      return options.alternateColors ? "bg-cyan-400" : "bg-green-300";
    case NO:
      return options.alternateColors ? "bg-slate-400" : "bg-red-300";
    case UNKNOWN:
      return "bg-amber-300";
    default:
      return "";
  }
};

export const getBgColorForRoster = (b: boolean | undefined) => {
  const value = b !== null ? getStringFromBoolean(b) : "";
  switch (value) {
    case YES:
      return "";
    case NO:
      return "bg-red-100";
    default:
      return "bg-amber-100";
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

export const getStringFromBoolean = (value: boolean | undefined | null) => {
  switch (value) {
    case true:
      return YES;
    case false:
      return NO;
    case undefined:
    case null:
      return UNKNOWN;
    default:
      throw new Error(`Value cannot be transformed: ${value}`);
  }
};
