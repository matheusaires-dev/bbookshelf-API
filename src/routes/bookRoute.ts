import express from 'express';
import bookController from '../controllers/bookController';
import authMiddleware from '../middlewares/authMiddleware';

const router = express.Router();

// Definir rotas para operações relacionadas a livros
router.get('/books', authMiddleware.authenticate, bookController.getAllBooks);
router.get('/books/:bookId', authMiddleware.authenticate, bookController.getBookById);
router.post('/books', authMiddleware.authenticate, authMiddleware.checkUserRole('mod'), bookController.createBook);
router.put('/books/:bookId', authMiddleware.authenticate, authMiddleware.checkUserRole('mod'), bookController.updateBookById);
router.delete('/books/:bookId', authMiddleware.authenticate, authMiddleware.checkUserRole('mod'), bookController.deleteBookById);

export default router;
