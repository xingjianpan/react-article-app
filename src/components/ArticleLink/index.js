import React from 'react';
import TimeAgo from 'react-timeago';

const ArticleLink = ({ headline, category, pub_date, onClick }) => {
  return (
    <li className="list-group-item">
      <span className="home-category">{category}</span>
      {' '}
      <span className="home-headline" ><a href="#" onClick={onClick}>{headline}</a></span>
      {' '}
      <TimeAgo className="home-pubdate" date={pub_date} />
    </li>
  );
};


export default ArticleLink;
