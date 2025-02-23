import { songInfo, MusicGenre } from "./types";

/**
 * Represents a Song
 *
 * This class initializes a Song with its information.
 *
 * Class Song
 */
export class Song implements songInfo {
  /**
   * Constructor of an object of the class Song
   * @param name - a string with the name of a song
   * @param duration - a number with the duration in seconds of a song
   * @param genres - a list of MusicGenres that a song belongs to
   * @param reproductions - a number with the reproductions of a song
   * @param single - an optional boolean value that states if a song is a single or not
   */
  constructor(
    public readonly name: string,
    public readonly duration: number,
    public readonly genres: MusicGenre[],
    public readonly reproductions: number,
    public readonly single?: boolean,
  ) {
    if (name == "") throw new Error("A song must have a name");
    if (duration <= 0)
      throw new Error("The duration of a song must be greater than 0 seconds.");
    if (reproductions < 0)
      throw new Error("The reproductions of a song must be a positive number.");
    if (genres.length == 0)
      throw new Error("A song must belong to at least one genre.");
    if (this.single == undefined) this.single = false;
  }
}