import React, { useState, useEffect } from "react";
import {
  Card,
  CardBody,
  CardFooter,
  UncontrolledTooltip,
  Col,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  FormFeedback,
  DropdownItem,
  Input,
  Label,
  Form,
  Modal,
  ModalHeader,
  ModalBody,
  Row,
  Container,
  Button,
  ModalFooter,
} from "reactstrap";
import { Link, withRouter } from "react-router-dom";
import { map } from "lodash";
import { useFormik } from "formik";
import * as Yup from "yup";
import Breadcrumbs from "../Breadcrumbs";
import DeleteModal from "CommonTable/DeleteModal";
import StoreDataService from "../../helpers/firebase_helper";
import { doc } from "firebase/firestore";

const StoresGrid = () => {
  document.title = "Stores | Gars9n - Digital Menu & Ordering System";

  const [deleteModal, setDeleteModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [modal, setModal] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [newStoreName, setNewStoreName] = useState("");
  const [newLocation, setNewLocation] = useState("");
  const [shouldReload, setShouldReload] = useState(false);

  // Update Store
  const validation = useFormik({
    enableReinitialize: true,
    initialValues: {
      id: "",
      name: "",
      location: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Please Enter Store Name"),
      location: Yup.string().required("Please Enter Location"),
    }),
    onSubmit: async (values) => {
      // console.log("Updating store with id:", values.id);
      // console.log("New name:", values.name);
      // console.log("New location:", values.location);

      // if (!values.id || !values.name || !values.location) {
      //   console.error("Invalid data provided for store update");
      //   return;
      // }

      if (isEdit) {
        const updatedStore = {
          name: values.name,
          location: values.location,
        };

        try {
          await StoreDataService.updateStoreFirebase(values.id, updatedStore);
          // console.log("Store updated successfully!", values.id, "and updatedStore:", updatedStore);
          setShouldReload(true);
          setModal(false);
          toggle();
        } catch (error) {
          console.log("Error updated store:", error);
        }
      }
    },
  });

  // Get Store
  const getStore = async (id) => {
    try {
      const storeDoc = await StoreDataService.getStoreFirebase(id);
      const storeData = storeDoc.data();
      // console.log("get store succses by id:", id);
      // console.log("get store succses by storeData:", storeData);

      validation.setValues({
        id: id,
        name: storeData.name,
        location: storeData.location,
      });

      setShouldReload(true);
      setModal(true);
      setIsEdit(true);
    } catch (error) {
      console.log("or error 2: ", error);
    }
  };

  // Add Store
  const addStore = async (e) => {
    e.preventDefault();
    if (newStoreName && newLocation) {
      const newStore = {
        name: newStoreName,
        location: newLocation,
      };

      try {
        await StoreDataService.addStoreFirebase(newStore);
        setShouldReload(true);
        console.log("New store added successfully!");
      } catch (error) {
        console.log("Error adding store:", error);
      }

      setModalIsOpen(false);
      setNewStoreName("");
      setNewLocation("");
    }
  };
  const openModal = () => {
    setModalIsOpen(true);
  };

  // Refresh the page by AJAX
  useEffect(() => {
    if (shouldReload) {
      getStores();
      setShouldReload(false);
    }
  }, [shouldReload]);

  // Delete store
  const deleteStore = async (id) => {
    await StoreDataService.deleteStoreFirebase(id);
    getStores();
  };
  const handleDeleteStore = () => {
    if (doc.id) {
      setDeleteModal(false);
    }
  };

  // Get Stores
  const [stores, setStores] = useState([]);

  useEffect(() => {
    getStores();
  }, []);

  const getStores = async () => {
    const data = await StoreDataService.getAllStoreFirebase();
    setStores(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  const toggle = () => {
    if (modal) {
      setModal(false);
    } else {
      setModal(true);
      setIsEdit(true);
    }
  };

  return (
    <React.Fragment>
      <DeleteModal
        show={deleteModal}
        onDeleteClick={handleDeleteStore}
        onCloseClick={() => setDeleteModal(false)}
      />

      <div className='page-content'>
        <Container fluid>
          <Breadcrumbs title='Stores' BreadcrumbItem='Stores Grid' />
          {/* Add Store */}
          <Row>
            <Col xs='12'>
              <div className='text-sm-end'>
                <Button
                  type='button'
                  color='primary'
                  className='btn mb-2 me-2'
                  onClick={openModal}>
                  <i className='mdi mdi-plus-circle-outline me-1' />
                  Add New Stores
                </Button>
              </div>
            </Col>
          </Row>
          <Modal isOpen={modalIsOpen} toggle={() => setModalIsOpen(false)}>
            <ModalHeader toggle={() => setModalIsOpen(false)}>
              Add Store
            </ModalHeader>
            <ModalBody>
              <Label className='form-label'>Store Name</Label>
              <Input
                type='text'
                value={newStoreName}
                onChange={(e) => setNewStoreName(e.target.value)}
              />
            </ModalBody>
            <ModalBody>
              <Label className='form-label'>Location</Label>
              <Input
                type='text'
                value={newLocation}
                onChange={(e) => setNewLocation(e.target.value)}
              />
            </ModalBody>
            <ModalFooter>
              <Button color='success' onClick={addStore}>
                Save
              </Button>{" "}
              <Button
                outline
                color='danger'
                onClick={() => setModalIsOpen(false)}>
                Cancel
              </Button>
            </ModalFooter>
          </Modal>

          <Row>
            {map(stores, (doc) => {
              return (
                <Col xl='4' sm='6' key={doc.id}>
                  <Card className='text-center'>
                    <CardBody>
                      {!doc.img ? (
                        <div className='avatar-sm mx-auto mb-4'>
                          <span
                            style={{ textTransform: "uppercase" }}
                            className={
                              "avatar-title rounded-circle bg-soft bg-" +
                              doc.color +
                              " text-" +
                              doc.color +
                              " font-size-16"
                            }>
                            {doc.name.charAt(0)}
                          </span>
                        </div>
                      ) : (
                        <div className='mb-4'>
                          <img
                            className='rounded-circle avatar-sm'
                            src={doc.img}
                            alt=''
                          />
                        </div>
                      )}

                      <div>
                        <h5
                          className='font-size-15 mb-1'
                          style={{ textTransform: "uppercase" }}>
                          {doc.name}
                        </h5>
                      </div>
                      <div
                        className='font-size-13 text-muted'
                        style={{ textTransform: "capitalize" }}>
                        {doc.location}
                      </div>
                    </CardBody>
                    <CardFooter className='bg-transparent border-top'>
                      <div className='contact-links d-flex font-size-20'>
                        <div className='flex-fill'>
                          <Link to='#' id={"message" + doc.id}>
                            <i className='bx bx-message-square-dots' />
                            <UncontrolledTooltip
                              placement='top'
                              target={"message" + doc.id}>
                              Message
                            </UncontrolledTooltip>
                          </Link>
                        </div>

                        <div className='flex-fill'>
                          <Link to='#' id={"project" + doc.id}>
                            <i className='bx bx-pie-chart-alt' />
                            <UncontrolledTooltip
                              placement='top'
                              target={"project" + doc.id}>
                              Projects
                            </UncontrolledTooltip>
                          </Link>
                        </div>

                        <div className='flex-fill'>
                          <Link to='#' id={"profile" + doc.id}>
                            <i className='bx bx-user-circle' />
                            <UncontrolledTooltip
                              placement='top'
                              target={"profile" + doc.id}>
                              Profile
                            </UncontrolledTooltip>
                          </Link>
                        </div>

                        {/* EDIT & DELETE */}
                        <div className='flex-fill'>
                          <UncontrolledDropdown>
                            <DropdownToggle
                              href='#'
                              className='card-drop'
                              tag='i'>
                              <i className='mdi mdi-dots-horizontal font-size-18' />
                            </DropdownToggle>
                            <DropdownMenu className='dropdown-menu-end'>
                              <DropdownItem onClick={(e) => getStore(doc.id)}>
                                <i className='mdi mdi-pencil font-size-16 text-success me-1' />{" "}
                                Edit
                              </DropdownItem>
                              <DropdownItem
                                onClick={(e) => deleteStore(doc.id)}>
                                <i className='mdi mdi-trash-can font-size-16 text-danger me-1' />{" "}
                                Delete
                              </DropdownItem>
                            </DropdownMenu>
                          </UncontrolledDropdown>
                        </div>
                      </div>
                    </CardFooter>
                  </Card>
                </Col>
              );
            })}
          </Row>

         
          <Modal isOpen={modal} toggle={() => setModal(false)}>
            <ModalHeader toggle={() => setModal(false)}>
              {isEdit ? "Edit Store" : "Add Store"}
            </ModalHeader>
            <ModalBody>
              <Form
                onSubmit={(e) => {
                  e.preventDefault();
                  validation.handleSubmit();
                  return false;
                }}>
                <Row form>
                  <Col className='col-12'>
                    <div className='mb-3'>
                      <Label className='form-label'>Store Name</Label>
                      <Input
                        id='name'
                        name='name'
                        type='text'
                        onChange={validation.handleChange}
                        onBlur={validation.handleBlur}
                        value={validation.values.name}
                        invalid={
                          validation.touched.name && validation.errors.name
                            ? true
                            : false
                        }
                      />
                      {validation.touched.name && validation.errors.name ? (
                        <FormFeedback type='invalid'>
                          {validation.errors.name}
                        </FormFeedback>
                      ) : null}
                    </div>

                    <div className='mb-3'>
                      <Label className='form-label'>Location</Label>
                      <Input
                        name='location'
                        type='text'
                        onChange={validation.handleChange}
                        onBlur={validation.handleBlur}
                        value={validation.values.location}
                        invalid={
                          validation.touched.location &&
                          validation.errors.location
                            ? true
                            : false
                        }
                      />
                      {validation.touched.location &&
                      validation.errors.location ? (
                        <FormFeedback type='invalid'>
                          {validation.errors.location}
                        </FormFeedback>
                      ) : null}
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <div className='text-end'>
                      <button
                        type='submit'
                        className='btn btn-success save-user'>
                        Save
                      </button>
                    </div>
                  </Col>
                </Row>
              </Form>
            </ModalBody>
          </Modal>

          {/* lOAD MORE */}
          <Row>
            <Col xs='12'>
              <div className='text-center my-3'>
                <Link to='#' className='text-success'>
                  <i className='bx bx-loader bx-spin font-size-18 align-middle me-2' />
                  Load more
                </Link>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default withRouter(StoresGrid);
