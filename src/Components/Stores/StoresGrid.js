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
  FormControl,
  InputGroup,
} from "reactstrap";
import { Link, withRouter } from "react-router-dom";
import { map } from "lodash";
import { useFormik } from "formik";
import * as Yup from "yup";
import Breadcrumbs from "../Breadcrumbs";
import DeleteModal from "CommonTable/DeleteModal";
import { StoreDataService } from "../../helpers/firebase_helper";
import { doc } from "firebase/firestore";

const StoresGrid = () => {
  document.title = "Stores | Gars9n - Digital Menu & Ordering System";

  const [deleteModal, setDeleteModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [modal, setModal] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [shouldReload, setShouldReload] = useState(false);
  const [stores, setStores] = useState([]);
  const [storeName, setStoreName] = useState("");
  const [location, setLocation] = useState("");
  const [phone, setPhone] = useState([]);
  const [storeWebSite, setStoreWebSite] = useState("");

  // for firstore
  const storeDataService = new StoreDataService();

  // Update Store
  const validation = useFormik({
    enableReinitialize: true,
    initialValues: {
      id: "",
      name: "",
      location: "",
      phone: "",
      webSite: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Please Enter Store Name"),
      location: Yup.string().required("Please Enter Location"),
      webSite: Yup.string().required("Please Enter webSite"),
    }),
    onSubmit: async (values) => {
      console.log("Updating store with id:", values.id);
      console.log("New name:", values.name);
      console.log("New location:", values.location);
      console.log("phone:", values.phone);
      console.log("website:", values.webSite);

      if (
        !values.id ||
        !values.name ||
        !values.location ||
        !values.phone ||
        !values.webSite
      ) {
        console.error("Invalid data provided for store update");
        return;
      }

      if (isEdit) {
        // Maps
        const { lat, lng } = await storeDataService.geocode(values.location);

        const updatedStore = {
          name: values.name,
          location: values.location,
          phone: values.phone,
          webSite: values.webSite,
          latitude: lat,
          longitude: lng,
        };

        try {
          await storeDataService.updateStoreFirebase(values.id, updatedStore);
          console.log(
            "Store updated successfully!",
            values.id,
            "and updatedStore:",
            updatedStore
          );
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
      const storeDoc = await storeDataService.getStoreFirebase(id);

      const storeData = storeDoc.data();
      console.log("get store succses by id:", id);
      console.log("get store succses by storeData:", storeData);

      validation.setValues({
        id: id,
        name: storeData.name,
        location: storeData.location,
        phone: storeData.phone,
        webSite: storeData.webSite,
      });

      setShouldReload(true);
      setModal(true);
      setIsEdit(true);
    } catch (error) {
      console.log("get store error:", error);
    }
  };

  // Add Store
  const addStore = async (e) => {
    e.preventDefault();
    if (storeName && location && phone && storeWebSite) {
      try {
        const { lat, lng } = await storeDataService.geocode(location);

        const newStore = {
          name: storeName,
          location: location,
          phone: phone,
          webSite: storeWebSite,
          latitude: lat,
          longitude: lng,
        };
        // console.log("Latitude:", lat, "Longitude:", lng);

        await storeDataService.addStoreFirebase(newStore);
        setShouldReload(true);
        console.log("New store added successfully!");
      } catch (error) {
        console.log("Error adding store:", error);
      }

      setModalIsOpen(false);
      setStoreName("");
      setLocation("");
      setPhone([]);
      setStoreWebSite("");
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shouldReload]);

  // Delete store
  const deleteStore = async (id) => {
    await storeDataService.deleteStoreFirebase(id);
    getStores();
  };
  const handleDeleteStore = () => {
    if (doc.id) {
      setDeleteModal(false);
    }
  };

  // Get Stores
  useEffect(() => {
    getStores();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getStores = async () => {
    const data = await storeDataService.getAllStoresFirebase();
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
          <Row>
            <Col sm='12'>
              <div className='text-sm-end'>
                <Button
                  type='button'
                  color='primary'
                  className='btn-rounded mb-2 me-2'
                  onClick={openModal}>
                  <i className='mdi mdi-plus-circle-outline me-1' />
                  Add New Store
                </Button>
              </div>
            </Col>
          </Row>
          <Modal isOpen={modalIsOpen} toggle={() => setModalIsOpen(false)}>
            <ModalHeader toggle={() => setModalIsOpen(false)}>
              Add Store
            </ModalHeader>
            <ModalBody>
              <Label className='form-label'>Store Name</Label>{" "}
              <span className='required-indicator' style={{ color: "#f46a6a" }}>
                *
              </span>
              <Input
                type='text'
                value={storeName}
                onChange={(e) => setStoreName(e.target.value)}
              />
            </ModalBody>
            <ModalBody>
              <Label className='form-label'>Store Location</Label>{" "}
              <span className='required-indicator' style={{ color: "#f46a6a" }}>
                *
              </span>
              <Input
                type='text'
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </ModalBody>
            <ModalBody>
              <Label className='form-label'>Store Phone</Label>{" "}
              <span className='required-indicator' style={{ color: "#f46a6a" }}>
                *
              </span>
              <Input value={phone} onChange={(e) => setPhone(e.target.value)} />
            </ModalBody>
            <ModalBody>
              <Label className='form-label'>WebSite/Store Email</Label>{" "}
              <span className='required-indicator' style={{ color: "#f46a6a" }}>
                *
              </span>
              <Input
                type='text'
                value={storeWebSite}
                onChange={(e) => setStoreWebSite(e.target.value)}
              />
            </ModalBody>
            <ModalFooter>
              <Button
                className='btn-rounded'
                color='outline-success w-md'
                onClick={addStore}>
                Save
              </Button>{" "}
              <Button
                className='btn-rounded'
                color='outline-danger w-md'
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
                            style={{
                              textTransform: "uppercase",
                            }}
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
                          style={{
                            textTransform: "uppercase",
                            fontWeight: "bold",
                          }}>
                          <Link
                            to={"/stores-grid/add-account/" + doc.id}
                            id={doc.id}
                            className='text-white'
                            onClick={() =>
                              getStore(`/stores-grid/add-account/${doc.id}`)
                            }
                            target={doc.id}>
                            {doc.name}
                          </Link>
                        </h5>
                      </div>

                      <div
                        className='font-size-13 text-muted'
                        style={{
                          textTransform: "capitalize",
                        }}>
                        {doc.location}
                      </div>
                    </CardBody>

                    <CardFooter className='bg-transparent border-top'>
                      <div className='contact-links d-flex font-size-20'>
                        <div className='flex-fill'>
                          <Link to='#' id={"detail" + doc.id}>
                            <i className='bx bxs-user-detail' />
                            <UncontrolledTooltip
                              placement='top'
                              target={"detail" + doc.id}>
                              Account Info
                            </UncontrolledTooltip>
                          </Link>
                        </div>

                        <div className='flex-fill'>
                          <Link
                            to={"/stores-grid/store-details/" + doc.id}
                            id={"profile" + doc.id}>
                            <i className='bx bx-store' />
                            <UncontrolledTooltip
                              onClick={() =>
                                getStore(`/stores-grid/store-details/${doc.id}`)
                              }
                              placement='top'
                              target={"profile" + doc.id}>
                              Store Details
                            </UncontrolledTooltip>
                          </Link>
                        </div>

                        <div className='flex-fill'>
                          <Link to='#' id={"menu" + doc.id}>
                            <i className='bx bx-food-menu' />
                            <UncontrolledTooltip
                              placement='top'
                              target={"menu" + doc.id}>
                              Store Menu
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
                      <Label className='form-label'></Label>
                      <Input
                        id='name'
                        placeholder='Store Name'
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
                      <Label className='form-label'></Label>
                      <Input
                        name='location'
                        placeholder='Location'
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

                    <div className='mb-3'>
                      <Label className='form-label'></Label>
                      <Input
                        placeholder='Store Phone'
                        name='phone'
                        type='number'
                        onChange={validation.handleChange}
                        onBlur={validation.handleBlur}
                        value={validation.values.phone || ""}
                        invalid={
                          validation.touched.phone && validation.errors.phone
                            ? true
                            : false
                        }
                      />
                      {validation.touched.phone && validation.errors.phone ? (
                        <FormFeedback type='invalid'>
                          {validation.errors.phone}
                        </FormFeedback>
                      ) : null}
                    </div>

                    <div className='mb-3'>
                      <Label className='form-label'></Label>
                      <Input
                        placeholder='WebSite'
                        name='webSite'
                        type='text'
                        onChange={validation.handleChange}
                        onBlur={validation.handleBlur}
                        value={validation.values.webSite}
                        invalid={
                          validation.touched.webSite &&
                          validation.errors.webSite
                            ? true
                            : false
                        }
                      />
                      {validation.touched.webSite &&
                      validation.errors.webSite ? (
                        <FormFeedback type='invalid'>
                          {validation.errors.webSite}
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
                        color=''
                        className='btn btn-outline-success w-md save-user '>
                        Save
                      </button>
                    </div>
                  </Col>
                </Row>
              </Form>
            </ModalBody>
          </Modal>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default withRouter(StoresGrid);
