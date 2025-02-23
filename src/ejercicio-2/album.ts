import { albumInfo } from "./types";
import { Song } from "./song";

/**
 * Represents an Album
 *
 * This class initializes an Album with its information.
 *
 * Class Album
 */
export class Album implements albumInfo {
  /**
   * Constructor of an object of the class Album
   * @param name - a string with the name of an album
   * @param year - a number with the release year of the album
   * @param songs - a list of songs that make the album
   */
  constructor(
    public readonly name: string,
    public readonly year: number,
    public readonly songs: Song[],
  ) {
    if (name == "") throw new Error("An album must have a name.");
    if (!Number.isInteger(year) || year < 0)
      throw new Error("The realese year of a song must be a positive integer.");
    if (songs.length == 0)
      throw new Error("An album must have at least 1 song.");
  }
}