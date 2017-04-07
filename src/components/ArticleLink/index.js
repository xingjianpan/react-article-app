import React from 'react';
import TimeAgo from 'react-timeago';

const ArticleLink = ({ id, headline, category, owner, create_date, onClick }) => {
  return (
    <li className="list-group-item">
      <span className="home-headline" ><a href="#" onClick={onClick}>{headline}</a></span>
      {' '}
      <span className="home-category">{category}</span>
    </li>
  );
};


export default ArticleLink;
