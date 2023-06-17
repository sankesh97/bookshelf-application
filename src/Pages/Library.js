import { useContext, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { BooksContext } from '../Context/BooksContext';

const Library = () => {
  const { BooksList, statusList, statusChangeHandler, setBookShelf } =
    useContext(BooksContext);
  const [searchKeyword, SetSearchKeyword] = useState();

  return (
    <>
      <div className='d-md-flex justify-content-between'>
        <div className='order-md-2 text-center text-md-end'>
          <NavLink style={{ textDecoration: 'none' }} to='/'>
            <button className='btn btn-primary'>Go to Main Page</button>
          </NavLink>
        </div>
        <div className='order-md-1 text-center text-md-start'>
          <h2>Library of Books</h2>
          <div className='mb-3'>
            <label htmlFor='searchBooksInput' className='form-label'>
              Search for the book you are looking with title or author
            </label>
            <input
              type='text'
              className='form-control'
              id='searchBooksInput'
              placeholder='Moby Dick'
              value={searchKeyword}
              onChange={(event) => {
                SetSearchKeyword(event.target.value);
              }}
            />
            <p className='my-2'>
              Note: Please select the state before adding the book to your shelf
              i.e{' '}
            </p>
            <p className='my-2'>
              1. <strong>'Currently Reading'</strong> - If you will be reading
              it now.
              <br />
              2. <strong>'Want to Read'</strong> - If you would like to read it,
              but later.
              <br />
              3. <strong>'Read'</strong> - If you have already read the book,
              and want to keep as a memory that you have read it.
            </p>
          </div>
        </div>
      </div>
      <div className='row g-5 p-5'>
        {BooksList.filter((book) =>
          searchKeyword
            ? book.title.toLowerCase().includes(searchKeyword) ||
              book.author.toLowerCase().includes(searchKeyword)
            : true
        ).map((book) => {
          return (
            <div key={book.title} className='col-md-3 col-sm-6 col-xs-6'>
              <div className='card'>
                <img
                  src={book.image_link}
                  className='card-img-top'
                  style={{ maxWidth: '300px' }}
                  alt={book.title}
                />
                <div className='card-body'>
                  <h5 className='card-title'>{book.title}</h5>
                  <p className='card-text'>{book.author}</p>
                  <select
                    onChange={(event) => {
                      statusChangeHandler(event, book.title);
                    }}
                    className='form-select'
                    defaultValue={book.current_state}
                  >
                    {statusList.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                  <button
                    className='my-2 w-100 btn btn-primary'
                    onClick={() => {
                      setBookShelf((prevState) => [...prevState, book]);
                    }}
                  >
                    Add to Bookshelf
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Library;
