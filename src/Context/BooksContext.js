import { createContext, useState } from 'react';
import { booksDB } from '../Data/BooksDB';

export const BooksContext = createContext();

export const BooksProvider = ({ children }) => {
  const [BooksList, setBooksList] = useState(booksDB);
  const statusList = ['Currently Reading', 'Want to Read', 'Read', 'None'];

  const statusChangeHandler = (event, title) => {
    setBooksList((prevState) => {
      return prevState.reduce(
        (allBooks, currentBook) =>
          currentBook.title === title
            ? [
                ...allBooks,
                { ...currentBook, current_state: event.target.value },
              ]
            : [...allBooks, currentBook],
        []
      );
    });
  };

  return (
    <BooksContext.Provider
      value={{ BooksList, statusList, statusChangeHandler }}
    >
      {children}
    </BooksContext.Provider>
  );
};
