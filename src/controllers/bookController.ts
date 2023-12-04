import { Request, Response } from 'express';
import * as BookServices from '../services/bookServices';

// Controller para manipular operações relacionadas a livros
const getAllBooks = async (req: Request, res: Response): Promise<void> => {
    try {
        const ids = req.query.ids? String(req.query.ids).split(',') : undefined;
        const books = await BookServices.getAllBooks({ids});
        res.status(200).json(books);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

const getBookById = async (req: Request, res: Response): Promise<void> => {
    const { bookId } = req.params;
    try {
        const book = await BookServices.getBookById(bookId);
        if (book) {
            res.status(200).json(book);
        } else {
            res.status(404).json({ error: 'Livro não encontrado' });
        }
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

const createBook = async (req: Request, res: Response): Promise<void> => {
    const bookData = req.body;
    try {
        const newBook = await BookServices.createBook(bookData);
        res.status(201).json(newBook);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

const updateBookById = async (req: Request, res: Response): Promise<void> => {
    const { bookId } = req.params;
    const bookData = req.body;
    try {
        const updatedBook = await BookServices.updateBookById(bookId, bookData);
        if (updatedBook) {
            res.status(200).json(updatedBook);
        } else {
            res.status(404).json({ error: 'Livro não encontrado' });
        }
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

const deleteBookById = async (req: Request, res: Response): Promise<void> => {
    const { bookId } = req.params;
    try {
        await BookServices.deleteBookById(bookId);
        res.status(204).send();
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export { getAllBooks, getBookById, createBook, updateBookById, deleteBookById };
