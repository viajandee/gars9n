import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, CardBody, Table } from "reactstrap";
import Breadcrumbs from "../Breadcrumbs";
import { StoreDataService } from "../../helpers/firebase_helper";
import { useParams } from "react-router-dom";
import GoogleMaps from "./GoogleMaps";

const StoreDetails = () => {
  document.title = "Store Details | Gars9n - Digital Menu & Ordering System";

  const { id } = useParams();

  // State variables
  const [store, setStore] = useState([]);
  const [reload, setReload] = useState(false);

  // Firestore service
  const storeDataService = new StoreDataService();

  // Fetch store data
  const getStore = async (id) => {
    try {
      const storeDoc = await storeDataService.getStoreFirebase(id);
      const storeData = storeDoc.data();

      setStore(storeData);
      setReload(true);
    } catch (error) {
      // console.log("get store error : ", error);
      console.error(error);
    }
  };

  // Effect to fetch store data when 'id' changes
  useEffect(() => {
    if (id) {
      getStore(id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  // Effect to refresh page by AJAX
  useEffect(() => {
    if (reload) {
      getStore();
      setReload(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reload]);

  // Function for short name
  const shortName = (shortname) => {
    if (!shortname || typeof shortname !== "string") {
      return <div>{store.shortname}</div>;
    }
    const parts = shortname.split(",");

    if (parts.length > 1) {
      const shortAddress = parts.slice(0, 2).join(", ");
      return (
        <div>
          {shortAddress.length > 10
            ? shortAddress.substring(0, 24) + ""
            : shortAddress}
        </div>
      );
    }

    return (
      <div>
        {shortname.length > 25 ? shortname.substring(0, 31) + "..." : shortname}
      </div>
    );
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs title="Stores Grid" BreadcrumbItem="Store Details" />
          <Row>
            <Col>
              <Card>
                <CardBody>
                  <Table>
                    <tbody
                      className="contact-links d-flex"
                      style={{ justifyContent: "space-between" }}
                    >
                      <tr key={store}>
                        <th
                          className="font-size-20 text-center"
                          style={{ paddingTop: "1%", borderColor: "#2a3042" }}
                        >
                          <i className="bx bxs-store" />
                        </th>
                        <td
                          style={{
                            paddingTop: "3%",
                            borderColor: "#2a3042",
                            textTransform: "capitalize",
                          }}
                        >
                          {shortName(store.name)}
                        </td>
                      </tr>

                      <tr>
                        <th
                          className="font-size-20 text-center"
                          style={{
                            paddingTop: "1%",
                            borderColor: "#2a3042",
                          }}
                        >
                          <i className="bx bx-map" />
                        </th>
                        <td
                          style={{
                            paddingTop: "4%",
                            borderColor: "#2a3042",
                            textTransform: "capitalize",
                          }}
                        >
                          {shortName(store.location)}
                        </td>
                      </tr>

                      <tr>
                        <th
                          className="font-size-20 text-center"
                          style={{ paddingTop: "1%", borderColor: "#2a3042" }}
                        >
                          <i className="bx bx-phone" />
                        </th>
                        <td
                          style={{ paddingTop: "4%", borderColor: "#2a3042" }}
                        >
                          {store.phone}
                        </td>
                      </tr>

                      <tr>
                        <th
                          className="font-size-20 text-center"
                          style={{ paddingTop: "1%", borderColor: "#2a3042" }}
                        >
                          <i className="bx bx-envelope" />
                        </th>
                        <td
                          style={{ paddingTop: "3%", borderColor: "#2a3042" }}
                        >
                          {shortName(store.email)}
                        </td>
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
