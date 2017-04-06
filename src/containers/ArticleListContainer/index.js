import React, { Component } from 'react';
import { connect } from 'react-redux';
import Loading from 'react-loading';
import Infinite from 'react-infinite';
import { Link } from 'react-router';
import { browserHistory } from 'react-router';
import { fetchList, setIgnoreLastFetch, hideNotification, infiniteLoad, resetList } from '../../actions';
import ArticleLink from '../../components/ArticleLink';


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

  render() {
    if (this.props.hasErrored) {
      return <p>Sorry, we cannot retrieve any articles, please refresh。</p>;
    }
    if (this.props.isLoading) {
      return <Loading type="bars" color="#e3e3e3" />;
    }
    document.title = 'Economist';
    return (
      <div className="main">
        <Infinite
          elementHeight={50}
          useWindowAsScrollContainer
          infiniteLoadBeginEdgeOffset={200}
          onInfiniteLoad={() =>{ this.handleInfiniteLoad(this.props.nextHref) }}
          loadingSpinnerDelegate={this.props.isInfiniteLoading && this.elementInfiniteLoad()}
          isInfiniteLoading={this.props.isInfiniteLoading}
          timeScrollStateLastsForAfterUserScrolls={1000}

        >
          <ul className="list-group">
            {this.props.articles.map(article =>
              <ArticleLink
                key={article.id}
                {...article}
                onClick={(id) => { browserHistory.push(`article/${article.id}`); }}
              />,
            )}
          </ul>
        </Infinite>
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

