import { useEffect } from "react";
import { withRouter } from "react-router-dom";
import { Container, Row } from "reactstrap";

// import CardContact from "./card-contact";

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
            {Map(stores, (store, key) => (
              <></>
            ))}
          </Row>
        </Container>
      </div>
    </>
  );
};

export default withRouter(StoresGrid);
