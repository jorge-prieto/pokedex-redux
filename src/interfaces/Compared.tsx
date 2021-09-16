import { Left, Right } from "./leftRight";

export interface Comparing {
    left: Left;
    right: Right;
    isCompared: boolean;
    initialCompare: () => void;
    closeAndClean: () => void;
  }