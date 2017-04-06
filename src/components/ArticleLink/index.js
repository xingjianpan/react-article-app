import React from 'react';
import TimeAgo from 'react-timeago'

const ArticleLink = ({ id, headline, owner, create_date, onClick }) => {
  return (
    <div className="snippet-link">
      <div className="card">
        <div className="card-block">
          <h4 className="code-title" onClick={onClick}>{headline}</h4>
          <div className="code-owner">{id}</div>
          <div className="code-createtime"><TimeAgo date={create_date} /> by {owner}</div>
        </div>
      </div>
    </div>
  );
};


export default ArticleLink;
