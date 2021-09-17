import { Properties } from "./leftRight";

export interface Comparing {
    left: Properties;
    right: Properties;
    isCompared: boolean;
    initialCompare: () => void;
    closeAndClean: () => void;
  }