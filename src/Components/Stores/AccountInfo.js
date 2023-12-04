import React, { useState, useEffect } from "react";
import { Row, Card, CardBody, Container, Table, CardTitle } from "reactstrap";
import Breadcrumbs from "../Breadcrumbs";
import user from "../../assets/images/users/default-user.jpg";
import { useParams } from "react-router-dom";
import { StoreDataService } from "../../helpers/firebase_helper";

const AccountInfo = () => {
  const { id } = useParams();
  // for firstore
  const storeDataService = new StoreDataService();
  const [store, setStore] = useState([]);
  const [reload, setReload] = useState(false);

  // get Store
  const getStore = async (id) => {
    try {
      const storeDoc = await storeDataService.getStoreFirebase(id);
      const storeData = storeDoc.data();

      setStore(storeData);
    } catch (error) {
      console.log("get store error : ", error);
    }
  };
  console.log("the store: ", store.title);

  useEffect(() => {
    if (id) {
      getStore(id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  // Refresh the page by AJAX
  useEffect(() => {
    if (reload) {
      getStore();
      setReload(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reload]);

  // style
  const thStyle = {
    backgroundColor: "#32394e",
    width: "20%",
    textAlign: "center",
    borderColor: "#2a3042",
  };
  const tdStyle = {
    textTransform: "capitalize",
  };

  return (
    <React.Fragment>
      <div className='page-content'>
        <Container fluid>
          <Breadcrumbs title='Stores Grid' BreadcrumbItem='Account Info' />
          <Row>
            <Card>
              <CardBody>
                <div className='d-flex mb-4'>
                  <img
                    className='d-flex me-3 rounded-circle avatar-sm'
                    src={user}
                    alt='User'
                  />
                </div>
                <CardTitle className='mb-4'>Basic Info</CardTitle>
                <Table hover>
                  <tbody>
                    <tr key={store}>
                      <th style={thStyle}>Job Title</th>
                      <td style={tdStyle}>{store.title}</td>
                    </tr>
                    <tr>
                      <th style={thStyle}>Full name</th>
                      <td style={tdStyle}>{store.client}</td>
                    </tr>
                    <tr>
                      <th style={thStyle}>Phone Number</th>
                      <td style={tdStyle}>{store.clientPhone}</td>
                    </tr>
                    <tr>
                      <th style={thStyle}>Email address</th>
                      <td style={tdStyle}>{store.clientEmail}</td>
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
