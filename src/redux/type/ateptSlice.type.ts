/** @format */

import { AttemptDto } from "../dto/stempt.dto";

export interface AttemptSliceType {
  attempts: AttemptDto[];
  isLoading: boolean;
  error: string | null;
}
