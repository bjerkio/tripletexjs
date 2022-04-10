import { TripletexClientConfig } from "./types";

/**
 * Tripletex Client
 *
 * @example
 *
 */
export class TripletexClient {
  constructor(private readonly config: TripletexClientConfig) {}

  bank(): TripletexBank {
    const bank = new TripletexBank();
  }
}
