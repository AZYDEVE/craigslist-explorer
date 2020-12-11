import React, { useState, useEffect } from "react";
import "./post.css";
import "swiper/swiper-bundle.min.css"
import { withRouter, Redirect } from "react-router-dom";
import { getPost } from "../../api/posts";
import Loader from "react-loader-spinner";
import ReactHtmlParser from 'react-html-parser';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, A11y, Pagination } from 'swiper';
import {
  convertDate
} from "../../services/helper";
import {
  getImageUrl,
  imageSize
} from "../../services/imageService";


SwiperCore.use([Navigation, A11y, Pagination]);

const PostPage = (props) => {
  // declare states
  const [id, setId] = useState(undefined);
  const [redirectToHome, setRedirectToHome] = useState(false);
  const [postLoaded, setPostLoaded] = useState(false);
  const [post, setPost] = useState(null);
  const [posts, setPosts] = useState([]);
  const [visiblePosts, setVisiblePosts] = useState([]);

  // Get Post here
  const initialSetup = () => {
    // Get post
    if (
      props.location &&
      props.location.state &&
      props.location.state.post
    ) {
      console.log('post already loaded', props.location.state.post);
      setPost(props.location.state.post);
      setPostLoaded(true);
    }

    // Get post id
    if (
      props.location &&
      props.location.state &&
      props.location.state.postId
    ) {
      setId(props.location.state.postId);
    } else if (props.match && props.match.params && props.match.params.postId) {
      setId(props.match.params.postId);
    } else {
      setRedirectToHome(true);
    }
  };

  const getCurrentPost = () => {
    if (!post && id) {
      console.log('loading post', id);
      getPost(id)
        .then((response) => {
          if (response.status === 200) {
            if (
              response.data
            ) {
              setPost(response.data);
              setPostLoaded(true);
            }
          } else if (response.status === 202) {
            console.error("error", response.data);
          }
        })
        .catch((error) => {
          console.error(error);
        })
    }
  };

  useEffect(initialSetup, [props.location, props.match]);
  useEffect(getCurrentPost, [id, post]);

  if (redirectToHome === true) {
    return <Redirect to="/" />;
  }

  const getBody = () => {
    return post.body.replace(/(?:\r\n|\r|\n)/g, '<br>');
  }

  return (
    <div className="post">
      {
        // Show loader until we load the user list
        postLoaded ? (
          // posts here
          <React.Fragment>
            <h1>{post.title}</h1>
            <div className='content'>
              <div className='left'>
                <div className='gallery'>
                  <Swiper
                    navigation
                    spaceBetween={0}
                    slidesPerView={1}
                    onSlideChange={() => console.log('slide change')}
                    onSwiper={(swiper) => swiper.update()}
                  >
                    {
                      post.images.map((image, index) => {
                        return <SwiperSlide style={{ backgroundImage: `url(${getImageUrl(image, imageSize.LARGE)})` }}> </SwiperSlide>
                      })
                    }
                  </Swiper>
                </div>
                <div className="body">{ReactHtmlParser(getBody())}</div>
              </div>
              <div className='right'>
                <div className="map">
                  <span>Map in Here</span>
                </div>

                <div className='data'>
                  <div>
                    <span>Post date: </span>  {convertDate(post.date)}
                  </div>
                  <div className="divider"></div>
                  <div>
                    <span>Bedrooms: </span>  {post.bedrooms} BR
                  </div>
                  <div className="divider"></div>
                  <div>
                    <span>Area: </span>  {post.area} ft²
                  </div>
                  <div className="divider"></div>
                  <div>
                    <span>City: </span>  {post.neighborhood.join(" ")}
                  </div>
                </div>
              </div>
            </div>
          </React.Fragment>

        ) : (
            <Loader
              type="Puff"
              color="#4f5d75;"
              height={100}
              width={100}
              className="loader"
            />
          )
      }
    </div >
  );
};

export default withRouter(PostPage);
