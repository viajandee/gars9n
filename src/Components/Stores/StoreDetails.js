import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, CardBody, Table } from "reactstrap";
import Breadcrumbs from "../Breadcrumbs";
import { StoreDataService } from "../../helpers/firebase_helper";
import { useParams } from "react-router-dom";
import GoogleMaps from "./GoogleMaps";

const StoreDetails = () => {
  document.title = "Store Details | Gars9n - Digital Menu & Ordering System";

  const { id } = useParams();
  // for firstore
  const storeDataService = new StoreDataService();

  const [shouldReload, setShouldReload] = useState(false);
  // Get Store
  const [store, setStore] = useState([]);

  const getStore = async (id) => {
    try {
      const storeDoc = await storeDataService.getStoreFirebase(id);
      const storeData = storeDoc.data();

      setStore(storeData);
      setShouldReload(true);
    } catch (error) {
      console.log("get store error : ", error);
    }
  };
  // console.log("the store: ", store);

  useEffect(() => {
    if (id) {
      getStore(id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  // Refresh the page by AJAX
  useEffect(() => {
    if (shouldReload) {
      getStore();
      setShouldReload(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shouldReload]);

  return (
    <React.Fragment>
      <div className='page-content'>
        <Container fluid>
          <Breadcrumbs title='Store Grid' BreadcrumbItem='Store Details' />
          <Row>
            <Col>
              <Card>
                <CardBody>
                  <Table hover>
                    <tbody
                      className='contact-links d-flex'
                      style={{ justifyContent: "space-between" }}>
                      <tr key={store}>
                        <th className='font-size-20 text-center'>
                          <i className='bx bxs-store' />
                        </th>
                        <td style={{ textTransform: "capitalize" }}>
                          {store.name}
                        </td>
                      </tr>

                      <tr>
                        <th className='font-size-20 text-center'>
                          <i className='bx bx-map' />
                        </th>
                        <td style={{ textTransform: "capitalize" }}>
                          {store.location}
                        </td>
                      </tr>

                      <tr>
                        <th className='font-size-20 text-center'>
                          <i className='bx bx-phone' />
                        </th>
                        <td>{store.phone}</td>
                      </tr>

                      <tr>
                        <th className='font-size-20 text-center'>
                          <i className='mdi mdi-web' />
                        </th>
                        <td>{store.webSite}</td>
                      </tr>
                    </tbody>
                  </Table>
                  {/* Maps */}
                  <GoogleMaps />
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default StoreDetails;
