"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const library_1 = __importDefault(require("./library"));
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
const library = new library_1.default();
const PORT = process.env.PORT || 3000;
app.use(express_1.default.json());
app.use(express_1.default.static(path_1.default.join(__dirname, '../public')));
// เส้นทางสำหรับเพิ่มหนังสือ
app.post('/books', (req, res) => {
    const bookData = req.body;
    const addedBook = library.addBook(bookData);
    res.json(addedBook);
});
// เส้นทางสำหรับอัปเดตหนังสือ
app.put('/books/:id', (req, res) => {
    const bookId = parseInt(req.params.id);
    const updatedData = req.body;
    const updatedBook = library.updateBook(bookId, updatedData);
    res.json(updatedBook);
});
// เส้นทางสำหรับลบหนังสือ
app.delete('/books/:id', (req, res) => {
    const bookId = parseInt(req.params.id);
    const success = library.deleteBook(bookId);
    if (success) {
        res.status(204).send();
    }
    else {
        res.status(404).json({ message: 'Book not found.' });
    }
});
// เส้นทางสำหรับค้นหาหนังสือ
app.post('/books/search', (req, res) => {
    const searchParams = req.body;
    const results = library.searchBooks(searchParams);
    res.json(results);
});
// เส้นทางสำหรับดึงข้อมูลหนังสือทั้งหมด
app.get('/books', (req, res) => {
    res.json(library.listBooks());
});
// เส้นทางสำหรับบันทึกข้อมูลหนังสือ
app.post('/save', (req, res) => {
    const { filename } = req.body;
    library.saveToFile(filename);
    res.json({ message: `Inventory saved to ${filename}` });
});
// เส้นทางสำหรับโหลดข้อมูลหนังสือ
app.post('/load', (req, res) => {
    const { filename } = req.body;
    library.loadFromFile(filename);
    res.json({ message: `Inventory loaded from ${filename}` });
});
// เริ่มเซิร์ฟเวอร์
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
// // src/server.ts
// import express from 'express';
// import Library from './library';
// import { Request, Response } from 'express'; // นำเข้า Request และ Response
// const app = express();
// const library = new Library();
// const PORT = process.env.PORT || 3000;
// app.use(express.json());
// // เพิ่มประเภทให้กับพารามิเตอร์ req และ res
// app.post('/books', (req: Request, res: Response) => {
//     // รหัสของคุณที่เพิ่มหนังสือ
// });
// app.put('/books/:id', (req: Request, res: Response) => {
//     // รหัสของคุณที่อัปเดตหนังสือ
// });
// app.delete('/books/:id', (req: Request, res: Response) => {
//     // รหัสของคุณที่ลบหนังสือ
// });
// app.post('/books/search', (req: Request, res: Response) => {
//     // รหัสของคุณที่ค้นหาหนังสือ
// });
// app.get('/books', (req: Request, res: Response) => {
//     res.json(library.listBooks());
// });
// app.listen(PORT, () => {
//     console.log(`Server is running on http://localhost:${PORT}`);
// });
