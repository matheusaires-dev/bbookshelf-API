import BookModel, { IBook, IBookModel } from "../models/Book";

const createBook = async (data: IBook): Promise<IBookModel> => {
    try {
        const newDataBook = new BookModel(data);
        return await newDataBook.save();
    } catch (error: any) {
        throw new Error(`Erro ao criar livro: ${error.message}`);
    }
};


const getAllBooks = async (params: { ids?: string[] }): Promise<IBookModel[]> => {
    try {
        // Se a propriedade 'ids' estiver presente nos parâmetros, filtre os livros por esses IDs
        if (params.ids && params.ids.length > 0) {
            return await BookModel.find({ _id: { $in: params.ids } }).exec();
        } else {
            // Caso contrário, retorne todos os livros
            return await BookModel.find().exec();
        }
    } catch (error: any) {
        throw new Error(`Erro ao obter os livros: ${error.message}`);
    }
};


const getBookById = async (id: string): Promise<IBookModel | null> => {
    try {
        return await BookModel.findById(id).exec();
    } catch (error: any) {
        throw new Error(`Erro ao obter livro por ID: ${error.message}`);
    }
};


const updateBookById = async (
    id: string,
    data: Partial<IBook>
): Promise<IBookModel | null> => {
    try {
        return await BookModel.findByIdAndUpdate(id, data, { new: true }).exec();
    } catch (error: any) {
        throw new Error(`Erro ao atualizar livro por ID: ${error.message}`);
    }
};

const deleteBookById = async (id: string): Promise<void> => {
    try {
        await BookModel.findByIdAndDelete(id).exec();
    } catch (error: any) {
        throw new Error(`Erro ao excluir livro por ID: ${error.message}`);
    }
};

export {
    createBook,
    getAllBooks,
    getBookById,
    updateBookById,
    deleteBookById,
};