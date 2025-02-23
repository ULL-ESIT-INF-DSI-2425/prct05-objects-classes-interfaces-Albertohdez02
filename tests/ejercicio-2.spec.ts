import { describe, expect, test, beforeEach, vi } from "vitest";
import { MusicLibrary, Artist, Album, Song, MusicGenre, Entry, LibraryEntry } from "../src/ejercicio-2";

describe("MusicLibrary Class Tests", () => {
  let musicLibrary: MusicLibrary;

  let song1: Song, song2: Song, song3: Song;
  let album1: Album, album2: Album;
  let artist1: Artist, artist2: Artist;
  let entries: Entry[];

  beforeEach(() => {
    song1 = new Song("Imagine", 183, [MusicGenre.ROCK, MusicGenre.POP], 5000000);
    song2 = new Song("Let It Be", 240, [MusicGenre.ROCK], 7000000, true);
    song3 = new Song("Yesterday", 125, [MusicGenre.ROCK], 8000000);

    album1 = new Album("Greatest Hits", 1970, [song1, song2]);
    album2 = new Album("More Hits", 1965, [song3]);

    artist1 = new Artist("The Beatles", 10000000, "Greatest Hits, More Hits");
    artist2 = new Artist("Queen", 9000000, "Greatest Hits");

    entries = [[artist1, [album1, album2]], [artist2, []]];

    musicLibrary = new MusicLibrary(entries);
  });

  test("MusicLibrary should be initialized with the correct entries", () => {
    expect(musicLibrary).toBeInstanceOf(MusicLibrary);
  });

  test("Show Library should return correct data format", () => {
    expect(musicLibrary).toHaveProperty("_formattedLibrary");
    expect(musicLibrary["_formattedLibrary"]).toBeInstanceOf(Array);
    expect(musicLibrary["_formattedLibrary"].length).toBeGreaterThan(0);

    const firstEntry = musicLibrary["_formattedLibrary"][0];

    expect(firstEntry).toHaveProperty("Artist", "The Beatles");
    expect(firstEntry).toHaveProperty("Album", "Greatest Hits");
    expect(firstEntry).toHaveProperty("Year", 1970);
    expect(firstEntry).toHaveProperty("Song", "Imagine");
    expect(firstEntry).toHaveProperty("Duration (min)", (183 / 60).toFixed(2));
    expect(firstEntry).toHaveProperty("Genres", "Rock, Pop");
    expect(firstEntry).toHaveProperty("Reproductions", "5000000");
    expect(firstEntry).toHaveProperty("Single", "No");

    musicLibrary.showLibrary();
  });

  test("Adding a new entry should update the formatted library", () => {
    const song4 = new Song("Bohemian Rhapsody", 354, [MusicGenre.ROCK], 10000000);
    const album3 = new Album("A Night at the Opera", 1975, [song4]);
    const newEntry: Entry = [artist2, [album3]];

    musicLibrary.addEntry(newEntry);
    
    expect(musicLibrary["_formattedLibrary"]).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          Artist: "Queen",
          Album: "A Night at the Opera",
          Year: 1975,
          Song: "Bohemian Rhapsody",
          "Duration (min)": (354 / 60).toFixed(2),
          Genres: "Rock",
          Reproductions: "10000000",
          Single: "No",
        }),
      ])
    );
    musicLibrary.showLibrary();
  });

  test("Artist must have a name and positive monthly listeners", () => {
    expect(() => new Artist("", 1000, "Album")).toThrow("An artist must have a name.");
    expect(() => new Artist("Artist", -10, "Album")).toThrow("Monthly listeners must be a positive number");
  });

  test("Album must have a name and at least one song", () => {
    expect(() => new Album("", 2000, [song1])).toThrow("An album must have a name.");
    expect(() => new Album("No Songs", 2000, [])).toThrow("An album must have at least 1 song.");
  });

  test("Song must have a name, positive duration, and at least one genre", () => {
    expect(() => new Song("", 200, [MusicGenre.ROCK], 50000)).toThrow("A song must have a name");
    expect(() => new Song("No Duration", 0, [MusicGenre.ROCK], 50000)).toThrow("The duration of a song must be greater than 0 seconds.");
    expect(() => new Song("No Genre", 120, [], 50000)).toThrow("A song must belong to at least one genre.");
  });

  test("Adding a duplicate entry does not modify library incorrectly", () => {
    const beforeLength = musicLibrary["_formattedLibrary"].length;
    musicLibrary.addEntry([artist1, [album1]]);
    const afterLength = musicLibrary["_formattedLibrary"].length;
    expect(afterLength).toBeGreaterThan(beforeLength);
  });

  test("Show Library should not throw errors", () => {
    expect(() => musicLibrary.showLibrary()).not.toThrow();
  });

  // METHOD: searchLibray (SEARCHES ENTRIES THAT MATCHES A GIVEN QUERY)

  test("searchLibrary should return matching song entries", () => {
    const result: LibraryEntry[] = musicLibrary.searchLibrary("Imagine");
    expect(result.length).toBeGreaterThan(0);
    expect(result[0].Song).toBe("Imagine");
  });

  test("searchLibrary should return matching artist entries", () => {
    const result: LibraryEntry[] = musicLibrary.searchLibrary("The Beatles");
    expect(result.length).toBeGreaterThan(0);
    expect(result.every(entry => entry.Artist === "The Beatles")).toBeTruthy();
  });

  test("searchLibrary should return matching album entries", () => {
    const result: LibraryEntry[] = musicLibrary.searchLibrary("Greatest Hits");
    expect(result.length).toBeGreaterThan(0);
    expect(result.every(entry => entry.Album === "Greatest Hits")).toBeTruthy();
  });

  test("searchLibrary should return multiple results when multiple entries match", () => {
    const result: LibraryEntry[] = musicLibrary.searchLibrary("Rock");
    expect(result.length).toBeGreaterThan(1);
    expect(result.every(entry => entry.Genres.includes("Rock"))).toBeTruthy();
  });

  test("searchLibrary should be case insensitive", () => {
    const result: LibraryEntry[] = musicLibrary.searchLibrary("imagine");
    expect(result.length).toBeGreaterThan(0);
    expect(result[0].Song).toBe("Imagine");
  });

  test("searchLibrary should return an empty array when no matches are found", () => {
    const result: LibraryEntry[] = musicLibrary.searchLibrary("Nonexistent Song");
    expect(result.length).toBe(0);
  });


  test("searchLibrary should trim spaces from input", () => {
    const result: LibraryEntry[] = musicLibrary.searchLibrary("  Imagine  ");
    expect(result.length).toBeGreaterThan(0);
    expect(result[0].Song).toBe("Imagine");
  });

  // METHOD: getNumberSongAlbum (NUMBERS OF SONGS IN AN ALBUM)

  test("getNumberSongAlbum should return the correct number of songs in an album", () => {
    expect(musicLibrary.getNumberSongAlbum("Greatest Hits")).toBe(2);
  });

  test("getNumberSongAlbum should return 0 for a non-existent album", () => {
    expect(musicLibrary.getNumberSongAlbum("Nonexistent Album")).toBe(0);
  });

  test("getNumberSongAlbum should handle extra spaces in album names", () => {
    expect(musicLibrary.getNumberSongAlbum("  Greatest Hits  ")).toBe(2);
  });

  test("getNumberSongAlbum should be case insensitive", () => {
    expect(musicLibrary.getNumberSongAlbum("greatest hits")).toBe(2);
  });

  test("getNumberSongAlbum should return the correct count even if there are multiple songs from different albums with similar names", () => {
    expect(musicLibrary.getNumberSongAlbum("More Hits")).toBe(1);
  });

  // METHOD: getAlbumDuration (DURATION OF AN ALBUM IN MINUTES)

  test("getAlbumDuration should return the correct total duration of an album", () => {
    expect(musicLibrary.getAlbumDuration("Greatest Hits")).toBeCloseTo((183 + 240) / 60, 2);
  });

  test("getAlbumDuration should return 0 for a non-existent album", () => {
    expect(musicLibrary.getAlbumDuration("Nonexistent Album")).toBe(0);
  });

  test("getAlbumDuration should handle extra spaces in album names", () => {
    expect(musicLibrary.getAlbumDuration("  Greatest Hits  ")).toBeCloseTo((183 + 240) / 60, 2);
  });

  test("getAlbumDuration should be case insensitive", () => {
    expect(musicLibrary.getAlbumDuration("greatest hits")).toBeCloseTo((183 + 240) / 60, 2);
  });

  // METHOD: getAlbumReproductions (NUMBER OF REPRODUCTIONS OF ALL THE SONGS IN THE ALBUM)
  test("getAlbumReproductions should return the correct total reproductions of an album", () => {
    expect(musicLibrary.getAlbumReproductions("Greatest Hits")).toBe(5000000 + 7000000);
  });

  test("getAlbumReproductions should return 0 for a non-existent album", () => {
    expect(musicLibrary.getAlbumReproductions("Nonexistent Album")).toBe(0);
  });

  test("getAlbumReproductions should handle extra spaces in album names", () => {
    expect(musicLibrary.getAlbumReproductions("  Greatest Hits  ")).toBe(5000000 + 7000000);
  });

  test("getAlbumReproductions should be case insensitive", () => {
    expect(musicLibrary.getAlbumReproductions("greatest hits")).toBe(5000000 + 7000000);
  });
});
