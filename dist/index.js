"use strict";
// src/index.ts
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const readlineSync = __importStar(require("readline-sync"));
const library_1 = __importDefault(require("./library"));
const types_1 = require("./types");
const library = new library_1.default();
const showMenu = () => {
    console.log(`
    1. Add Book
    2. Update Book
    3. Delete Book
    4. Search Books
    5. List All Books
    6. Save Inventory
    7. Load Inventory
    8. Exit
    `);
};
const getBookDetails = () => {
    const title = readlineSync.question('Title: ');
    const author = readlineSync.question('Author: ');
    const genre = readlineSync.keyInSelect(Object.values(types_1.Genre), 'Genre: ', { cancel: false });
    const publishedYear = parseInt(readlineSync.question('Published Year: '), 10);
    const isAvailable = readlineSync.keyInYNStrict('Is Available? ');
    return {
        title,
        author,
        genre: Object.values(types_1.Genre)[genre],
        publishedYear,
        isAvailable
    };
};
const saveInventory = () => {
    const filename = readlineSync.question('Enter filename to save: ');
    library.saveToFile(filename);
    console.log('Inventory saved.');
};
const loadInventory = () => {
    const filename = readlineSync.question('Enter filename to load: ');
    library.loadFromFile(filename);
};
const main = () => {
    while (true) {
        showMenu();
        const choice = readlineSync.question('Choose an option: ');
        switch (choice) {
            case '1':
                const newBook = getBookDetails();
                const addedBook = library.addBook(newBook);
                console.log('Added Book:', addedBook);
                break;
            case '2':
                const updateId = parseInt(readlineSync.question('Enter Book ID to update: '), 10);
                const updatedDetails = getBookDetails();
                const updatedBook = library.updateBook(updateId, updatedDetails);
                if (updatedBook) {
                    console.log('Updated Book:', updatedBook);
                }
                else {
                    console.log('Book not found.');
                }
                break;
            case '3':
                const deleteId = parseInt(readlineSync.question('Enter Book ID to delete: '), 10);
                if (library.deleteBook(deleteId)) {
                    console.log('Book deleted and inventory saved.');
                }
                else {
                    console.log('Book not found.');
                }
                break;
            case '4':
                const searchTitle = readlineSync.question('Title (leave blank if not searching by title): ');
                const searchAuthor = readlineSync.question('Author (leave blank if not searching by author): ');
                const genreOptions = ['All Genre', ...Object.values(types_1.Genre)];
                const searchGenreIndex = readlineSync.keyInSelect(genreOptions, 'Genre: ', { cancel: true });
                const searchGenre = searchGenreIndex === 0 ? undefined : (searchGenreIndex > 0 ? Object.values(types_1.Genre)[searchGenreIndex - 1] : undefined);
                const searchResults = library.searchBooks({
                    title: searchTitle || undefined,
                    author: searchAuthor || undefined,
                    genre: searchGenre,
                });
                if (searchResults.length > 0) {
                    console.log('Search Results:', searchResults);
                }
                else {
                    console.log('Book not found');
                }
                break;
            case '5':
                console.log('All Books:', library.listBooks());
                break;
            case '6':
                saveInventory();
                break;
            case '7':
                loadInventory();
                break;
            case '8':
                console.log('Exiting...');
                process.exit(0);
            default:
                console.log('Invalid option.');
        }
    }
};
main();
