import React, { useState, useEffect } from "react";
import { Row, Card, CardBody, Container, Table, CardTitle } from "reactstrap";
import Breadcrumbs from "../Breadcrumbs";
import user from "../../assets/images/users/default-user.jpg";
import { useParams, useLocation } from "react-router-dom";
import {
  StoreDataService,
  ClientDataService,
} from "../../helpers/firebase_helper";

const AccountInfo = () => {
  const { id } = useParams();
  const location = useLocation();

  // State variables
  const [store, setStore] = useState([]);
  const [reload, setReload] = useState(true);
  const [client, setClient] = useState([]);

  // Firestore service
  const storeDataService = new StoreDataService();
  const clientDataService = new ClientDataService();

  // Fetch store and client data
  const getStore = async (id) => {
    try {
      if (id) {
        const urlParams = new URLSearchParams(location.search);
        const c = urlParams.get("c");

        // Fetch store data
        const storeDoc = await storeDataService.getStoreFirebase(id);
        const storeData = storeDoc.data();
        setStore(storeData);
        // console.log("Getting store with ID:", id);

        // Fetch client data if 'c' parameter is present
        if (c) {
          const clientDoc = await clientDataService.getClientFirebase(c);
          const clientData = clientDoc.data();
          setClient(clientData);
          // console.log("this error:", clientData);
        }
      }
    } catch (error) {
      // console.log("get store error : ", error);
      console.error(error);
    }
  };
  
  // console.log("the client :", client);
  // console.log("the store :", store);

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

  // Styles
  const thStyle = {
    width: "20%",
    textAlign: "center",
    borderColor: "#2a3042",
    borderRadius: "30px",
    backgroundColor: "#32394e",
  };
  const tdStyle = {
    textTransform: "capitalize",
    borderRadius: "30px",
    textAlign: "center",
    fontWeight: "bold",
    borderColor: "#2a3042",
    backgroundColor: "#222736",
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs title="Stores Grid" BreadcrumbItem="Account Info" />
          <Row>
            <Card className="mt-4">
              <CardBody>
                <div className="d-flex mb-4">
                  <img
                    className="d-flex me-3 rounded-circle avatar-sm"
                    src={user}
                    alt="User"
                  />
                  <div>
                    <h6
                      key={store}
                      className="font-size-15 mt-3"
                      style={{
                        textTransform: "capitalize",
                        fontWeight: "bold",
                      }}
                    >
                      {store.name} - {store.branch}
                    </h6>
                  </div>
                </div>
                <CardTitle className="mb-4">Basic Information</CardTitle>
                <Table>
                  <tbody>
                    <tr key={client.id}>
                      <th style={thStyle}>Job Title</th>
                      <td style={tdStyle}>{client.title}</td>

                      <th style={thStyle}>Full Name</th>
                      <td style={tdStyle}>{client.name}</td>
                    </tr>
                    <tr>
                      <th style={thStyle}>Phone Number</th>
                      <td style={tdStyle}>{client.phone}</td>

                      <th style={thStyle}>Email Address</th>
                      <td
                        style={{
                          borderRadius: "30px",
                          textAlign: "center",
                          fontWeight: "bold",
                          borderColor: "#2a3042",
                          backgroundColor: "#222736",
                        }}
                      >
                        {client.email}
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default AccountInfo;
