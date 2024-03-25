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
  CardTitle,
} from "reactstrap";
import { Link, withRouter } from "react-router-dom";
import { map } from "lodash";
import { useFormik } from "formik";
import * as Yup from "yup";
import Breadcrumbs from "../Breadcrumbs";
import {
  StoreDataService,
  ClientDataService,
} from "../../helpers/firebase_helper";
import { doc } from "firebase/firestore";
import JumpArrow from "./JumpArrow";
import spic from "../../assets/images/users/stores.png";

const StoresGrid = () => {
  document.title = "Stores | Gars9n - Digital Menu & Ordering System";

  const [deleteModal, setDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const [modal, setModal] = useState(false);
  const [reload, setReload] = useState(false);
  const [stores, setStores] = useState([]);
  const [storeName, setStoreName] = useState("");
  const [branch, setBranch] = useState("");
  // const [location, setLocation] = useState("");
  const [phone, setPhone] = useState([]);
  const [storeEmail, setStoreEmail] = useState("");
  const [clients, setClients] = useState([]);
  const [newName, setNewName] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [emailError, setEmailError] = useState("");

  // Firestore service
  const storeDataService = new StoreDataService();
  const clientDataService = new ClientDataService();

  // Add Store
  const addStore = async (e) => {
    e.preventDefault();
    if (
      storeName &&
      // && location
      phone &&
      storeEmail &&
      newName &&
      branch
    ) {
      try {
        // const { lat, lng } = await storeDataService.geocode(location);

        const newStore = {
          name: storeName,
          branch: branch,
          // location: location,
          phone: phone,
          email: storeEmail,
          // latitude: lat,
          // longitude: lng,
          client: newName,
        };
        // console.log("Latitude:", lat, "Longitude:", lng);

        await storeDataService.addStoreFirebase(newStore);
        setReload(true);
        // console.log("New store added successfully!", newStore);
      } catch (error) {
        // console.log("Error adding store:", error);
        console.error(error);
      }

      setModalIsOpen(false);
      setStoreName("");
      // setLocation("");
      setPhone([]);
      setStoreEmail("");
      setNewName("");
      setBranch("");
    }
  };

  const openModal = () => {
    setModalIsOpen(true);
    setStoreName("");
    // setLocation("");
    setPhone([]);
    setStoreEmail("");
    setNewName("");
    setBranch("");
  };

  // Update Store
  const validation = useFormik({
    enableReinitialize: true,
    initialValues: {
      id: "",
      name: "",
      location: "",
      phone: "",
      email: "",
      branch: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Please Enter Your Store Name"),
      branch: Yup.string().required("Please Enter Your Branch Name"),
      location: Yup.string().required("Please Enter Your Store Address"),
      phone: Yup.number(1234567890).required("Please Enter Your Store Number"),
      email: Yup.string()
        .email()
        .required("Please Enter Your Store Email")
        .max(255),
    }),
    onSubmit: async (values) => {
      // console.log("Updating store with id:", values.id);
      // console.log("New name:", values.name);
      // console.log("New location:", values.location);
      // console.log("phone:", values.phone);
      // console.log("email:", values.email);

      if (
        !values.id ||
        !values.name ||
        !values.location ||
        !values.phone ||
        !values.email ||
        !values.branch
      ) {
        // console.error("Invalid data provided for store update");
        return;
      }

      if (isEdit) {
        // Maps
        const { lat, lng } = await storeDataService.geocode(values.location);

        const updatedStore = {
          name: values.name,
          branch: values.branch,
          location: values.location,
          phone: values.phone,
          email: values.email,
          latitude: lat,
          longitude: lng,
          client: newName,
        };

        try {
          await storeDataService.updateStoreFirebase(values.id, updatedStore);
          // console.log(
          //   "Store updated successfully!",
          //   values.id,
          //   "and updatedStore:",
          //   updatedStore
          // );
          setReload(true);
          setModal(false);
          toggle();
        } catch (error) {
          // console.log("Error updated store:", error);
          console.error(error);
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

  // Delete store
  const deleteStore = async (storeId) => {
    if (storeId) {
      try {
        await storeDataService.deleteStoreFirebase(deleteId);
        getStores();
        setReload(true);
        // console.log("store deleted successfully!");
      } catch (error) {
        // console.error("Error deleting store", error);
        console.error(error);
      }
    }
    setDeleteId(null);
    setDeleteModal(false);
  };

  const handleDeleteStore = async (id) => {
    if (id) {
      setDeleteId(id);
      setDeleteModal(true);
    }
  };

  // Get Stores
  const getStores = async () => {
    const data = await storeDataService.getAllStoresFirebase();
    const stortStores = data.docs
      .map((doc) => ({ ...doc.data(), id: doc.id }))
      // .sort((a, b) => a.name.localeCompare(b.name));
      .sort((a, b) => {
        const nameA = a.name || "";
        const nameB = b.name || "";
        return nameA.localeCompare(nameB);
      });
    setStores(stortStores);
  };

  // Refresh the page by AJAX
  useEffect(() => {
    if (reload) {
      getStores();
      setReload(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reload]);

  useEffect(() => {
    getStores();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Get Store
  const getStore = async (id) => {
    try {
      const storeDoc = await storeDataService.getStoreFirebase(id);
      const storeData = storeDoc.data();
      // console.log("get store succses by id:", id);
      // console.log("get store succses by storeData:", storeData);

      validation.setValues({
        id: id,
        name: storeData.name,
        branch: storeData.branch,
        location: storeData.location,
        phone: storeData.phone,
        email: storeData.email,
      });
      setNewName(storeData.client);

      setModal(true);
      setIsEdit(true);
      setReload(true);
    } catch (error) {
      // console.log("get store error:", error);
      console.error(error);
    }
  };

  // get Clients
  const getClients = async () => {
    const data = await clientDataService.getAllClientsFirebase();
    setClients(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  useEffect(() => {
    getClients();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Short name
  const shortName = (shortname) => {
    if (!shortname || typeof shortname !== "string") {
      return <div>{doc.shortname}</div>;
    }
    const parts = shortname.split(",");

    if (parts.length > 1) {
      const shortAddress = parts.slice(0, 2).join(", ");
      return (
        <div>
          {shortAddress.length > 10
            ? shortAddress.substring(0, 17) + ""
            : shortAddress}
        </div>
      );
    }

    return (
      <div>
        {shortname.length > 18 ? shortname.substring(0, 18) + "..." : shortname}
      </div>
    );
  };

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
    if (!isEmailValid(storeEmail)) {
      setStoreEmail("");
    }
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs title="Stores" BreadcrumbItem="Stores Grid" />
          <Row>
            <Col sm="12">
              <div className="text-sm-end">
                <Button
                  color="primary w-md"
                  style={{
                    backgroundColor: "#B79A6D",
                    borderColor: "#B79A6D",
                    fontWeight: "bold",
                  }}
                  className="btn-rounded mb-4 me-2"
                  onClick={openModal}
                >
                  Add Stores
                </Button>
              </div>
            </Col>
          </Row>

          <Modal isOpen={modalIsOpen} toggle={() => setModalIsOpen(false)}>
            <ModalHeader>Add Stores</ModalHeader>
            <ModalBody>
              <Label className="form-label">Store Name</Label>
              <span
                className="required-indicator ms-1"
                style={{ color: "#dc3545" }}
              >
                *
              </span>
              <Input
                placeholder="Enter your store name"
                type="text"
                value={storeName}
                onChange={(e) => {
                  const inputValue = e.target.value;
                  const validInput = inputValue.replace(/[^a-zA-Z\s]/g, "");
                  setStoreName(validInput);
                }}
                required={true}
                title="Please enter your store name."
              />
            </ModalBody>
            <ModalBody>
              <Label className="form-label">Branch</Label>
              <span
                className="required-indicator ms-1"
                style={{ color: "#dc3545" }}
              >
                *
              </span>
              <Input
                placeholder="Enter your branch name"
                type="text"
                value={branch}
                onChange={(e) => setBranch(e.target.value)}
                required={true}
                title="Please enter your branch no. or name."
              />
            </ModalBody>
            <ModalBody>
              <Label className="form-label">Store Address</Label>
              <span
                className="required-indicator ms-1"
                style={{ color: "#dc3545" }}
              >
                *
              </span>
              <Input
                placeholder="Enter your store address"
                type="text"
                // value={location}
                // onChange={(e) => setLocation(e.target.value)}
                // required={true}
                title="Please enter only store address."
              />
            </ModalBody>
            <ModalBody>
              <Label className="form-label">Store Phone</Label>
              <span
                className="required-indicator ms-1"
                style={{ color: "#dc3545" }}
              >
                *
              </span>
              <Input
                type="tel"
                placeholder="Enter your store number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required={true}
                pattern="\d{1,11}"
                title="Please enter only store number."
                min="0"
                maxLength="11"
              />
            </ModalBody>
            <ModalBody>
              <Label className="form-label">Store Email</Label>
              <span
                className="required-indicator ms-1"
                style={{ color: "#dc3545" }}
              >
                *
              </span>
              <Input
                type="text"
                placeholder="Enter your store email"
                value={storeEmail}
                onChange={(e) => setStoreEmail(e.target.value)}
                required={true}
                title="Please enter only store email."
                onBlur={handleEmailBlur}
              />
            </ModalBody>
            <ModalBody>
              <Label className="form-label">Client Name</Label>
              <span
                className="required-indicator ms-1"
                style={{ color: "#dc3545" }}
              >
                *
              </span>
              <Input
                type="select"
                className="mb-3"
                required={true}
                title="Please select your name."
                style={{ textTransform: "capitalize" }}
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
              >
                <option value="">Choose here</option>
                {clients.map((doc) => (
                  <option key={doc.id} value={doc.id}>
                    {`${doc.name} - ${doc.title}`}
                  </option>
                ))}
              </Input>
            </ModalBody>
            <ModalFooter>
              <Button
                className="btn-rounded w-md"
                color="primary"
                onClick={addStore}
              >
                Save
              </Button>
              <Button
                style={{ backgroundColor: "#32394e" }}
                className="btn-rounded w-md"
                color="primary"
                onClick={() => setModalIsOpen(false)}
              >
                Cancel
              </Button>
            </ModalFooter>
          </Modal>

          {/* Delete Pop-Up */}
          <Modal
            isOpen={deleteModal}
            toggle={() => setDeleteModal(false)}
            centered={true}
          >
            <ModalBody className="py-3 px-5">
              <Row>
                <Col sm={12}>
                  <div className="text-center">
                    <i
                      className="mdi mdi-trash-can-outline"
                      style={{ fontSize: "3em", color: "white" }}
                    />
                    <h4 style={{ fontWeight: "bold" }}>Delete store?</h4>
                    <CardTitle>
                      {"Are you sure you want to delete this store?"}
                    </CardTitle>
                  </div>
                </Col>
              </Row>
              <Row>
                <Col>
                  <div className="text-center mt-3">
                    <button
                      type="button"
                      className="btn btn-danger btn-rounded btn-lg ms-2"
                      onClick={deleteStore}
                    >
                      Yes, I'm sure
                    </button>
                    <button
                      style={{ borderColor: "#007bff" }}
                      type="button"
                      className="btn btn-light btn-rounded btn-lg ms-2"
                      onClick={() => setDeleteModal(false)}
                    >
                      No, Cancel
                    </button>
                  </div>
                </Col>
              </Row>
            </ModalBody>
          </Modal>

          <Row>
            {map(stores, (doc) => {
              return (
                <Col xl="3" sm="6" key={doc.id}>
                  <Card className="text-center rounded-4">
                    <CardBody>
                      <div className="avatar-sm mx-auto mb-4">
                        <span
                          style={{
                            textTransform: "uppercase",
                            paddingTop: "4px",
                          }}
                          className={
                            "avatar-title rounded-circle bg-soft bg-" +
                            doc.color +
                            " text-" +
                            doc.color +
                            " font-size-16"
                          }
                        >
                          <img
                            className="rounded-circle avatar-sm"
                            src={spic}
                            alt=""
                          />
                        </span>
                      </div>

                      <div>
                        <Label
                          className="font-size-15 text-white mb-1"
                          style={{
                            textTransform: "capitalize",
                            fontWeight: "bold",
                          }}
                        >
                          {shortName(doc.name)}
                        </Label>
                      </div>

                      <div>
                        <h6
                          className="font-size-14 mb-1"
                          style={{
                            textTransform: "capitalize",
                          }}
                        >
                          {shortName(doc.branch)}
                        </h6>
                      </div>
                    </CardBody>

                    <CardFooter className="bg-transparent border-top">
                      <div className="contact-links d-flex font-size-20">
                        <div className="flex-fill">
                          <Link
                            to={`/stores-grid/account-info/${doc.id}?c=${doc.client}`}
                            id={`detail${doc.id}`}
                          >
                            <i className="bx bxs-user-detail" />
                            <UncontrolledTooltip
                              onClick={() =>
                                getStore(
                                  `/stores-grid/account-info/${doc.id}?c=${doc.client}`
                                )
                              }
                              placement="top"
                              target={`detail${doc.id}`}
                            >
                              Account Info
                            </UncontrolledTooltip>
                          </Link>
                        </div>

                        <div className="flex-fill">
                          <Link
                            to={"/stores-grid/store-details/" + doc.id}
                            id={"profile" + doc.id}
                          >
                            <i className="bx bx-store" />
                            <UncontrolledTooltip
                              onClick={() =>
                                getStore(`/stores-grid/store-details/${doc.id}`)
                              }
                              placement="top"
                              target={"profile" + doc.id}
                            >
                              Store Details
                            </UncontrolledTooltip>
                          </Link>
                        </div>

                        <div className="flex-fill">
                          <Link
                            to={"/stores-grid/store-menu/" + doc.id}
                            id={"menu" + doc.id}
                          >
                            <i className="bx bx-food-menu" />
                            <UncontrolledTooltip
                              onClick={() =>
                                getStore("/stores-grid/store-menu/" + doc.id)
                              }
                              placement="top"
                              target={"menu" + doc.id}
                            >
                              Store Menu
                            </UncontrolledTooltip>
                          </Link>
                        </div>

                        {/* EDIT & DELETE */}
                        <div className="flex-fill">
                          <UncontrolledDropdown>
                            <DropdownToggle
                              href="#"
                              className="card-drop"
                              tag="i"
                            >
                              <i className="mdi mdi-dots-horizontal font-size-18" />
                            </DropdownToggle>
                            <DropdownMenu className="dropdown-menu-end">
                              <DropdownItem onClick={() => getStore(doc.id)}>
                                <i className="mdi mdi-pencil font-size-16 text-success me-1" />{" "}
                                Edit
                              </DropdownItem>
                              <DropdownItem
                                onClick={() => handleDeleteStore(doc.id)}
                              >
                                <i className="mdi mdi-trash-can font-size-16 text-danger me-1" />{" "}
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
            {/* <ModalHeader>{isEdit ? "Edit Store" : "Add Store"}</ModalHeader> */}
            <ModalHeader>Edit Store</ModalHeader>
            <ModalBody>
              <Form
                onSubmit={(e) => {
                  e.preventDefault();
                  validation.handleSubmit();
                  return false;
                }}
              >
                <Row form>
                  <Col className="col-12">
                    <div className="mb-3">
                      <Label className="form-label">Store Name</Label>
                      <Input
                        id="name"
                        style={{ textTransform: "capitalize" }}
                        name="name"
                        type="text"
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
                        <FormFeedback type="invalid">
                          {validation.errors.name}
                        </FormFeedback>
                      ) : null}
                    </div>
                    <div className="mb-3">
                      <Label className="form-label">Branch</Label>
                      <Input
                        id="branch"
                        style={{ textTransform: "capitalize" }}
                        name="branch"
                        type="text"
                        onChange={validation.handleChange}
                        onBlur={validation.handleBlur}
                        value={validation.values.branch}
                        invalid={
                          validation.touched.branch && validation.errors.branch
                            ? true
                            : false
                        }
                      />
                      {validation.touched.branch && validation.errors.branch ? (
                        <FormFeedback type="invalid">
                          {validation.errors.branch}
                        </FormFeedback>
                      ) : null}
                    </div>

                    <div className="mb-3">
                      <Label className="form-label">Store Address</Label>
                      <Input
                        name="location"
                        style={{ textTransform: "capitalize" }}
                        type="text"
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
                        <FormFeedback type="invalid">
                          {validation.errors.location}
                        </FormFeedback>
                      ) : null}
                    </div>

                    <div className="mb-3">
                      <Label className="form-label">Store Phone</Label>
                      <Input
                        name="phone"
                        label="Phone"
                        min="0"
                        maxLength="11"
                        pattern="\d{1,11}"
                        type="tel"
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
                        <FormFeedback type="invalid">
                          {validation.errors.phone}
                        </FormFeedback>
                      ) : null}
                    </div>

                    <div className="mb-3">
                      <Label className="form-label">Store Email</Label>
                      <Input
                        name="email"
                        type="text"
                        onChange={validation.handleChange}
                        onBlur={validation.handleBlur}
                        value={validation.values.email}
                        invalid={
                          validation.touched.email && validation.errors.email
                            ? true
                            : false
                        }
                      />
                      {validation.touched.email && validation.errors.email}
                    </div>
                    <div className="mb-3">
                      <Label className="form-label">Client Name</Label>
                      <Input
                        required={true}
                        style={{ textTransform: "capitalize" }}
                        name="store"
                        label="select"
                        type="select"
                        onChange={(e) => setNewName(e.target.value)}
                        value={newName}
                      >
                        <option value="">Choose here</option>
                        {clients.map((doc) => (
                          <option key={doc.id} value={doc.id}>
                            {`${doc.name} - ${doc.title}`}
                          </option>
                        ))}
                      </Input>
                    </div>
                  </Col>
                </Row>
              </Form>
            </ModalBody>
            <ModalFooter>
              <Button
                className="btn-rounded w-md"
                type="submit"
                color="primary"
                onClick={() => validation.handleSubmit()}
              >
                Update
              </Button>
              <Button
                style={{ backgroundColor: "#32394e" }}
                className="btn-rounded"
                color="primary w-md ms-2"
                onClick={() => {
                  setModal(false);
                  validation.resetForm();
                }}
              >
                Cancel
              </Button>
            </ModalFooter>
          </Modal>

          {/* Jump Up */}
          <Row>
            <Col>
              <div className="text-center my-4">
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
