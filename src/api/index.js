'use strict';
const BASE_URL = "http://localhost:8080";

export function NOTE_BOOK() {
  return {
    "getNoteBook": BASE_URL + '/note_books',
    "delNoteBook": BASE_URL + '/note_book/',
    "upNoteBook": BASE_URL + '/note_book/',
    "newNoteBook": BASE_URL + '/note_books'
  }
}

export function NOTE() {
  return {
    "getNotes": BASE_URL + '/notes/',
    "getNote": BASE_URL + '/note/',
    "delNote": BASE_URL + '/note/',
    "upNote": BASE_URL + '/note/',
    "newNote": BASE_URL + '/notes'
  }
}

export function USER() {
  return {
    "login": BASE_URL + '/login',
    "logout": BASE_URL + '/logout',
    "registered": BASE_URL + '/registered',
    "getLoginUser": BASE_URL + '/getLoginUser'
  }
}

