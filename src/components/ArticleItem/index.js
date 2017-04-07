import React from 'react';

const ArticleItem = ({ article }) => {
  return (
    <div className="article-page">
      <p className="flytitle">{article.fly_title}</p>
      <h4 className="headline"><a href={article.source_url}>{article.headline}</a></h4>
      <p className="alternativename">{article.alternativename}</p>
      <p className="pubdate">{article.pub_date.substring(0, 10)}</p>
      <p className="category">{article.category}</p>
      <div dangerouslySetInnerHTML={{ __html: article.content_dirty }} />
    </div>
  );
};


export default ArticleItem;
