import React, { Component } from 'react';
import { connect } from 'react-redux';
import Loading from 'react-loading';
import { fetchItem } from '../../actions';
import { browserHistory } from 'react-router';
import ArticleItem from '../../components/ArticleItem';

class ArticleItemContainer extends Component {
  componentDidMount() {
    this.props.fetchItem(this.props.params.articleId);
  }

  componentDidUpdate(prevProps) {
    const oldId = prevProps.params.articleId;
    const newId = this.props.params.articleId;
    if (newId !== oldId) {
      this.props.fetchNewsItem(newId);
    }
  }

  render() {
    const article = this.props.article;
    if (this.props.hasErrored) {
      return <p>抱歉，请刷新浏览器后再试试。</p>;
    }
    if (this.props.isLoading) {
      return <Loading type="bars" color="#e3e3e3" />;
    }
    document.title = this.props.article.title;
    return (
      <div>
        <ArticleItem article={article} />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { isLoading, article, hasErrored, highlightCode } = state.article;
  const { authenticated, user } = state.auth;
  // console.log(article)
  return {
    isLoading,
    article,
    highlightCode,
    hasErrored,
    authenticated,
    user,
  };
};

export default connect(mapStateToProps, { fetchItem })(ArticleItemContainer);

