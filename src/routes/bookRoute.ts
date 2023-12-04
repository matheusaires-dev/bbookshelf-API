import express from 'express';
import * as BookController from '../controllers/bookController';

const router = express.Router();

// Definir rotas para operações relacionadas a livros
router.get('/books', BookController.getAllBooks);
router.get('/books/:bookId', BookController.getBookById);
router.post('/books', BookController.createBook);
router.put('/books/:bookId', BookController.updateBookById);
router.delete('/books/:bookId', BookController.deleteBookById); 

export default router;
