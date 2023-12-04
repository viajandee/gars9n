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
  OffcanvasBody,
  OffcanvasHeader,
  Offcanvas,
} from "reactstrap";
import { Link, withRouter } from "react-router-dom";
import { map } from "lodash";
import { useFormik } from "formik";
import * as Yup from "yup";
import Breadcrumbs from "../Breadcrumbs";
import DeleteModal from "CommonTable/DeleteModal";
import {
  StoreDataService,
  ClientDataService,
} from "../../helpers/firebase_helper";
import { doc } from "firebase/firestore";
import JumpArrow from "./JumpArrow";

const StoresGrid = () => {
  document.title = "Stores | Gars9n - Digital Menu & Ordering System";

  const [deleteModal, setDeleteModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [modal, setModal] = useState(false);
  const [canvasIsOpen, setCanvasIsOpen] = useState(false);
  const [reload, setReload] = useState(false);
  const [stores, setStores] = useState([]);
  const [storeName, setStoreName] = useState("");
  const [location, setLocation] = useState("");
  const [phone, setPhone] = useState([]);
  const [storeWebSite, setStoreWebSite] = useState("");
  const [clients, setClients] = useState([]);
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newPhone, setNewPhone] = useState([]);
  const [jobTitle, setJobTitle] = useState(null);

  // for firstore
  const storeDataService = new StoreDataService();
  const clientDataService = new ClientDataService();

  // get Clients
  const getClients = async () => {
    const data = await clientDataService.getAllClientsFirebase();
    setClients(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
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
      });
      setReload(true);
      setModal(true);
      setIsEdit(true);
    } catch (error) {
      console.log("get client error", error);
    }
  };

  useEffect(() => {
    getClients();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Update Store
  const validation = useFormik({
    enableReinitialize: true,
    initialValues: {
      id: "",
      name: "",
      location: "",
      phone: "",
      webSite: "",
      title: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Please Enter Store Name"),
      location: Yup.string().required("Please Enter Location"),
      webSite: Yup.string().required("Please Enter webSite"),
      title: Yup.string().required("Please Select a Job Title"),
    }),
    onSubmit: async (values) => {
      console.log("Updating store with id:", values.id);
      console.log("New name:", values.name);
      console.log("New location:", values.location);
      console.log("phone:", values.phone);
      console.log("website:", values.webSite);
      console.log("website:", values.title);

      if (
        !values.id ||
        !values.name ||
        !values.location ||
        !values.phone ||
        !values.webSite ||
        !values.title
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
          client: newName,
          clientPhone: newPhone,
          clientEmail: newEmail,
          title: values.title,
        };

        try {
          await storeDataService.updateStoreFirebase(values.id, updatedStore);
          console.log(
            "Store updated successfully!",
            values.id,
            "and updatedStore:",
            updatedStore
          );
          setReload(true);
          setModal(false);
          toggle();
        } catch (error) {
          console.log("Error updated store:", error);
        }
      }
    },
  });

  const toggle = () => {
    if (modal) {
      setModal(false);
    } else {
      setModal(true);
      setIsEdit(true);
    }
  };

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
        title: storeData.title,
      });

      setReload(true);
      setModal(true);
      setIsEdit(true);
    } catch (error) {
      console.log("get store error:", error);
    }
  };

  // Add Store
  const addStore = async (e) => {
    e.preventDefault();
    if (
      storeName &&
      location &&
      phone &&
      storeWebSite &&
      newName &&
      newPhone &&
      newEmail &&
      jobTitle
    ) {
      try {
        const { lat, lng } = await storeDataService.geocode(location);

        const newStore = {
          name: storeName,
          location: location,
          phone: phone,
          webSite: storeWebSite,
          latitude: lat,
          longitude: lng,
          client: newName,
          clientPhone: newPhone,
          clientEmail: newEmail,
          title: jobTitle,
        };
        // console.log("Latitude:", lat, "Longitude:", lng);

        await storeDataService.addStoreFirebase(newStore);
        setReload(true);
        console.log("New store added successfully!");
      } catch (error) {
        console.log("Error adding store:", error);
      }

      setCanvasIsOpen(false);
      setStoreName("");
      setLocation("");
      setPhone([]);
      setStoreWebSite("");
      setNewName("");
      setNewPhone("");
      setNewEmail("");
      setJobTitle("");
    }
  };

  const openCanvas = () => {
    setCanvasIsOpen(true);
  };

  // Refresh the page by AJAX
  useEffect(() => {
    if (reload) {
      getStores();
      setReload(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reload]);

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
  const getStores = async () => {
    const data = await storeDataService.getAllStoresFirebase();
    const stortStores = data.docs
      .map((doc) => ({ ...doc.data(), id: doc.id }))
      .sort((a, b) => a.name.localeCompare(b.name));
    setStores(stortStores);
  };

  useEffect(() => {
    getStores();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // short address
  const shortLocation = (location) => {
    if (!location || typeof location !== "string") {
      return <div>{doc.location}</div>;
    }
    const parts = location.split(",");

    if (parts.length > 1) {
      const shortAddress = parts.slice(0, 2).join(", ");
      return (
        <div>
          {shortAddress.length > 10
            ? shortAddress.substring(0, 25) + "..."
            : shortAddress}
        </div>
      );
    }

    return (
      <div>
        {location.length > 15 ? location.substring(0, 25) + "..." : location}
      </div>
    );
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
                  color='primary w-md'
                  className='btn-rounded mb-2 me-2'
                  onClick={openCanvas}>
                  <i className='mdi mdi-plus-circle-outline me-1' />
                  Add New Store
                </Button>
              </div>
            </Col>
          </Row>
          <Offcanvas
            isOpen={canvasIsOpen}
            direction='end'
            toggle={() => setCanvasIsOpen(false)}>
            <OffcanvasHeader toggle={() => setCanvasIsOpen(false)}>
              Add Store
            </OffcanvasHeader>
            <OffcanvasBody>
              <Label className='form-label'>Store Name</Label>{" "}
              <span className='required-indicator' style={{ color: "#f46a6a" }}>
                *
              </span>
              <Input
                style={{
                  textTransform: "capitalize",
                }}
                className='mb-3'
                type='text'
                value={storeName}
                onChange={(e) => setStoreName(e.target.value)}
              />
              <Label className='form-label '>Store Location</Label>{" "}
              <span className='required-indicator' style={{ color: "#f46a6a" }}>
                *
              </span>
              <Input
                style={{
                  textTransform: "capitalize",
                }}
                className='mb-3'
                type='text'
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
              <Label className='form-label'>Store Phone</Label>{" "}
              <span className='required-indicator' style={{ color: "#f46a6a" }}>
                *
              </span>
              <Input
                type='number'
                className='mb-3'
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
              <Label className='form-label'>WebSite/Store Email</Label>{" "}
              <span className='required-indicator' style={{ color: "#f46a6a" }}>
                *
              </span>
              <Input
                type='text'
                className='mb-3'
                value={storeWebSite}
                onChange={(e) => setStoreWebSite(e.target.value)}
              />
              <Label>Job Title</Label>{" "}
              <span className='required-indicator' style={{ color: "#f46a6a" }}>
                *
              </span>
              <div className='form-label mb-3' style={{ color: "black" }}>
                <Input
                  type='select'
                  className='mb-3'
                  style={{ textTransform: "capitalize" }}
                  value={jobTitle}
                  onChange={(e) => setJobTitle(e.target.value)}>
                  <option value=''>Select Your Title</option>
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
                </Input>
              </div>
              <Label className='form-label'>Client Name</Label>{" "}
              <span className='required-indicator' style={{ color: "#f46a6a" }}>
                *
              </span>
              <Input
                type='select'
                className='mb-3'
                required='required'
                style={{ textTransform: "capitalize" }}
                value={newName}
                onChange={(e) => setNewName(e.target.value)}>
                <option value=''>Select Your Name</option>
                {clients.map((doc) => (
                  <option key={doc.id} value={doc.name}>
                    {doc.name}
                  </option>
                ))}
              </Input>
              <Label className='form-label'>Phone Number</Label>{" "}
              <span className='required-indicator' style={{ color: "#f46a6a" }}>
                *
              </span>
              <Input
                type='select'
                className='mb-3'
                required='required'
                style={{ textTransform: "capitalize" }}
                value={newPhone}
                onChange={(e) => setNewPhone(e.target.value)}>
                <option value=''>Select Your Phone</option>
                {clients.map((doc) => (
                  <option key={doc.id} value={doc.phone}>
                    {doc.phone}
                  </option>
                ))}
              </Input>
              <Label className='form-label'>Email address</Label>{" "}
              <span className='required-indicator' style={{ color: "#f46a6a" }}>
                *
              </span>
              <Input
                type='select'
                className='mb-3'
                required='required'
                style={{ textTransform: "capitalize" }}
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}>
                <option value=''>Select Your Email</option>
                {clients.map((doc) => (
                  <option key={doc.id} value={doc.email}>
                    {doc.email}
                  </option>
                ))}
              </Input>
            </OffcanvasBody>
            <div style={{ margin: "10px 0 10px 20px" }}>
              <Button
                className='btn-rounded'
                color='outline-success w-md'
                onClick={addStore}>
                Save
              </Button>
              <Button
                style={{ marginLeft: "9px" }}
                className='btn-rounded'
                color='outline-danger w-md'
                onClick={() => setCanvasIsOpen(false)}>
                Cancel
              </Button>
            </div>
          </Offcanvas>

          <Row>
            {map(stores, (doc) => {
              return (
                <Col xl='3' sm='6' key={doc.id}>
                  <Card className='text-center rounded-4'>
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
                        <Label
                          className='font-size-15 text-white mb-1'
                          style={{
                            textTransform: "uppercase",
                            fontWeight: "bold",
                          }}>
                          {doc.name}
                        </Label>
                      </div>

                      <div>
                        <h6
                          className='font-size-14 mb-1'
                          style={{
                            textTransform: "capitalize",
                          }}>
                          {shortLocation(doc.location)}
                        </h6>
                      </div>
                    </CardBody>

                    <CardFooter className='bg-transparent border-top'>
                      <div className='contact-links d-flex font-size-20'>
                        <div className='flex-fill'>
                          <Link
                            to={"/stores-grid/account-info/" + doc.id}
                            id={"detail" + doc.id}>
                            <i className='bx bxs-user-detail' />
                            <UncontrolledTooltip
                              onClick={() =>
                                getStore(`/stores-grid/account-info/${doc.id}`)
                              }
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
                              <DropdownItem
                                onClick={(e) => {
                                  getStore(doc.id);
                                  getClient(doc.id);
                                }}>
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
                        placeholder='Name'
                        style={{ textTransform: "capitalize" }}
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
                      <Label className='form-label'>Store Location</Label>
                      <Input
                        name='location'
                        placeholder='Location'
                        style={{ textTransform: "capitalize" }}
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
                      <Label className='form-label'>Store Phone</Label>
                      <Input
                        placeholder='Phone'
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
                      <Label className='form-label'>WebSite/Store Email</Label>
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
                    <div className='mb-3'>
                      <Label className='form-label'>Job Title</Label>
                      <Input
                        style={{ textTransform: "capitalize" }}
                        name='title'
                        label='select'
                        type='select'
                        onChange={validation.handleChange}
                        value={jobTitle}>
                        <option value=''>Please Select</option>
                        <option value='Owner'>Owner</option>
                        <option value='Assistant director'>
                          Assistant director
                        </option>
                        <option value='Senior manager'>Senior manager</option>
                        <option value='Manager'>Manager</option>
                        <option value='Assistant'>Assistant</option>
                        <option value='Supervisor'>Supervisor</option>
                        <option value='Senior'>Senior</option>
                        <option value='Coordinator'>Coordinator</option>
                        <option value='Team lead'>Team lead</option>
                        <option value='Lead'>Lead</option>
                      </Input>
                      {validation.touched.title && validation.errors.title ? (
                        <FormFeedback type='invalid'>
                          {validation.errors.title}
                        </FormFeedback>
                      ) : null}
                    </div>

                    <div className='mb-3'>
                      <Label className='form-label'>Client Name</Label>
                      <Input
                        required='required'
                        style={{ textTransform: "capitalize" }}
                        name='store'
                        label='select'
                        type='select'
                        onChange={(e) => setNewName(e.target.value)}
                        value={newName}>
                        <option value=''>Please Select</option>
                        {clients.map((doc) => (
                          <option key={doc.id} value={doc.name}>
                            {doc.name}
                          </option>
                        ))}
                      </Input>
                      {validation.touched.client && validation.errors.client ? (
                        <FormFeedback type='invalid'>
                          {validation.errors.client}
                        </FormFeedback>
                      ) : null}
                    </div>
                    <div className='mb-3'>
                      <Label className='form-label'>Phone Number</Label>
                      <Input
                        required='required'
                        style={{ textTransform: "capitalize" }}
                        name='store'
                        label='select'
                        type='select'
                        onChange={(e) => setNewPhone(e.target.value)}
                        value={newPhone}>
                        <option value=''>Please Select</option>
                        {clients.map((doc) => (
                          <option key={doc.id} value={doc.phone}>
                            {doc.phone}
                          </option>
                        ))}
                      </Input>
                      {validation.touched.clientPhone &&
                      validation.errors.clientPhone ? (
                        <FormFeedback type='invalid'>
                          {validation.errors.clientPhone}
                        </FormFeedback>
                      ) : null}
                    </div>
                    <div className='mb-3'>
                      <Label className='form-label'>Email</Label>
                      <Input
                        required='required'
                        style={{ textTransform: "capitalize" }}
                        name='store'
                        label='select'
                        type='select'
                        onChange={(e) => setNewEmail(e.target.value)}
                        value={newEmail}>
                        <option value=''>Please Select</option>
                        {clients.map((doc) => (
                          <option key={doc.id} value={doc.email}>
                            {doc.email}
                          </option>
                        ))}
                      </Input>
                      {validation.touched.clientEmail &&
                      validation.errors.clientEmail ? (
                        <FormFeedback type='invalid'>
                          {validation.errors.clientEmail}
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

          <Row>
            <Col>
              <div className='text-center my-4'>
                <JumpArrow />
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default withRouter(StoresGrid);
