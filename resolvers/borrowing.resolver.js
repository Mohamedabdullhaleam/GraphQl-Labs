import Borrowing from "../models/borrowing.model.js";
import Book from "../models/book.model.js";
import Member from "../models/member.model.js";

export const borrowingResolvers = {
  Query: {
    getBorrowings: async () => {
      try {
        const borrowings = await Borrowing.find()
          .populate("book")
          .populate("member");
        return borrowings;
      } catch (error) {
        throw new Error("Error fetching borrowings: " + error.message);
      }
    },
    getBorrowing: async (_, { id }) => {
      try {
        const borrowing = await Borrowing.findById(id)
          .populate("book")
          .populate("member");
        if (!borrowing) {
          throw new Error("Borrowing not found");
        }
        return borrowing;
      } catch (error) {
        throw new Error("Error fetching borrowing: " + error.message);
      }
    },
  },
  Mutation: {
    borrowBook: async (_, { bookId }, { req }) => {
      try {
        if (!req.user) {
          throw new Error("Not authenticated");
        }

        const memberId = req.user.memberId;
        const book = await Book.findById(bookId);
        if (!book) {
          throw new Error("Book not found");
        }
        if (book.availableCopies <= 0) {
          throw new Error("No copies available for this book");
        }
        const existingBorrowing = await Borrowing.findOne({
          book: bookId,
          member: memberId,
          returnDate: null,
        });
        if (existingBorrowing) {
          throw new Error("You have already borrowed this book");
        }

        const borrowing = new Borrowing({
          book: bookId,
          member: memberId,
          borrowDate: new Date(),
        });

        book.availableCopies -= 1;
        await book.save();

        const savedBorrowing = await borrowing.save();

        await savedBorrowing.populate("book");
        await savedBorrowing.populate("member");

        return savedBorrowing;
      } catch (error) {
        throw new Error("Error borrowing book: " + error.message);
      }
    },

    returnBook: async (_, { borrowingId }, { req }) => {
      try {
        // Check if user is authenticated
        if (!req.user) {
          throw new Error("Not authenticated");
        }

        const memberId = req.user.memberId;

        // Find the borrowing
        const borrowing = await Borrowing.findById(borrowingId)
          .populate("book")
          .populate("member");

        if (!borrowing) {
          throw new Error("Borrowing not found");
        }

        // Check if the borrowing belongs to the current member
        if (borrowing.member._id.toString() !== memberId) {
          throw new Error("This borrowing does not belong to you");
        }

        // Check if the book is already returned
        if (borrowing.returnDate) {
          throw new Error("This book has already been returned");
        }

        // Update borrowing
        borrowing.returnDate = new Date();
        await borrowing.save();

        // Increase available copies
        const book = borrowing.book;
        book.availableCopies += 1;
        await book.save();

        return borrowing;
      } catch (error) {
        throw new Error("Error returning book: " + error.message);
      }
    },
  },
};
