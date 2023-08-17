// ======= OUT OF THE CARD ======= //
import React, { useEffect } from "react";
import { withRouter, Link } from "react-router-dom";
import { Container, Row, Col } from "reactstrap";
import { map } from "lodash";
import CardContact from "./CardContact";
import Breadcrumbs from "components/Breadcrumb";
import { useDispatch, useSelector } from "react-redux";
import { getStores as onGetStores } from "../../store/entities/actions";

const StoresGrid = () => {
  document.title = "Stores | Gars9n - Digital Menu & Ordering System";

  const dispatch = useDispatch();

  const { stores } = useSelector((state) => ({
    stores: state.entities.stores,
  }));

  useEffect(() => {
    if (stores && !stores.length) {
      dispatch(onGetStores());
    }
  }, [dispatch, stores]);

  return (
    <>
      <div className='page-content'>
        <Container fluid>
          <Breadcrumbs title='Stores' BreadcrumbItem='Stores Grid' />

          <Row>
            {map(stores, (store, key) => (
              <CardContact store={store} key={"_store_" + key} />
            ))}
          </Row>

          {/*TODO: LOAD MORE */}
          <Row>
            <Col xs='12'>
              <div className='text-center my-3'>
                <Link to='#' className='text-success'>
                  <i className='bx bx-hourglass bx-spin me-2' />
                  Load More
                </Link>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default withRouter(StoresGrid);
