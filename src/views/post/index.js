import React, { useState, useEffect } from "react";
import { withRouter, Redirect, Link } from "react-router-dom";
import Loader from "react-loader-spinner";
import ReactHtmlParser from 'react-html-parser';
import SwiperCore, { Navigation, A11y, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

// services and api's
import { getPost, getAnnotations } from "../../api/posts";
import { getLocation } from "../../api/location";
import { convertDate } from "../../services/helper";
import { getImageUrl, imageSize } from "../../services/imageService";

// components
import AddAnnotation from '../../components/new-annotation'
import AnnotationList from '../../components/annotation-list'
import Map from '../../components/map';

// css
import "./post.css";
import "swiper/swiper-bundle.min.css"

SwiperCore.use([Navigation, A11y, Pagination]);

const PostPage = (props) => {

  const [id, setId] = useState(undefined);
  const [redirectToHome, setRedirectToHome] = useState(false);
  const [postLoaded, setPostLoaded] = useState(false);
  const [post, setPost] = useState(null);
  const [annotations, setAnnotations] = useState([]);
  const [center, setCenter] = useState(null);


  useEffect(() => {
    if (props.postLoaded) (
      props.postLoaded(post)
    )
  }, [post, props]);

  // Get Post here
  const initialSetup = () => {

    // Get post from feed page
    if (
      props.location &&
      props.location.state &&
      props.location.state.post
    ) {
      setPost(props.location.state.post);
      setPostLoaded(true);
    }

    if (
      props.location &&
      props.location.state &&
      props.location.state.postId
    ) {
      setId(props.location.state.postId);
    } else if (props.match && props.match.params && props.match.params.postId) {  // Get post id from querystring
      setId(props.match.params.postId);
    } else {
      setRedirectToHome(true);
    }
  };

  // When loading from querystring and not a link from the feed page
  // do a API call to get the post
  const getCurrentPost = () => {
    if (!post && id) {
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

  // Load the annotation of the post
  const loadAnnotations = () => {
    if (id) {
      getAnnotations(id)
        .then((response) => {
          if (response.status === 200) {
            if (
              response.data
            ) {
              setAnnotations(response.data);
            }
          } else if (response.status === 202) {
            console.error("error", response.data);
          }
        })
        .catch((error) => {
          console.error(error);
        })
    }
  }

  useEffect(initialSetup, [props.location, props.match]);
  useEffect(getCurrentPost, [id, post]);
  useEffect(loadAnnotations, [props.user, id]);

  // Get the location of the post
  // try to get location based on address
  // if no address use the neighborhood
  useEffect(() => {
    if (post) {
      let requestParam = post.address;
      if (requestParam === "") {
        requestParam = post.neighborhood.join(" ");
      }
      getLocation(requestParam)
        .then((response) => {
          if (response.data.results && response.data.results.length && response.data.results.length > 0) {
            if (response.data.results[0] && response.data.results[0].geometry && response.data.results[0].geometry.location) {
              setCenter(response.data.results[0].geometry.location);
            }
          }
        }).catch((err) => {
          console.log('Failed to get map data', err)
        })
    }
  }, [post]);

  if (redirectToHome === true) {
    return <Redirect to="/" />;
  }

  // Make sure that we respect the original layout
  const getBody = () => {
    return post.body.replace(/(?:\r\n|\r|\n)/g, '<br>');
  }

  // Insert annotation
  const AddedAnnotation = (NewAnnotation) => {
    setAnnotations([...annotations, NewAnnotation])
  }

  return (
    <div className="post">
      {
        // Show loader until we load the post
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
                    onSwiper={(swiper) => swiper.update()}
                  >
                    {
                      post.images && post.images.length && post.images.length > 0 ?
                        post.images.map((image, index) => {
                          return <SwiperSlide key={image} style={{ backgroundImage: `url(${getImageUrl(image, imageSize.LARGE)})` }}> </SwiperSlide>
                        })
                        :
                        <SwiperSlide> No images available </SwiperSlide>
                    }
                  </Swiper>
                </div>
                <div className="body">{ReactHtmlParser(getBody())}</div>
              </div>
              <div className='right'>
                <div className="map">
                  <Map circle={true} center={center} zoom={post.address === "" ? 14 : 17} circleRadius={post.address === "" ? 400 : 100} />
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
                    <span>Neighborhood: </span>  {post.neighborhood.join(" ")}
                  </div>
                  <div className="divider"></div>
                  <div>
                    <span>Address: </span>  {post.address === "" ? 'N/A' : post.address}
                  </div>
                </div>
              </div>
            </div>
            <div >
              <h2>Annotations</h2>
              <div className="annotation">
                {
                  props.user ?
                    <React.Fragment>
                      <div className='list'>
                        {
                          annotations && annotations.length && annotations.length > 0 ?
                            <AnnotationList annotations={annotations} />
                            :
                            <div> No annotations found for this post </div>
                        }
                      </div>
                      <AddAnnotation success={AddedAnnotation} postId={post._id} />
                    </React.Fragment>
                    :
                    <div id={props.id} className="login">
                      Please sign-in/sign-up to add a annotation.
                      <Link
                        to={{
                          pathname: "/login",
                          state: { from: props.location },
                        }}
                      >
                        Go to sign-in/sign-up
                    </Link>
                    </div>
                }
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
