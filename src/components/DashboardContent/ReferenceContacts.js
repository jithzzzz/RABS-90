import React, { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import { useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";

const ReferenceContacts = () => {
  const [refrenceContact, setRef] = useState([]);
  const [offset, setOffset] = useState(1);
  const [data, setData] = useState([]);
  const [perPage] = useState(7);
  const [pageCount, setPageCount] = useState(0);
  const reference = useSelector((state) => state.DashboardReducer.reference);
  useEffect(() => {
    if (reference?.length) {
      let refe = reference?.map((val) => {
        return { ...val, highlight: false, id: val.RFId };
      });
      setRef(refe);
    }
  }, [reference]);
  const handlePageClick = (e) => {
    const selectedPage = e.selected;
    setOffset(selectedPage + 1);
  };
  useEffect(() => {
    if (Array.isArray(refrenceContact)) {
      if (refrenceContact?.length >= 7) {
        getData();
      } else setData(refrenceContact);
    }
  }, [offset, refrenceContact]);

  const getData = () => {
    const slice = refrenceContact?.slice(
      offset * perPage - 7,
      offset * perPage
    );
    setData(slice);
    setPageCount(Math.ceil(refrenceContact?.length / perPage));
  };

  useEffect(() => {}, []);
  const onMoreHandler = (id) => {
    let more = refrenceContact?.map((val) => {
      if (val.id === id) {
        val.highlight = !val.highlight;
      }
      return val;
    });
    setRef(more);
  };
  return (
    <div className="reference-contacts">
      <div className="d-flex mb-2" style={{ justifyContent: "space-between" }}>
        <h4>Reference Contact</h4>
        {/* <span className="glyphicon glyphicon-option-horizontal"></span> */}
      </div>
      {data?.map((val, i) => {
        return (
          <div key={i}>
            <div
              className="d-flex mt-4"
              style={{ justifyContent: "space-between" }}
            >
              <div className="d-flex">
                {/* <div className="img">
                  <img src={val.img} alt="" style={{ borderRadius: "5px" }} />
                </div> */}
                <div className="ml-3">
                  <h5 className="m-0 mt-2">{val.Name}</h5>
                  <h6 className="m-0 mt-2">{val.Department}</h6>
                </div>
              </div>
              <div className="arrow-div" onClick={() => onMoreHandler(val.id)}>
                {val.highlight ? (
                  <i className="fa fa-chevron-up"></i>
                ) : (
                  <i className="fa fa-chevron-down"></i>
                )}
              </div>
            </div>
            {val.highlight ? (
              <div className="more ml-3">
                <h6 className="m-0 mt-2">mob: {val.Pho}</h6>
              </div>
            ) : null}
          </div>
        );
      })}
      {refrenceContact?.length >= 7 ? (
        <div className="d-block text-center">
          <ReactPaginate
            previousLabel={"<"}
            nextLabel={">"}
            breakLabel={"..."}
            breakClassName={"break-me"}
            pageCount={pageCount}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={handlePageClick}
            containerClassName={"pagination"}
            subContainerClassName={"pages pagination"}
            activeClassName={"active"}
          />
        </div>
      ) : null}
    </div>
  );
};

export default ReferenceContacts;
