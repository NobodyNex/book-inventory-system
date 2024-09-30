// src/library.ts
import { Book, Genre } from './types';
import * as fs from 'fs';

class Library {
    private books: Book[] = [];
    private nextId: number = 1;
    private filename: string = 'inventory.json'; 

    addBook(book: Omit<Book, 'id'>): Book {
        const newBook = { ...book, id: this.nextId++ };
        this.books.push(newBook);
        return newBook;
    }

    updateBook(id: number, updatedDetails: Partial<Omit<Book, 'id'>>): Book | null {
        const book = this.books.find(b => b.id === id);
        if (!book) return null;

        Object.assign(book, updatedDetails);
        return book;
    }

    deleteBook(id: number): boolean {
        const index = this.books.findIndex(b => b.id === id);
        if (index === -1) return false;

        this.books.splice(index, 1);
        this.saveToFile(this.filename); // บันทึกข้อมูลทันทีหลังจากลบ
        return true;
    }

    searchBooks(criteria: Partial<Book>): Book[] {
        const results = this.books.filter(book => {
            return Object.entries(criteria).every(([key, value]) => {
                if (value === undefined) return true; 
                const bookValue = book[key as keyof Book];
                if (typeof value === 'string' && typeof bookValue === 'string') {
                    return bookValue.toLowerCase().includes(value.toLowerCase());
                }
                return bookValue === value;
            });
        });
    
        if (results.length === 0) {
            
        }
    
        return results;
    }
    

    listBooks(): Book[] {
        return this.books;
    }

    saveToFile(filename: string): void {
        fs.writeFileSync(filename, JSON.stringify(this.books, null, 2));
    }

    loadFromFile(filename: string): void {
        if (fs.existsSync(filename)) {
            const data = fs.readFileSync(filename, 'utf-8');
            this.books = JSON.parse(data);
            this.nextId = this.books.length ? Math.max(...this.books.map(b => b.id)) + 1 : 1;
            this.filename = filename; 
            console.log(`Loaded inventory from ${filename}`);
        } else {
            console.log(`File ${filename} not found.`);
        }
    }
    
}

export default Library;
