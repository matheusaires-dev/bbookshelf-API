import { Request, Response } from 'express';
import * as BookServices from '../services/bookServices';
import apiResponse from '../helpers/apiResponse';

const booksController = {
    getAllBooks: async (req: Request, res: Response): Promise<void> => {
        const ids = req.query.ids ? String(req.query.ids).split(',') : undefined;
        const books = await BookServices.getAllBooks({ ids });
        res.status(200).json(apiResponse.success(books));
    },

    getBookById: async (req: Request, res: Response): Promise<void> => {
        const { bookId } = req.params;
        const book = await BookServices.getBookById(bookId);
        if (book) {
            res.status(200).json(apiResponse.success(book));
        } else {
            res.status(404).json(apiResponse.fail('Livro não encontrado'));
        }
    },

    createBook: async (req: Request, res: Response): Promise<void> => {
        const bookData = req.body;
        const newBook = await BookServices.createBook(bookData);
        res.status(201).json(apiResponse.success(newBook));
    },

    updateBookById: async (req: Request, res: Response): Promise<void> => {
        const { bookId } = req.params;
        const bookData = req.body;
        const updatedBook = await BookServices.updateBookById(bookId, bookData);
        if (updatedBook) {
            res.status(200).json(apiResponse.success(updatedBook));
        } else {
            res.status(404).json(apiResponse.fail('Livro não encontrado'));
        }
    },

    deleteBookById: async (req: Request, res: Response): Promise<void> => {
        const { bookId } = req.params;
        await BookServices.deleteBookById(bookId);
        res.status(204).end();
    },
};

export default booksController;
