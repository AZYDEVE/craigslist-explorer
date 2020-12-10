import React, { useEffect, useState } from "react";
import "./feed.css";
import { getPosts } from "../../api/posts";
import PostList from "../../components/post-list";
// import Loader from "react-loader-spinner";
// import PageHead from "../../components/page-head";
// import { Link } from "react-router-dom";
import Filter from "../../components/filter";
import Sort from "../../components/sort";
import ReactPaginate from "react-paginate";
import { debounce, throttle } from 'lodash-es';

const Feed = (props) => {
  const [posts, setPosts] = useState([]);
  const [amountOfPosts, setAmountOfPosts] = useState(0);
  // const [searchThreads, setSearchThreads] = useState([]);

  const [dataAvailable, setDataAvailable] = useState(false);
  // const [searchDone, setSearchDone] = useState(false);
  // const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(0);

  const [filter, setFilter] = useState({});
  const [sorting, setSorting] = useState({});

  const requestPosts = () => {
    console.log('request posts');
    getPosts(filter, sorting, currentPage)
      .then((response) => {
        console.log('res', response);
        // get amount of posts
        setAmountOfPosts(response.data.total);

        // Insert users
        setPosts(response.data.posts);

        // Let UI know that the users are available
        setDataAvailable(true);
      })
      .catch((err) => {
        // TODO: Show error message
        console.error("Failed to get all threads", err);
      });
  }

  const updateFilter = (filter) => {
    console.log('updateFilter in feed', filter);
    setFilter(filter);
  }

  const updateSorting = (sorting) => {
    console.log('updateSorting in feed', sorting);
    setSorting(sorting);
  }

  function handlePageClick({ selected: selectedPage }) {
    console.log('page update', selectedPage);
    setCurrentPage(selectedPage);
  }

  useEffect(requestPosts, [filter, sorting, currentPage])

  useEffect(() => {
    setCurrentPage(0);
  }, [filter, sorting])

  const initialLoad = () => {
    requestPosts();
  }
  useEffect(initialLoad, []);

  // const onSearch = (term) => {
  //   setDataAvailable(false);
  //   searchAllThreads(term)
  //     .then((response) => {
  //       // Insert users
  //       setSearchThreads(response.data);

  //       // Let UI know that the users are available
  //       setDataAvailable(true);
  //       setSearchDone(true);

  //       // update the pagination
  //     })
  //     .catch((err) => {
  //       // TODO: Show error message
  //       console.error("Failed to get all threads", err);
  //     });
  // };

  // const resetSearch = () => {
  //   setSearchTerm("");
  //   setSearchThreads([]);
  //   setSearchDone(false);
  // };

  return (
    <div className="feed">
      <Filter updateFilter={updateFilter} />
      <div className='feed-smaller'>
        <Sort updateSorting={updateSorting} />

        <PostList posts={posts} />

        <ReactPaginate
          previousLabel={"← Previous"}
          nextLabel={"Next →"}
          pageCount={Math.ceil(amountOfPosts / (sorting && sorting.amount ? sorting.amount : 10))}
          onPageChange={handlePageClick}
          containerClassName={"pagination"}
          previousLinkClassName={"pagination__link"}
          nextLinkClassName={"pagination__link"}
          disabledClassName={"pagination__link--disabled"}
          activeClassName={"pagination__link--active"}
        />
      </div>


      {/* <div className="container">
        {
          // Show loader until we load the user list
          dataAvailable ? (
            <React.Fragment>
              <ReactPaginate
                previousLabel={"← Previous"}
                nextLabel={"Next →"}
                pageCount={Math.ceil(posts.length / PER_PAGE)}
                onPageChange={handlePageClick}
                containerClassName={"pagination"}
                previousLinkClassName={"pagination__link"}
                nextLinkClassName={"pagination__link"}
                disabledClassName={"pagination__link--disabled"}
                activeClassName={"pagination__link--active"}
              />
              <ThreadList threads={posts} />
              <ReactPaginate
                previousLabel={"← Previous"}
                nextLabel={"Next →"}
                pageCount={Math.ceil(posts.length / PER_PAGE)}
                onPageChange={handlePageClick}
                containerClassName={"pagination"}
                previousLinkClassName={"pagination__link"}
                nextLinkClassName={"pagination__link"}
                disabledClassName={"pagination__link--disabled"}
                activeClassName={"pagination__link--active"}
              />
            </React.Fragment>
          ) : (
              <Loader
                type="Puff"
                color="#4f5d75"
                height={100}
                width={100}
                className="loader"
              />
            )
        }
      </div> */}
    </div>
  );
};

export default Feed;
