import React, { Component } from 'react';
import { connect } from 'react-redux';
import Loading from 'react-loading';
import Infinite from 'react-infinite';
import { Link } from 'react-router';
import { browserHistory } from 'react-router';
import { fetchList, setIgnoreLastFetch, hideNotification, infiniteLoad, resetList } from '../../actions';
import ArticleLink from '../../components/ArticleLink';
// icons
import ArrowRight from 'react-icons/lib/fa/angle-double-right';
import ArrowLeft from 'react-icons/lib/fa/angle-double-left';

class SnippetListContainer extends Component {
  componentDidMount() {
    if (!this.props.ignoreLastFetch) {
      this.props.fetchList(this.props.targetUrl);
    }
  }

  componentWillReceiveProps(nextProps) {
    // console.log('start---------------------');
    // console.log('nextProps:', nextProps);
    // console.log('thisProps:', this.props);
    // console.log('end---------------------');
  }


  componentDidUpdate(prevProps) {
    const oldUrl = prevProps.targetUrl;
    const newUrl = this.props.targetUrl;

    if (oldUrl !== newUrl) {
      // console.log('will update');
      this.props.resetList();
      this.props.fetchList(this.props.targetUrl);
    }
  }

  componentWillUnmount() {
    // console.log('will unmount');
    this.props.resetList();
  }

  handleInfiniteLoad(url) {
    if (this.props.hasMoreToLoad) {
      this.props.infiniteLoad(url);
    }
  }

  elementInfiniteLoad() {
    return <div className="infinite-list-item"> Loading... </div>;
  }

  renderEndOfList() {
    if (!this.props.hasMoreToLoad) {
      return <div> End of list </div>;
    }
    if (this.props.infiniteLoadHasError) {
      return <div> Error loading more items</div>;
    }
    return ;
  }

  fetchMore(url) {
    this.props.fetchList(url);
  }

  renderButton() {
    if (this.props.nextHref && this.props.prevHref) {
      return (
        <div>
          <span>
            <a href="#" onClick={() => { this.fetchMore(this.props.prevHref); }}>
              <ArrowLeft />
            </a>
          </span>
          <span className="page-control">
            <a href="#" onClick={() => { this.fetchMore(this.props.nextHref); }}>
              <ArrowRight />
            </a>
          </span>
        </div>
      );
    } else if (this.props.nextHref) {
      return <a href="#" onClick={() => { this.fetchMore(this.props.nextHref); }}><ArrowRight /></a>
    }
    return <p>没有新闻了。</p>;
  }

  render() {
    if (this.props.hasErrored) {
      return <p>Sorry, we cannot retrieve any articles, please refresh。</p>;
    }
    if (this.props.isLoading) {
      return <Loading type="bars" color="#e3e3e3" />;
    }
    document.title = 'Economist';
    return (
      <div className="article-list">

          <ul className="list-group">
            {this.props.articles.map(article =>
              <ArticleLink
                key={article.id}
                {...article}
                onClick={(id) => { browserHistory.push(`article/${article.id}`); }}
              />,
            )}
          </ul>
        <div>
          {this.renderButton()}
          <p />
        </div>
        { this.renderEndOfList()}
      </div>
    );
  }
}

const mapStateToPros = (state) => {
  const { articles, isLoading, hasErrored,
          nextHref, prevHref,
          isInfiniteLoading, hasMoreToLoad,
        } = state.articleList;
  const { isActive, message, action } = state.notifications;

  return {
    isLoading,
    articles,
    hasErrored,
    nextHref,
    prevHref,
    isActive,
    message,
    action,
    isInfiniteLoading,
    hasMoreToLoad,
  };
};

export default connect(mapStateToPros,
  { fetchList, setIgnoreLastFetch, hideNotification, infiniteLoad, resetList })(SnippetListContainer);

