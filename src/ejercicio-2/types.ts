import { Artist } from "./artist";
import { Album } from "./album";
import { Song } from "./song";

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
