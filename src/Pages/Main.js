import { NavLink } from 'react-router-dom';
import { BooksContext } from '../Context/BooksContext';
import { useContext } from 'react';

const Main = () => {
  const { statusList, statusChangeHandler, bookShelf } =
    useContext(BooksContext);
  return (
    <>
      <div className='d-md-flex justify-content-between'>
        <div className='order-md-2 text-center text-md-end'>
          <NavLink style={{ textDecoration: 'none' }} to='/search'>
            <button className='btn btn-primary'>
              Go to Search / Library Page
            </button>
          </NavLink>
        </div>
        <div className='order-md-1 text-center text-md-start'>
          <h2>Arrange your Books Accordingly</h2>
        </div>
      </div>

      {statusList
        .filter((filterOpt) => filterOpt !== 'None')
        .map((categorySection) => {
          return (
            <div className='row g-5 p-5'>
              <h3>{categorySection}</h3>
              {bookShelf.length ? (
                bookShelf
                  .filter((book) => book.current_state === categorySection)
                  .map((book) => {
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
                              defaultValue={book.current_state}
                              className='form-select'
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
                  })
              ) : (
                <p>
                  No Books Here, Please go to Library and add to your bookshelf
                </p>
              )}
              <hr />
            </div>
          );
        })}
    </>
  );
};

export default Main;
