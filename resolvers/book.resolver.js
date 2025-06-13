import Book from "../models/book.model.js";

export const bookResolvers = {
  Query: {
    getBooks: async () => {
      try {
        const books = await Book.find();
        return books;
      } catch (error) {
        throw new Error("Error fetching books: " + error.message);
      }
    },
    getBook: async (_, { id }) => {
      try {
        const book = await Book.findById(id);
        if (!book) {
          throw new Error("Book not found");
        }
        return book;
      } catch (error) {
        throw new Error("Error fetching book: " + error.message);
      }
    },
    availableBooks: async () => {
      try {
        const books = await Book.find({ availableCopies: { $gt: 0 } });
        return books;
      } catch (error) {
        throw new Error("Error fetching available books: " + error.message);
      }
    },
  },
  Mutation: {
    addBook: async (_, { title, author, isbn, availableCopies, category }) => {
      try {
        const book = new Book({
          title,
          author,
          isbn,
          availableCopies,
          category,
        });
        const savedBook = await book.save();
        return savedBook;
      } catch (error) {
        throw new Error("Error adding book: " + error.message);
      }
    },
    updateBook: async (_, { id, input }) => {
      try {
        const updatedBook = await Book.findByIdAndUpdate(id, input, {
          new: true,
        });
        if (!updatedBook) {
          throw new Error("Book not found");
        }
        return updatedBook;
      } catch (error) {
        throw new Error("Error updating book: " + error.message);
      }
    },
  },
};
