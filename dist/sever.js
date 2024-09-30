"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const library_1 = __importDefault(require("./library"));
const app = (0, express_1.default)();
const library = new library_1.default();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.post('/books', (req, res) => {
    const book = library.addBook(req.body);
    res.status(201).json(book);
});
app.put('/books/:id', (req, res) => {
    const updatedBook = library.updateBook(Number(req.params.id), req.body);
    if (updatedBook) {
        res.json(updatedBook);
    }
    else {
        res.status(404).send('Book not found.');
    }
});
app.delete('/books/:id', (req, res) => {
    const success = library.deleteBook(Number(req.params.id));
    if (success) {
        res.status(204).send();
    }
    else {
        res.status(404).send('Book not found.');
    }
});
app.post('/books/search', (req, res) => {
    const results = library.searchBooks(req.body);
    res.json(results);
});
app.get('/books', (req, res) => {
    res.json(library.listBooks());
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
