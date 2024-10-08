'use client';

import React, { useEffect, useState } from 'react';
import { viewAuthorDetails } from '@/api/mergedData';
import PropTypes from 'prop-types';
import { getAuthorBooks } from '@/api/authorData';
import BookCard from '@/components/BookCard';

export default function ViewAuthor({ params }) {
  const [authorDetails, setAuthorDetails] = useState({});
  const [books, setBooks] = useState([]);
  // grab firebaseKey from url
  const { firebaseKey } = params;

  // make call to API layer to get the data
  useEffect(() => {
    viewAuthorDetails(firebaseKey).then(setAuthorDetails);
    // console.log(viewAuthorDetails(firebaseKey));
    getAuthorBooks(firebaseKey).then(setBooks);
    // console.log(getAuthorBooks(firebaseKey));
    console.log(getAuthorBooks(firebaseKey));
  }, [firebaseKey]);

  const showAuthorDetails = () => {
    getAuthorBooks(firebaseKey).then(setBooks);
    console.log(getAuthorBooks(firebaseKey));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  };

  return (
    <div className="mt-5 d-flex flex-wrap">
      <div className="text-white ms-5 details">
        <h5>
          {authorDetails.first_name} {authorDetails.last_name}
          {authorDetails.favorite ? ' 🤍' : ''}
        </h5>
        Author Email: <a href={`mailto:${authorDetails.email}`}>{authorDetails.email}</a>
        <hr />
        <div className="d-flex flex-wrap">{books && Object.keys(books).length > 0 ? Object.values(books).map((book) => <BookCard key={book.firebaseKey} bookObj={book} onUpdate={showAuthorDetails} />) : <p>No books available for this author.</p>}</div>
      </div>
    </div>
  );
}

ViewAuthor.propTypes = {
  params: PropTypes.objectOf({}).isRequired,
};
