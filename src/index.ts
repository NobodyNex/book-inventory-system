// src/index.ts

import * as readlineSync from 'readline-sync';
import Library from './library';
import { Genre, Book } from './types';

const library = new Library();

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

const getBookDetails = (): Omit<Book, 'id'> => {
    const title = readlineSync.question('Title: ');
    const author = readlineSync.question('Author: ');
    const genre = readlineSync.keyInSelect(Object.values(Genre), 'Genre: ', { cancel: false });
    const publishedYear = parseInt(readlineSync.question('Published Year: '), 10);
    const isAvailable = readlineSync.keyInYNStrict('Is Available? ');

    return {
        title,
        author,
        genre: Object.values(Genre)[genre],
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
                } else {
                    console.log('Book not found.');
                }
                break;

            case '3':
                const deleteId = parseInt(readlineSync.question('Enter Book ID to delete: '), 10);
                if (library.deleteBook(deleteId)) {
                    console.log('Book deleted and inventory saved.');
                } else {
                    console.log('Book not found.');
                }
                break;
                

                case '4':
                    const searchTitle = readlineSync.question('Title (leave blank if not searching by title): ');
                    const searchAuthor = readlineSync.question('Author (leave blank if not searching by author): ');
                
                    const genreOptions = ['All Genre', ...Object.values(Genre)];
                    const searchGenreIndex = readlineSync.keyInSelect(genreOptions, 'Genre: ', { cancel: true });
                    const searchGenre = searchGenreIndex === 0 ? undefined : (searchGenreIndex > 0 ? Object.values(Genre)[searchGenreIndex - 1] : undefined);
                
                    const searchResults = library.searchBooks({
                        title: searchTitle || undefined,
                        author: searchAuthor || undefined,
                        genre: searchGenre,
                    });
                
                    if (searchResults.length > 0) {
                        console.log('Search Results:', searchResults);
                    } else {
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