import React, { useState, useEffect, useMemo, useRef } from "react";
import { withRouter } from "react-router-dom";
import {
  Card,
  CardBody,
  Col,
  Container,
  Row,
  Modal,
  ModalBody,
  Label,
  Input,
  Form,
  FormFeedback,
  UncontrolledTooltip,
  ModalHeader,
  Button,
  ModalFooter,
} from "reactstrap";
import * as Yup from "yup";
import { useFormik } from "formik";
import Breadcrumbs from "../Breadcrumbs";
import DeleteModal from "../../CommonTable/DeleteModal";
import TableContainer from "../../CommonTable/TableContainer";
import {
  ClientDataService,
  StoreDataService,
} from "../../helpers/firebase_helper";
import { doc } from "firebase/firestore";

const ClientsList = () => {
  document.title = "Clients | Gars9n - React Admin & Dashboard Template";

  // eslint-disable-next-line no-unused-vars
  const [clientList, setClientList] = useState([]);
  const [modal, setModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [reload, setReload] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newPhone, setNewPhone] = useState([]);
  const [stores, setStores] = useState([]);
  const [clients, setClients] = useState([]);
  const [storeName, setStoreName] = useState("");

  //firestore
  const clientDataService = new ClientDataService();
  const storeDataService = new StoreDataService();

  // Get Stores
  const getStores = async () => {
    const data = await storeDataService.getAllStoresFirebase();
    setStores(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  // Get Store
  const getStore = async (id) => {
    try {
      const storeDoc = await storeDataService.getStoreFirebase(id);
      const storeData = storeDoc.data();

      validation.setValues({
        id: id,
        name: storeData.name,
        location: storeData.location,
      });

      setReload(true);
      setModal(true);
      setIsEdit(true);
    } catch (error) {
      console.log("or error 2: ", error);
    }
  };

  useEffect(() => {
    getStores();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  
  // update client
  const validation = useFormik({
    enableReinitialize: true,
    initialValues: {
      id: "",
      name: "",
      email: "",
      phone: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Please Enter Your Name"),
      email: Yup.string()
        .email("Must be a valid Email")
        .max(255)
        .required("Please Enter Your Email"),
      phone: Yup.number().required("Please Enter Your Phone Number"),
    }),
    onSubmit: async (values) => {
      if (isEdit) {
        const updatedClient = {
          name: values.name,
          email: values.email,
          phone: values.phone,
          store: storeName,
        };
        try {
          await clientDataService.updateClientFirebase(
            values.id,
            updatedClient
          );
          // console.log(
          //   "Store updated successfully!",
          //   values.id,
          //   "and updatedClient:",
          //   updatedClient
          // );
          setReload(true);
          setModal(false);
          toggle();
        } catch (error) {
          console.log("Error update client", error);
        }
      }
    },
  });

  // GetClient
  const getClient = async (id) => {
    try {
      const clientDoc = await clientDataService.getClientFirebase(id);
      const clientData = clientDoc.data();
      // console.log("get client succses by id:", id);
      // console.log("get store succses by storeData:", clientData);

      validation.setValues({
        id: id,
        name: clientData.name,
        email: clientData.email,
        phone: clientData.phone,
      });
      setReload(true);
      setModal(true);
      setIsEdit(true);
    } catch (error) {
      console.log("get client error", error);
    }
  };

  //Add Client
  const addClient = async (e) => {
    e.preventDefault();
    if (newName && newEmail && newPhone && storeName) {
      const newClient = {
        name: newName,
        email: newEmail,
        phone: newPhone,
        store: storeName,
      };

      try {
        await clientDataService.addClientFirebase(newClient);
        setReload(true);
        // console.log("new client added successfully", newClient);
      } catch (error) {
        console.log("error adding client", error);
      }
      setModalIsOpen(false);
      setNewName("");
      setNewEmail("");
      setNewPhone([]);
      setStoreName("");
    }
  };
  const openModal = () => {
    setModalIsOpen(true);
  };

  var node = useRef();
  const onPaginationPageChange = (page) => {
    if (
      node &&
      node.current &&
      node.current.props &&
      node.current.props.pagination &&
      node.current.props.pagination.options
    ) {
      node.current.props.pagination.options.onPageChange(page);
    }
  };

  // Delete Clients
  const deleteClient = async (id) => {
    await clientDataService.deleteClientFirebase(id);
    getClients();
    setReload(true);
  };
  const handleDeleteClient = () => {
    if (doc.id) {
      setDeleteModal(false);
      onPaginationPageChange(1);
    }
  };

  const handleClientClicks = () => {
    setClientList("");
    setIsEdit(false);
    toggle();
  };

  const getClients = async () => {
    const data = await clientDataService.getAllClientsFirebase();
    setClients(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  // eslint-disable-next-line no-unused-vars
  const keyField = "id";

  // Refresh the page by AJAX
  useEffect(() => {
    if (reload) {
      getClients();
      setReload(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reload]);

  useEffect(() => {
    getClients();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toggle = () => {
    if (modal) {
      setModal(false);
    } else {
      setModal(true);
      setIsEdit(true);
    }
  };

  const columns = useMemo(
    () => [
      {
        Header: "ID",
        disableFilters: true,
        filterable: true,
        accessor: (cellProps) => (
          <>
            {!cellProps.img ? (
              <div className='avatar-xs'>
                <span
                  className='avatar-title rounded-circle'
                  style={{
                    textTransform: "capitalize",
                    textAlign: "center",
                    marginTop: "6px",
                  }}>
                  {cellProps.name.charAt(0)}
                </span>
              </div>
            ) : (
              <div>
                <img
                  className='rounded-circle avatar-xs'
                  src={cellProps.img}
                  alt=''
                />
              </div>
            )}
          </>
        ),
      },
      {
        Header: "Client Name",
        accessor: "name",
        filterable: true,

        Cell: (cellProps) => {
          return (
            <div
              style={{
                textTransform: "capitalize",
                textAlign: "center",
                marginTop: "12px",
              }}>
              {cellProps.value}
            </div>
          );
        },
      },
      {
        Header: "Email",
        accessor: "email",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <div
              style={{
                textAlign: "start",
                marginTop: "12px",
              }}>
              {cellProps.value}
            </div>
          );
        },
      },
      {
        Header: "Phone Number",
        accessor: "phone",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <div
              style={{
                textTransform: "capitalize",
                textAlign: "center",
                marginTop: "12px",
              }}>
              {cellProps.value}
            </div>
          );
        },
      },
      {
        Header: "Store Name",
        accessor: "store",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <div
              style={{
                textTransform: "capitalize",
                textAlign: "center",
                marginTop: "12px",
              }}>
              {cellProps.value}
            </div>
          );
        },
      },

      {
        Header: "Edit & Delete",
        Cell: (cellProps) => {
          return (
            <div
              style={{
                display: "flex",
                justifyContent: "space-evenly",
                marginTop: "12px",
              }}>
              <div
                className='text-success'
                onClick={() => {
                  const doc = cellProps.row.original;
                  getClient(doc.id);
                  getStore(doc.id);
                }}>
                <i className='mdi mdi-pencil font-size-16' id='edittooltip' />
                <UncontrolledTooltip placement='top' target='edittooltip'>
                  Edit
                </UncontrolledTooltip>
              </div>

              <div
                className='text-danger'
                onClick={(e) => {
                  const doc = cellProps.row.original;
                  deleteClient(doc.id);
                }}>
                <i className='mdi mdi-delete font-size-16' id='deletetooltip' />
                <UncontrolledTooltip placement='top' target='deletetooltip'>
                  Delete
                </UncontrolledTooltip>
              </div>
            </div>
          );
        },
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return (
    <React.Fragment>
      <DeleteModal
        show={deleteModal}
        onDeleteClick={handleDeleteClient}
        onCloseClick={() => setDeleteModal(false)}
      />
      <div className='page-content'>
        <Container fluid>
          <Breadcrumbs title='Clients' BreadcrumbItem='Client List' />
          <Row>
            <Col sm='12'>
              <div className='text-sm-end'>
                <Button
                  color='primary w-md'
                  className='btn-rounded mb-2 me-2'
                  onClick={openModal}>
                  <i className='mdi mdi-plus-circle-outline me-1' />
                  Add New Client
                </Button>
              </div>
            </Col>
          </Row>
          <Modal isOpen={modalIsOpen} toggle={() => setModalIsOpen(false)}>
            <ModalHeader toggle={() => setModalIsOpen(false)}>
              Add Client
            </ModalHeader>
            <ModalBody>
              <Label className='form-label'>Client Name</Label>{" "}
              <span className='required-indicator' style={{ color: "#f46a6a" }}>
                *
              </span>
              <Input
                name='name'
                placeholder='Enter Your Name'
                type='text'
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                required='required'
              />
            </ModalBody>
            <ModalBody>
              <Label className='form-label'>Email</Label>{" "}
              <span className='required-indicator' style={{ color: "#f46a6a" }}>
                *
              </span>
              <Input
                name='email'
                placeholder='name@example.com'
                type='email'
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
                required='@'
                title='Please Enter Valid Email With @'
              />
            </ModalBody>
            <ModalBody>
              <Label className='form-label'>Phone Number</Label>{" "}
              <span className='required-indicator' style={{ color: "#f46a6a" }}>
                *
              </span>
              <Input
                name='phone'
                placeholder='(+00) 0000-0000'
                label='Phone'
                type='number'
                value={newPhone}
                onChange={(e) => setNewPhone(e.target.value)}
                required='required'
              />
            </ModalBody>
            <ModalBody>
              <Label className='form-label'>Store Name</Label>{" "}
              <span className='required-indicator' style={{ color: "#f46a6a" }}>
                *
              </span>
              <Input
                type='select'
                required='required'
                style={{ textTransform: "capitalize" }}
                value={storeName}
                onChange={(e) => setStoreName(e.target.value)}>
                <option value=''>Select Store</option>
                {stores.map((doc) => (
                  <option key={doc.id} value={doc.name}>
                    {doc.name}
                  </option>
                ))}
              </Input>
            </ModalBody>
            <ModalFooter>
              <Button
                className='btn-rounded w-md'
                color='outline-success'
                onClick={addClient}>
                Save
              </Button>{" "}
              <Button
                className='btn-rounded w-md'
                color='outline-danger'
                onClick={() => setModalIsOpen(false)}>
                Cancel
              </Button>
            </ModalFooter>
          </Modal>

          <Row>
            <Col sm='12'>
              <Card>
                <CardBody>
                  <TableContainer
                    columns={columns}
                    data={clients}
                    isGlobalFilter={true}
                    isAddUserList={true}
                    handleUserClick={handleClientClicks}
                    customPageSize={10}
                    className='custom-header-css text-center'
                  />

                  <Modal isOpen={modal} toggle={toggle}>
                    <ModalHeader toggle={toggle} tag='h4'>
                      {isEdit ? "Edit Client" : "Add Client"}
                    </ModalHeader>
                    <ModalBody>
                      <Form
                        onSubmit={(e) => {
                          e.preventDefault();
                          validation.handleSubmit();
                          return false;
                        }}>
                        <Row form>
                          <Col xs={12}>
                            <div className='mb-3'>
                              <Label className='form-label'></Label>
                              <Input
                                name='name'
                                placeholder='Client Name'
                                type='text'
                                onChange={validation.handleChange}
                                onBlur={validation.handleBlur}
                                value={validation.values.name || ""}
                                invalid={
                                  validation.touched.name &&
                                  validation.errors.name
                                    ? true
                                    : false
                                }
                              />
                              {validation.touched.name &&
                              validation.errors.name ? (
                                <FormFeedback type='invalid'>
                                  {validation.errors.name}
                                </FormFeedback>
                              ) : null}
                            </div>

                            <div className='mb-3'>
                              <Label className='form-label'></Label>
                              <Input
                                name='email'
                                placeholder='Email'
                                label='Email'
                                type='email'
                                onChange={validation.handleChange}
                                onBlur={validation.handleBlur}
                                value={validation.values.email || ""}
                                invalid={
                                  validation.touched.email &&
                                  validation.errors.email
                                    ? true
                                    : false
                                }
                              />
                            </div>

                            <div className='mb-3'>
                              <Label className='form-label'></Label>
                              <Input
                                required='required'
                                name='phone'
                                placeholder='Client Phone'
                                label='Phone'
                                onChange={validation.handleChange}
                                onBlur={validation.handleBlur}
                                value={validation.values.phone || ""}
                                invalid={
                                  validation.touched.phone &&
                                  validation.errors.phone
                                    ? true
                                    : false
                                }
                              />
                              {validation.touched.phone &&
                              validation.errors.phone ? (
                                <FormFeedback type='invalid'>
                                  {validation.errors.phone}
                                </FormFeedback>
                              ) : null}
                            </div>
                            <div className='mb-3'>
                              <Label className='form-label'></Label>
                              <Input
                                required='required'
                                style={{ textTransform: "capitalize" }}
                                name='store'
                                label='select'
                                type='select'
                                onChange={(e) => setStoreName(e.target.value)}
                                value={storeName}>
                                <option value=''>Select Store</option>
                                {stores.map((doc) => (
                                  <option key={doc.id} value={doc.name}>
                                    {doc.name}
                                  </option>
                                ))}
                              </Input>
                              {validation.touched.store &&
                              validation.errors.store ? (
                                <FormFeedback type='invalid'>
                                  {validation.errors.store}
                                </FormFeedback>
                              ) : null}
                            </div>
                          </Col>
                        </Row>
                        <Row>
                          <Col>
                            <div className='text-end'>
                              <button
                                style={{ borderRadius: "20px" }}
                                type='submit'
                                className='btn btn-outline-success w-md save-client'>
                                Save
                              </button>
                            </div>
                          </Col>
                        </Row>
                      </Form>
                    </ModalBody>
                  </Modal>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default withRouter(ClientsList);
