import { Injectable } from '@nestjs/common';
import { DatabaseInstance, databaseFake } from './fakeDB/fakeDB';

@Injectable()
export class DatabaseService {
  private database: DatabaseInstance;

  constructor() {
    this.database = databaseFake.fakeDB();
  }

  get users() {
    return this.database.users;
  }

  // get artists() {
  //   return this.database.artists;
  // }

  // get tracks() {
  //   return this.database.tracks;
  // }

  // get albums() {
  //   return this.database.albums;
  // }

  // get favorites() {
  //   return this.database.favorites;
  // }
}
