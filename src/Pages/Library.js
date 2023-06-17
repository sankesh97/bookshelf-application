import { useContext, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { BooksContext } from '../Context/BooksContext';

const Library = () => {
  const { BooksList, statusList, statusChangeHandler } =
    useContext(BooksContext);
  const [searchKeyword, SetSearchKeyword] = useState();

  return (
    <>
      <div className='d-md-flex justify-content-between'>
        <div className='order-md-2 text-center text-md-end'>
          <NavLink style={{ textDecoration: 'none' }} to='/'>
            <button className='btn btn-primary'>Go Back to Main Page</button>
          </NavLink>
        </div>
        <div className='order-md-1 text-center text-md-start'>
          <h2>Library of Books</h2>
          <div className='mb-3'>
            <label htmlFor='searchBooksInput' className='form-label'>
              Search for the book you are looking for
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
          </div>
        </div>
      </div>
      <div className='row g-5 p-5'>
        {BooksList.filter((book) =>
          searchKeyword
            ? book.title.toLowerCase().includes(searchKeyword)
            : true
        ).map((book) => {
          return (
            <div key={book.title} className='col-md-3 col-sm-6'>
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
