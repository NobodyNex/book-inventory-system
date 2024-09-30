"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __importStar(require("fs"));
class Library {
    constructor() {
        this.books = [];
        this.nextId = 1;
        this.filename = 'inventory.json';
    }
    addBook(book) {
        const newBook = Object.assign(Object.assign({}, book), { id: this.nextId++ });
        this.books.push(newBook);
        return newBook;
    }
    updateBook(id, updatedDetails) {
        const book = this.books.find(b => b.id === id);
        if (!book)
            return null;
        Object.assign(book, updatedDetails);
        return book;
    }
    deleteBook(id) {
        const index = this.books.findIndex(b => b.id === id);
        if (index === -1)
            return false;
        this.books.splice(index, 1);
        this.saveToFile(this.filename); // บันทึกข้อมูลทันทีหลังจากลบ
        return true;
    }
    searchBooks(criteria) {
        const results = this.books.filter(book => {
            return Object.entries(criteria).every(([key, value]) => {
                if (value === undefined)
                    return true;
                const bookValue = book[key];
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
    listBooks() {
        return this.books;
    }
    saveToFile(filename) {
        fs.writeFileSync(filename, JSON.stringify(this.books, null, 2));
    }
    loadFromFile(filename) {
        if (fs.existsSync(filename)) {
            const data = fs.readFileSync(filename, 'utf-8');
            this.books = JSON.parse(data);
            this.nextId = this.books.length ? Math.max(...this.books.map(b => b.id)) + 1 : 1;
            this.filename = filename;
            console.log(`Loaded inventory from ${filename}`);
        }
        else {
            console.log(`File ${filename} not found.`);
        }
    }
}
exports.default = Library;
