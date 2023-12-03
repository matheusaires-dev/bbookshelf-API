import mongoose, { Schema, Document } from 'mongoose';

export interface IBook {
  id?: string;
  image: string;
  urlImage: string;
  name: string;
  description: string;
  synopsis: string;
  pdfName: string;
  genre: string;
}

export interface IBookModel extends Document {}

const DataBookSchema = new Schema({
  image: { type: String, required: true },
  urlImage: { type: String, required: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  synopsis: { type: String, required: true },
  pdfName: { type: String, required: true },
  genre: { type: String, required: true },
});

const BookModel = mongoose.model<IBookModel>('books', DataBookSchema);

export default BookModel
