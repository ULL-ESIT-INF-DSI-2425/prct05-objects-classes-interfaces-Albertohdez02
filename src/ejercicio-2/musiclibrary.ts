import { Entry, LibraryEntry } from "./types";

/**
 * Represents a MusicLibrary
 *
 * This class initializes a Music Library with entries and implements: .
 *
 * Class MusicLibrary
 */
export class MusicLibrary {
  private _entries: Entry[];
  private _formattedLibrary: LibraryEntry[];

  constructor(entries: Entry[]) {
    this._entries = entries;
    this._formattedLibrary = this.processLibrary();
  }

  /**
   * Processes the music library data into a structured format for display.
   * @returns An array of `LibraryEntry` objects ready to be displayed in a table.
   */
  private processLibrary(): LibraryEntry[] {
    return this._entries.flatMap(([artist, discography]) =>
      discography.flatMap((album) =>
        album.songs.map((song) => ({
          Artist: artist.name,
          "Monthly Listeners": artist.monthlyListeners,
          Album: album.name,
          Year: album.year,
          Song: song.name,
          "Duration (min)": (song.duration / 60).toFixed(2),
          Genres: song.genres.join(", "),
          Reproductions: song.reproductions.toString(), // ✅ Usa formato en-US para comas
          Single: song.single ? "Yes" : "No",
        })),
      ),
    );
  }

  /**
   * Method that add a new artist and their discography to the library.
   * @param entry - An `Entry` containing an artist and their albums.
   */
  public addEntry(entry: Entry): void {
    this._entries.push(entry);
    this._formattedLibrary = this.processLibrary(); // Update formatted data
  }

  /**
   * Method that the music library in a table format.
   */
  public showLibrary(): LibraryEntry[] {
    console.table(this._formattedLibrary);
    return this._formattedLibrary;
  }

  /**
   * Method that searches for artists, albums, or songs in the library.
   * @param query - The search term to filter artists, albums, or songs.
   * @returns an array with the  entries of the search result 
   */
  public searchLibrary(query: string): LibraryEntry[] {
    query = query.toLowerCase().trim();

    const filteredResults = this._formattedLibrary.filter((entry) => {
      const songName = String(entry.Song).toLowerCase();
      const albumName = String(entry.Album).toLowerCase();
      const artistName = String(entry.Artist).toLowerCase();
      const genres = String(entry.Genres).toLowerCase();

      const match =
        artistName.includes(query) ||
        albumName.includes(query) ||
        songName.includes(query) ||
        genres.includes(query);

      return match;
    });

    if (filteredResults.length > 0) {
      console.log("\n🔍 Search results:");
      console.table(filteredResults);
    } else {
      console.log(`No results were found for '${query}'.`);
    }
    return filteredResults;
  }

  /**
   * Method that given an album query returns the numbers of songs in that album
   * @param query - a string with the name of an album
   * @returns the number of songs in the given album
   */
  public getNumberSongAlbum(query: string): number {
    query = query.toLowerCase().trim();
  
    let numberSongs = 0;
  
    this._formattedLibrary.forEach((entry) => {
      if (entry.Album.toLowerCase() === query) {
        numberSongs++;
      }
    });
  
    return numberSongs;
  }

  /**
   * Method that given an album query the total duration of that album
   * @param query - a string with the name of an album
   * @returns the number of minutes of the album
   */
  public getAlbumDuration(query: string): number {
    query = query.toLowerCase().trim();
  
    return this._formattedLibrary
      .filter(entry => entry.Album.toLowerCase().trim() === query)
      .reduce((total, entry) => total + parseFloat(entry["Duration (min)"]), 0);
  }
  
  /**
   * Method that given an album query the total reproductions of the songs of the album
   * @param query - a string with the name of an album
   * @returns the number of reproductions of the songs in the album
   */
  public getAlbumReproductions(query: string): number {
    query = query.toLowerCase().trim();
  
    return this._formattedLibrary
      .filter(entry => entry.Album.toLowerCase().trim() === query)
      .reduce((total, entry) => total + parseFloat(entry.Reproductions), 0);
  }
}