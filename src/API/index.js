import * as Report from './Report/report'
import * as FileAPI from './File/File';
import * as Storage from './Storage/storage'
import * as Temperature from './Temperature';
import * as Auth from './Auth';

const API = {
    Report: Report,
    File: FileAPI,
    Storage: Storage,
    Temperature: Temperature,
    Auth: Auth
}

export {API}