import React from 'react';
import TimeAgo from 'react-timeago';

const ArticleLink = ({ id, headline, owner, create_date, onClick }) => {
  return (
    <li className="list-group-item" onClick={onClick}>
      {headline}
    </li>
  );
};


export default ArticleLink;
