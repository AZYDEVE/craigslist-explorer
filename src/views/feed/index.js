import React, { useCallback, useEffect, useState } from "react";
import "./feed.css";
import { getPosts } from "../../api/posts";
import PostList from "../../components/post-list";
import Loader from "react-loader-spinner";
import Filter from "../../components/filter";
import Sort from "../../components/sort";
import ReactPaginate from "react-paginate";

const Feed = (props) => {
  const [posts, setPosts] = useState([]);
  const [amountOfPosts, setAmountOfPosts] = useState(0);
  const [dataAvailable, setDataAvailable] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [filter, setFilter] = useState({});
  const [sorting, setSorting] = useState({});

  const requestPosts = useCallback(() => {
    // Show spinner
    setDataAvailable(false);

    getPosts(
      filter,
      sorting,
      currentPage,
      props.neighborhood ? props.neighborhood : ""
    )
      .then((response) => {
        // get amount of posts
        if (response.data.total) {
          setAmountOfPosts(response.data.total);
        } else {
          setAmountOfPosts(0);
        }

        // Insert posts
        if (response.data.posts) {
          setPosts(response.data.posts);
        } else {
          setPosts([]);
        }

        // Let UI know that the users are available
        setDataAvailable(true);
      })
      .catch((err) => {
        console.error("Failed to get all threads", err);
      });
  }, [currentPage, filter, sorting, props.neighborhood]);

  const handlePageClick = ({ selected: selectedPage }) =>
    setCurrentPage(selectedPage);

  const initialLoad = () => {
    requestPosts();
    if (props.postLoaded) props.postLoaded(null);
  };

  useEffect(() => {
    setCurrentPage(0);
  }, [filter, sorting]);
  useEffect(requestPosts, [filter, sorting, currentPage, requestPosts]);
  useEffect(initialLoad, [props, requestPosts]);

  return (
    <div className="feed">
      <Filter updateFilter={setFilter} />
      <div className="feed-smaller">
        <Sort updateSorting={setSorting} />
        {dataAvailable ? (
          <PostList posts={posts} />
        ) : (
          <Loader
            type="Puff"
            color="#005edc"
            height={100}
            width={100}
            className="loader"
          />
        )}
      </div>
      <ReactPaginate
        previousLabel={"← Previous"}
        nextLabel={"Next →"}
        pageCount={Math.ceil(
          amountOfPosts / (sorting && sorting.amount ? sorting.amount : 10)
        )}
        onPageChange={handlePageClick}
        containerClassName={"pagination"}
        previousLinkClassName={"pagination__link"}
        nextLinkClassName={"pagination__link"}
        disabledClassName={"pagination__link--disabled"}
        activeClassName={"pagination__link--active"}
      />
    </div>
  );
};

export default Feed;
