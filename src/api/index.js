'use strict';
const BASE_URL = "http://localhost:8080";

export function NOTE_BOOK() {
  return {
    "getNoteBook": BASE_URL + '/note_books',
    "delNoteBook": BASE_URL + '/note_book/',
    "upNoteBook": BASE_URL + '/note_book/'
  }
}
