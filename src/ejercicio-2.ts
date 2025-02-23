export type Discography = Album[];
export type Entry = [Artist, Discography];

/**
 * Enum representing different music genres.
 */
export enum MusicGenre {
  ROCK = "Rock",
  POP = "Pop",
  JAZZ = "Jazz",
  HIP_HOP = "Hip Hop",
  RAP = "Rap",
  ELECTRONIC = "Electronic",
  REGGAE = "Reggae",
  CLASSICAL = "Classical",
  COUNTRY = "Country",
  METAL = "Metal",
  BLUES = "Blues",
  R_AND_B = "R&B",
  FOLK = "Folk",
  DISCO = "Disco",
  FUNK = "Funk",
  SOUL = "Soul",
  LATIN = "Latin",
  REGGAETON = "Reggaeton",
  PUNK = "Punk",
  HOUSE = "House",
  TECHNO = "Techno",
  TRAP = "Trap",
  INDIE = "Indie",
  GOSPEL = "Gospel",
  OPERA = "Opera",
  SKA = "Ska",
  GRUNGE = "Grunge",
  SYNTHPOP = "Synthpop",
  AMBIENT = "Ambient",
  LOFI = "Lo-Fi",
}

/**
 * Interface representing the information of an artist.
 */
export interface artistInfo {
  name: string;
  monthlyListeners: number;
  discography: string;
}

/**
 * Interface representing the information of a song.
 */
export interface songInfo {
  name: string;
  duration: number;
  genres: MusicGenre[];
  reproductions: number;
  single?: boolean;
}

/**
 * Interface representing the information of an album.
 */
export interface albumInfo {
  name: string;
  year: number;
  songs: Song[];
}

/**
 * Interface representing the information of Music Library entry.
 */
export interface LibraryEntry {
  Artist: string;
  "Monthly Listeners": number;
  Album: string;
  Year: number;
  Song: string;
  "Duration (min)": string;
  Genres: string;
  Reproductions: string;
  Single: string;
}

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
