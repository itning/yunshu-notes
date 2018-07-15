'use strict';
const BASE_URL = "http://localhost:8080";

export function NOTE_BOOK() {
  return {
    "getNoteBook": BASE_URL + '/note_books',
    "delNoteBook": BASE_URL + '/note_book/',
    "upNoteBook": BASE_URL + '/note_book/',
    "newNoteBook": BASE_URL + '/note_book'
  }
}

export function NOTE() {
  return {
    "getNotes": BASE_URL + '/notes/',
    "getNote": BASE_URL + '/note/',
    "delNote": BASE_URL + '/note/',
    "upNote": BASE_URL + '/note/',
    "newNote": BASE_URL + '/note'
  }
}

export function USER() {
  return {
    "login": BASE_URL + '/login',
    "logout": BASE_URL + '/logout',
    "registered": BASE_URL + '/registered',
    "getLoginUser": BASE_URL + '/getLoginUser',
    "getCode": BASE_URL + '/get_code?email=',
    "getVCode": BASE_URL + '/forget_get_code?email=',
    "forgetPassword": BASE_URL + '/forget_password',
    "changeUserProfile": BASE_URL + '/change_user_profile'
  }
}

