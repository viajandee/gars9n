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
  CardTitle,
} from "reactstrap";
import * as Yup from "yup";
import { useFormik } from "formik";
import Breadcrumbs from "../Breadcrumbs";
import TableContainer from "../../CommonTable/TableContainer";
import {
  ClientDataService,
  StoreDataService,
} from "../../helpers/firebase_helper";

const ClientsList = () => {
  document.title = "Clients | Gars9n - React Admin & Dashboard Template";

  // State variables
  const [modal, setModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [reload, setReload] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newPhone, setNewPhone] = useState([]);
  const [stores, setStores] = useState([]);
  const [clients, setClients] = useState([]);
  const [storeName, setStoreName] = useState("");
  const [jobTitle, setJobTitle] = useState(null);
  const [branch, setBranch] = useState("");
  // eslint-disable-next-line no-unused-vars
  const [emailError, setEmailError] = useState("");
  // eslint-disable-next-line no-unused-vars
  const [clientList, setClientList] = useState([]);

  // Firestore service
  const clientDataService = new ClientDataService();
  const storeDataService = new StoreDataService();

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
      title: "",
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .matches(/^[a-zA-Z\s]+$/, "Must contain only letters and spaces")
        .required("Please Enter Your Name"),
      email: Yup.string()
        .email()
        .required("Please Enter Your Email Address")
        .max(255),
      phone: Yup.number(1234567890).required("Please Enter Your Phone Number"),
    }),
    onSubmit: async (values) => {
      if (isEdit) {
        const updatedClient = {
          name: values.name,
          email: values.email,
          phone: values.phone,
          title: values.title,
          store: storeName,
          branch: branch,
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
          // console.log("Error update client", error);
          console.error(error);
        }
      }
    },
  });

  const handleClientClicks = () => {
    setClientList("");
    setIsEdit(false);
    toggle();
  };

  // Get Stores
  const getStores = async () => {
    const data = await storeDataService.getAllStoresFirebase();
    const stortStores = data.docs
      .map((doc) => ({ ...doc.data(), id: doc.id }))
      .sort((a, b) => a.name.localeCompare(b.name));
    setStores(stortStores);
  };

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
        title: clientData.title,
      });
      setStoreName(clientData.store);
      setBranch(clientData.store);

      setReload(true);
      setModal(true);
      setIsEdit(true);
    } catch (error) {
      // console.log("get client error", error);
      console.error(error);
    }
  };

  //Add Client
  const addClient = async (e) => {
    e.preventDefault();
    if (newName && newEmail && newPhone && storeName && jobTitle && branch) {
      const newClient = {
        name: newName,
        email: newEmail,
        phone: newPhone,
        store: storeName,
        title: jobTitle,
        branch: branch,
      };

      try {
        await clientDataService.addClientFirebase(newClient);
        setReload(true);
        // console.log("new client added successfully", newClient);
      } catch (error) {
        // console.log("error adding client", error);
        console.error(error);
      }
      setModalIsOpen(false);
      setNewName("");
      setNewEmail("");
      setNewPhone([]);
      setStoreName("");
      setBranch("");
      setJobTitle("");
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
  const deleteClient = async (clientId) => {
    if (clientId) {
      try {
        await clientDataService.deleteClientFirebase(deleteId);
        getClients();
        setReload(true);
        // console.log("client deleted successfully!");
      } catch (error) {
        // console.error("Error deleting client", error);
        console.error(error);
      }
    }
    setDeleteId(null);
    setDeleteModal(false);
  };

  const handleDeleteClient = async (id) => {
    if (id) {
      setDeleteId(id);
      setDeleteModal(true);
      onPaginationPageChange(1);
    }
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
        Header: "Clients Name",
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
        Header: "Phone Numbers",
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
        Header: "Email Address",
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
        Header: "Stores & Branchs",
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
                  handleDeleteClient(doc.id);
                }}>
                <i
                  className='mdi mdi-trash-can font-size-16'
                  id='deletetooltip'
                />
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

  // validation email
  const isEmailValid = (email) => {
    // Basic email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const allowedDomains = ["yahoo.com", "gmail.com", "hotmail.com"];

    if (!emailRegex.test(email)) {
      setEmailError("Please enter a valid email address.");
      return false;
    }

    const domain = email.split("@")[1];
    if (!allowedDomains.includes(domain)) {
      setEmailError("");
      return true; // true or false
    }
    setEmailError("");
    return true;
  };

  const handleEmailBlur = () => {
    if (!isEmailValid(newEmail)) {
      setNewEmail("");
    }
  };

  return (
    <React.Fragment>
      <div className='page-content'>
        <Container fluid>
          <Breadcrumbs title='Clients' BreadcrumbItem='Client List' />
          <Row>
            <Col sm='12'>
              <div className='text-sm-end'>
                <Button
                  color='primary w-md'
                  className='btn-rounded mb-2 me-2 '
                  onClick={openModal}>
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
              <Label className='form-label'>Job Title</Label>
              <span
                className='required-indicator ms-1'
                style={{ color: "#dc3545" }}>
                *
              </span>
              <Input
                required='required'
                type='select'
                style={{ textTransform: "capitalize" }}
                title='Please select your title.'
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}>
                <option value=''>Choose here</option>
                <option value='Owner'>Owner</option>
                <option value='Assistant director'>Assistant director</option>
                <option value='Senior manager'>Senior manager</option>
                <option value='Manager'>Manager</option>
                <option value='Assistant'>Assistant</option>
                <option value='Supervisor'>Supervisor</option>
                <option value='Senior'>Senior</option>
                <option value='Coordinator'>Coordinator</option>
                <option value='Team lead'>Team lead</option>
                <option value='Lead'>Lead</option>
                <option value='Other'>Other</option>
              </Input>
            </ModalBody>
            <ModalBody>
              <Label className='form-label'>Client Name</Label>
              <span
                className='required-indicator ms-1'
                style={{ color: "#dc3545" }}>
                *
              </span>
              <Input
                name='name'
                title='Please enter your full name.'
                placeholder='Enter Your Full Name'
                style={{ textTransform: "capitalize" }}
                type='text'
                value={newName}
                onChange={(e) => {
                  const inputValue = e.target.value;
                  const validInput = inputValue.replace(/[^a-zA-Z\s]/g, "");
                  setNewName(validInput);
                }}
                required='required'
              />
            </ModalBody>
            <ModalBody>
              <Label className='form-label'>Phone Number</Label>
              <span
                className='required-indicator ms-1'
                style={{ color: "#dc3545" }}>
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
                title='Please enter only number.'
              />
            </ModalBody>
            <ModalBody>
              <Label className='form-label'>Email Address</Label>
              <span
                className='required-indicator ms-1'
                style={{ color: "#dc3545" }}>
                *
              </span>
              <Input
                name='email'
                placeholder='name@example.com'
                type='email'
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
                required='required'
                title='Please enter a valid email address.'
                onBlur={handleEmailBlur}
              />
            </ModalBody>
            <ModalBody>
              <Label className='form-label'>Store Name</Label>
              <span
                className='required-indicator ms-1'
                style={{ color: "#dc3545" }}>
                *
              </span>
              <Input
                type='select'
                required='required'
                title='Please select your store name.'
                style={{ textTransform: "capitalize" }}
                value={storeName && branch}
                onChange={(e) => {
                  setStoreName(e.target.value);
                  setBranch(e.target.value);
                }}>
                <option value=''>Choose here</option>
                {stores.map((doc) => (
                  <option key={doc.id} value={`${doc.name} - ${doc.branch}`}>
                    {`${doc.name} - ${doc.branch}`}
                  </option>
                ))}
                <option value='Unknown'>Unknown</option>
              </Input>
            </ModalBody>
            <ModalFooter>
              <Button
                className='btn-rounded w-md ms-2'
                color='primary'
                onClick={addClient}>
                Save
              </Button>
              <Button
                style={{ backgroundColor: "#32394e" }}
                className='btn-rounded w-md'
                color='primary'
                onClick={() => setModalIsOpen(false)}>
                Cancel
              </Button>
            </ModalFooter>
          </Modal>

          {/* Delete Pop-Up */}
          <Modal
            isOpen={deleteModal}
            toggle={() => setDeleteModal(false)}
            centered={true}>
            <ModalBody className='py-3 px-5'>
              <Row>
                <Col sm={12}>
                  <div className='text-center'>
                    <i
                      className='mdi mdi-trash-can-outline'
                      style={{ fontSize: "3em", color: "white" }}
                    />
                    <h4 style={{ fontWeight: "bold" }}>Delete client?</h4>
                    <CardTitle>
                      {"Are you sure you want to delete this client?"}
                    </CardTitle>
                  </div>
                </Col>
              </Row>
              <Row>
                <Col>
                  <div className='text-center mt-3'>
                    <button
                      type='button'
                      className='btn btn-danger btn-rounded btn-lg ms-2'
                      onClick={deleteClient}>
                      Yes, I'm sure
                    </button>
                    <button
                      style={{ borderColor: "#007bff" }}
                      type='button'
                      className='btn btn-light btn-rounded btn-lg ms-2'
                      onClick={() => setDeleteModal(false)}>
                      No, Cancel
                    </button>
                  </div>
                </Col>
              </Row>
            </ModalBody>
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
                              <Label className='form-label'>Job Title</Label>
                              <Input
                                required='required'
                                style={{ textTransform: "capitalize" }}
                                name='title'
                                label='select'
                                type='select'
                                onChange={(e) =>
                                  validation.setFieldValue(
                                    "title",
                                    e.target.value
                                  )
                                }
                                value={validation.values.title}>
                                <option value=''>Choose here</option>
                                <option value='Owner'>Owner</option>
                                <option value='Assistant director'>
                                  Assistant director
                                </option>
                                <option value='Senior manager'>
                                  Senior manager
                                </option>
                                <option value='Manager'>Manager</option>
                                <option value='Assistant'>Assistant</option>
                                <option value='Supervisor'>Supervisor</option>
                                <option value='Senior'>Senior</option>
                                <option value='Coordinator'>Coordinator</option>
                                <option value='Team lead'>Team lead</option>
                                <option value='Lead'>Lead</option>
                              </Input>
                              {validation.touched.title &&
                              validation.errors.title ? (
                                <FormFeedback type='invalid'>
                                  {validation.errors.title}
                                </FormFeedback>
                              ) : null}
                            </div>
                            <div className='mb-3'>
                              <Label className='form-label'>Client Name</Label>
                              <Input
                                name='name'
                                style={{ textTransform: "capitalize" }}
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
                              <Label className='form-label'>Phone Number</Label>
                              <Input
                                name='phone'
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
                              <Label className='form-label'>Email</Label>
                              <Input
                                name='email'
                                type='text'
                                onChange={validation.handleChange}
                                onBlur={validation.handleBlur}
                                value={validation.values.email}
                                invalid={
                                  validation.touched.email &&
                                  validation.errors.email
                                    ? true
                                    : false
                                }
                              />
                              {validation.touched.email &&
                              validation.errors.email ? (
                                <FormFeedback type='invalid'>
                                  {validation.errors.email}
                                </FormFeedback>
                              ) : null}
                            </div>
                            <div className='mb-3'>
                              <Label className='form-label'>Store Name</Label>
                              <Input
                                required='required'
                                style={{ textTransform: "capitalize" }}
                                name='store'
                                label='select'
                                type='select'
                                onChange={(e) => {
                                  setStoreName(e.target.value);
                                  setBranch(e.target.value);
                                }}
                                value={storeName}>
                                <option value=''>Choose here</option>
                                {stores.map((doc) => (
                                  <option
                                    key={doc.id}
                                    value={`${doc.name} - ${doc.branch}`}>
                                    {`${doc.name} - ${doc.branch}`}
                                  </option>
                                ))}
                              </Input>
                            </div>
                          </Col>
                        </Row>
                        <Row>
                          <Col>
                            <div className='text-end'>
                              <Button
                                className='btn-rounded'
                                type='submit'
                                color='primary w-md'>
                                Update
                              </Button>
                              <Button
                                style={{ backgroundColor: "#32394e" }}
                                className='btn-rounded'
                                color='primary w-md ms-2'
                                onClick={() => {
                                  setModal(false);
                                  validation.resetForm();
                                }}>
                                Cancel
                              </Button>
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
