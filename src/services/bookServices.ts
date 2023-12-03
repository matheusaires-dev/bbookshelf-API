import DataBookModel, { IBook, IBookModel } from "../models/Book";

const createDataBook = async (data: IBook): Promise<IBookModel> => {
    try {
        const newDataBook = new DataBookModel(data);
        return await newDataBook.save();
    } catch (error: any) {
        throw new Error(`Erro ao criar livro: ${error.message}`);
    }
};


const getAllDataBooks = async (): Promise<IBookModel[]> => {
    try {
        return await DataBookModel.find().exec();
    } catch (error: any) {
        throw new Error(`Erro ao obter todos os livros: ${error.message}`);
    }
};

const getDataBookById = async (id: string): Promise<IBookModel | null> => {
    try {
        return await DataBookModel.findById(id).exec();
    } catch (error: any) {
        throw new Error(`Erro ao obter livro por ID: ${error.message}`);
    }
};


const updateDataBookById = async (
    id: string,
    data: Partial<IBook>
): Promise<IBookModel | null> => {
    try {
        return await DataBookModel.findByIdAndUpdate(id, data, { new: true }).exec();
    } catch (error: any) {
        throw new Error(`Erro ao atualizar livro por ID: ${error.message}`);
    }
};

const deleteDataBookById = async (id: string): Promise<void> => {
    try {
        await DataBookModel.findByIdAndDelete(id).exec();
    } catch (error: any) {
        throw new Error(`Erro ao excluir livro por ID: ${error.message}`);
    }
};

export {
    createDataBook,
    getAllDataBooks,
    getDataBookById,
    updateDataBookById,
    deleteDataBookById,
};