import React from 'react';


const ArticleItem = ({ article }) => {
  // console.log(snippet)
  return (
    <div className="article-page">
      <h4>{article.headline}</h4>
    </div>
  );
};


export default ArticleItem;
