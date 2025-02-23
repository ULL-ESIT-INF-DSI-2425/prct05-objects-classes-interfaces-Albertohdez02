import { artistInfo } from "./types";

/**
 * Represents an Artist
 *
 * This class initializes an Artist with its information.
 *
 * Class Artist
 */
export class Artist implements artistInfo {
  /**
   * Constructor on an object of the class Artist
   * @param name - a string with the name of the Artist
   * @param monthlyListeners - a number with the monthly listeners of an Artist
   * @param discography - a string with the discograpy of an Artist
   */
  constructor(
    public readonly name: string,
    public readonly monthlyListeners: number,
    public readonly discography: string,
  ) {
    if (name == "") throw new Error("An artist must have a name.");
    if (monthlyListeners < 0)
      throw new Error("Monthly listeners must be a positive number");
  }
}