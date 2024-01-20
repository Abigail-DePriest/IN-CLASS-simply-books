// import { useRouter } from 'next/router';

// inside component use
// const router = useRouter();
// const { firebaseKey } = router.query;

// eslint-disable @next/next/no-img-element
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { viewAuthorDetails } from '../../api/mergedData';
import BookCard from '../../components/BookCard';

export default function ViewAuthor() {
  const [authorDetails, setAuthorDetails] = useState({});
  const router = useRouter();

  // TODO: grab firebaseKey from url
  const { firebaseKey } = router.query;

  const getTheAuthorDetails = () => {
    viewAuthorDetails.apply(firebaseKey).then(setAuthorDetails);
  };

  // TODO: make call to API layer to get the data
  useEffect(() => {
    viewAuthorDetails(firebaseKey).then(setAuthorDetails);
  }, [firebaseKey]);

  console.warn(authorDetails);
  return (
    <div className="mt-5 d-flex flex-wrap">
      <div className="d-flex flex-column">
        <img src={authorDetails.image} alt={authorDetails.first_name} style={{ width: '300px' }} />
      </div>
      <div className="text-white ms-5 details">
        <h5>
          {authorDetails.first_name} {authorDetails.last_name}
          {authorDetails.authorObject?.favorite ? ' 🤍' : ''}
        </h5>
        Author Email: <a href={`mailto:${authorDetails.email}`}>{authorDetails.email}</a>
        <hr />
        <div className="d-flex flex-wrap">
          {/* TODO: map over books here using BookCard component */}
          {authorDetails.books?.map((book) => (
            <BookCard key={book.firebaseKey} bookObj={book} onUpdate={getTheAuthorDetails} />
          ))}
        </div>

      </div>

    </div>
  );
}
