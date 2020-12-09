import React, { useEffect, useState } from "react";
import "./feed.css";
// import { getAllThreads, searchAllThreads } from "../../api/thread";
import PostList from "../../components/post-list";
// import Loader from "react-loader-spinner";
// import PageHead from "../../components/page-head";
// import { Link } from "react-router-dom";
import Filter from "../../components/filter";
import Sort from "../../components/sort";
// import ReactPaginate from "react-paginate";

const Feed = (props) => {
  const [posts, setPosts] = useState([]);
  // const [searchThreads, setSearchThreads] = useState([]);

  const [dataAvailable, setDataAvailable] = useState(false);
  // const [searchDone, setSearchDone] = useState(false);
  // const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const PER_PAGE = 20;

  // const triggerSearch = () => {
  //   if (searchTerm !== "") {
  //     onSearch(searchTerm);
  //   } else {
  //     setSearchThreads(posts);
  //   }
  // };

  function handlePageClick({ selected: selectedPage }) {
    setCurrentPage(selectedPage);
  }

  useEffect(() => {

    const mockData = [
      {
        "images": [
          "00W0W_hMqhpAVDCx0_0CI0t2",
          "00g0g_2XrgYcjIQlm_0CI0t2",
          "00101_eBsu8KYLFfV_06301N",
          "00101_9zYrPCMsiUj_0CI0t2",
          "00S0S_8KCejLQUbfs_0lM0t2",
          "00O0O_4gzOq7wQHyF_0lM0t2",
          "00E0E_c4SgHWYJSGO_0CI0t2",
          "00d0d_4e2TYCl0Wya_0pL0t2",
          "00909_lyAgGTF2WoY_0CI0t2"
        ],
        "title": "Valencia/Noe/Eureka/ Haight Corridors Flat",
        "price": 3599,
        "bedrooms": 2,
        "area": 1100,
        "neighborhood": [
          "castro",
          "upper market"
        ],
        "date": "2020-11-14 18:14",
        "url": "https://sfbay.craigslist.org/sfc/apa/d/san-francisco-valencia-noe-eureka/7216498820.html",
        "body": "\n        \nWill be newly remodeled 5 rooms and office in this sunny, South facing Victorian flat with city view.\nAvailable 12/15/2020.\n\nPerfectly located on quiet tree-lined street within walking distance to Valencia/Noe/Eureka/ Haight Corridors. Only one block to Muni and Dolores Park.\n\nNext door neighbor has garage/parking available for rent if interested.\n\n    ",
        "address": "Hancock near Noe"
      },
      {
        "images": [
          "00S0S_kMGHzESjSvD_0x20m1",
          "00F0F_i9TqvuOjBdh_0CI0pO",
          "00404_6S8p1czgDnV_0CI0pO",
          "00J0J_dx500p2e55i_0CI0pO",
          "00P0P_4oZO5ED6tWu_0CI0pO",
          "00S0S_38V8Ab8lXh3_0CI0pO",
          "00V0V_ciC3sCTbnzA_0CI0pO",
          "00X0X_6rEkX1Z6jD1_0CI0pO",
          "00U0U_kwjF4EWXD3z_0CI0pO",
          "00b0b_3Y0HG0w22F3_0CI0pO",
          "00707_cylWEVib6FX_0CI0pO",
          "00U0U_lCdq2Ljta1E_0CI0pO",
          "01515_8AFbp0IIuZv_0CI0pO",
          "00E0E_dI2rZSoJMHO_0CI0pO",
          "00O0O_li539rAPWN1_0CI0pO",
          "00303_hxKFG5SEJRh_0t20CI",
          "00L0L_5xul68IrsKm_0t20CI",
          "00X0X_inQjncGLl7J_0t20CI",
          "00b0b_iLvORUss8Gy_0t20CI",
          "00z0z_KRYtBGISAm_0t20CI"
        ],
        "title": "MUST SEE!! VIEWS & PARKING! JUST COMPLETELY RENOVATED! BALCONY",
        "price": 3450,
        "bedrooms": 2,
        "area": "",
        "neighborhood": [
          "castro",
          "upper market"
        ],
        "date": "2020-11-20 08:09",
        "url": "https://sfbay.craigslist.org/sfc/apa/d/san-francisco-must-see-views-parking/7234135867.html",
        "body": "\n        \n311 Corbett #16\n\nThis apartment has it ALL!  You can enjoy the breathtaking views of Dolores Heights and the Mission from your large private balcony, living room and bedroom! \n\nThe entire apartment has been completely renovated with custom details and features. It has a large wood burning fireplace that is perfect for those colder San Francisco nights.  All of the appliances are top of the line and are completely brand new!  The kitchen opens up into the dining room and living room area which is perfect for entertaining.  All of the kitchen cabinets beautiful tile and backsplash are custom, not to mention the gorgeous granite countertops! The kitchen island has a bank of cabinets on one side and space on the other side for seating.  The bedroom is very spacious and has a massive walk-in closet.  There is a separate linen closet and large coat closet in the entry way.  The bathroom has a custom shower with rain head.  The entire building runs off of the large solar panels which keeps your electrical bill very low.  It also comes with it's own large parking stall.   The laundry room is on the same floor a few steps away as well.  It is ready to be called home!\n\n\n\n\nAPARTMENT FEATURES:\n\n~ JUST COMPLETELY RENOVATED!\n~ SOLAR PANELS FOR BUILDING\n~ ALL NEW stainless steal appliances\n~ Dishwasher\n~ Garbage Disposal \n~ Beautifully tiled custom backsplash\n~ Custom Cabinets\n~ Granite Countertops\n~ Breakfast bar\n~ Wood Burning Fireplace\n~ Brand new large plank wood floors \n~ Recessed Lighting throughout\n~ Completely renovated bathroom\n~ Large custom shower\n~ Walk in closet in bedroom\n~ Large coat closet\n~ Large linen closet\n~ Large Private Deck\n~ Sweeping Views\n~ BRAND NEW double pain window and large slider\n~ Covered carport parking space INCLUDED in rent\n~ Shared laundry\n~ Elevator in Building\n~ Access to building from Market Street and Corbett\n~ Water and Garbage Included\n~ Rent Controlled Building\n~ PROPERTY MANAGER ON SITE\n~ Cats ok - MEOW\n\nPlease call/text/email for a private showing!\n\nCharity Smart\n \n\n\n    ",
        "address": "311 Corbett Avenue near Danvers Street"
      }];

    setPosts(mockData);

    setTimeout(() => {
      setDataAvailable(true);
    }, 1000);


    // getAllThreads()
    //   .then((response) => {
    //     // Insert users
    //     setPosts(response.data);

    //     // Let UI know that the users are available
    //     setDataAvailable(true);
    //   })
    //   .catch((err) => {
    //     // TODO: Show error message
    //     console.error("Failed to get all threads", err);
    //   });
  }, []);

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
      <Filter />
      <div className='feed-smaller'>
        <Sort />

        <PostList posts={posts} />
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
