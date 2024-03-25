import React, { useEffect, useState, useMemo } from "react";
import { withRouter } from "react-router-dom";
import Breadcrumbs from "../Breadcrumbs";
import { useFormik } from "formik";
import * as Yup from "yup";
import TableContainer from "../../CommonTable/TableContainer";
import {
  Button,
  Card,
  CardBody,
  CardTitle,
  Col,
  Container,
  Row,
  Modal,
  ModalBody,
  ModalHeader,
  Input,
  Label,
  Form,
  ModalFooter,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Badge,
} from "reactstrap";
import {
  MenuDataService,
  StoreDataService,
} from "../../helpers/firebase_helper";
import CreatableSelect from "react-select/creatable";

const MenuList = () => {
  document.title = "Menu List | Gars9n - Digital Menu & Ordering System";

  // State variables
  const [isEdit, setIsEdit] = useState(false);
  const [reload, setReload] = useState(false);
  const [modal, setModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [menus, setMenus] = useState([]);
  const [menuTags, setMenuTags] = useState(null);
  const [storeName, setStoreName] = useState("");
  const [stores, setStores] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [menuList, setMenuList] = useState([]);

  // Firestore service
  const menuDataService = new MenuDataService();
  const storeDataService = new StoreDataService();

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

  const validation = useFormik({
    enableReinitialize: true,
    initialValues: {
      id: "",
      tags: [],
    },
    validationSchema: Yup.object({
      tags: Yup.array()
        .min(1, "Please select at least one tag")
        .required("Tags are required"),
    }),
    onSubmit: async (values) => {
      if (isEdit) {
        const updatedMenu = {
          store: storeName,
          tags: values.tags.map((tags) => tags.value),
        };
        try {
          await menuDataService.updateMenuFirebase(values.id, updatedMenu);
          console.log(
            "Menu updated successfully!",
            values.id,
            "and updatedMenu:",
            updatedMenu
          );
          setReload(true);
          setModal(false);
          toggle();
        } catch (error) {
          console.error("Error update client", error);
        }
      }
    },
  });

  const handleMenuClick = () => {
    setMenuList("");
    setIsEdit(false);
    toggle();
  };

  const toggle = () => {
    if (modal) {
      setModal(false);
    } else {
      setModal(true);
      setIsEdit(true);
    }
  };

  // Delete Menu
  const deleteMenu = async (menuId) => {
    if (menuId) {
      try {
        await menuDataService.deleteMenuFirebase(deleteId);
        getMenus();
        setReload(true);
        console.log("menu delete successfully");
      } catch (error) {
        console.log("Error deleting menu", error);
      }
    }
    setDeleteId(null);
    setDeleteModal(false);
  };

  const handleDeleteMenu = async (id) => {
    if (id) {
      setDeleteId(id);
      setDeleteModal(true);
    }
  };

  // Get Menus
  const getMenus = async () => {
    const data = await menuDataService.getAllMenusFirebase();
    setMenus(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  // Refresh the page by AJAX
  useEffect(() => {
    if (reload) {
      getMenus();
      setReload(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reload]);

  useEffect(() => {
    getMenus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Get Menu
  const getMenu = async (id) => {
    try {
      const menuDoc = await menuDataService.getMenuFirebase(id);
      const menuData = menuDoc.data();
      console.log("get menu succses by id", id);
      console.log("get menu succses by menuData:", menuData);

      const formattedTags = menuData.tags.map((tags) => ({
        label: tags,
        value: tags,
      }));

      validation.setValues({
        ...validation.values,
        id: id,
        tags: formattedTags,
      });
      setStoreName(menuData.store);

      setReload(true);
      setModal(true);
      setIsEdit(true);
    } catch (error) {
      console.error("get menu error", error);
    }
  };

  // Add Menu
  const addMenus = async (e) => {
    e.preventDefault();
    if (menuTags && storeName) {
      const newMenu = {
        store: storeName,
        tags: menuTags.map((tags) => tags.value),
      };

      try {
        await menuDataService.addMenuFirebase(newMenu);
        setReload(true);
        console.log("new menu added successfully", newMenu);
      } catch (error) {
        console.error("error adding menu", error);
      }
      setModalIsOpen(false);
      setMenuTags([]);
      setStoreName("");
    }
  };

  const openModal = () => {
    setModalIsOpen(true);
  };

  const columns = useMemo(
    () => [
      {
        Header: "Stores",
        accessor: "store",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <div
              style={{
                textTransform: "capitalize",
                textAlign: "start",
                marginTop: "10px",
                color: "white",
                fontWeight: "bold",
              }}
            >
              {cellProps.value}
            </div>
          );
        },
      },
      {
        Header: "Tags",
        accessor: "tags",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <div
              style={{
                textAlign: "start",
                width: "40rem",
              }}
            >
              {cellProps.value.map((tags, index) => (
                <Badge
                  key={index}
                  style={{
                    textTransform: "capitalize",
                    marginTop: "10px",
                    marginRight: "5px",
                    color: "white",
                  }}
                  className={"font-size-12 badge-soft-secondary"}
                  pill
                >
                  {tags}
                </Badge>
              ))}
            </div>
          );
        },
      },
      {
        Header: "Action",
        Cell: (cellProps) => {
          return (
            <div className="flex-fill">
              <UncontrolledDropdown>
                <DropdownToggle href="#" className="card-drop" tag="i">
                  <i className="mdi mdi-dots-horizontal font-size-18" />
                </DropdownToggle>
                <DropdownMenu className="dropdown-menu-end">
                  <DropdownItem
                    onClick={(e) => {
                      const doc = cellProps.row.original;
                      getMenu(doc.id);
                    }}
                  >
                    <i className="mdi mdi-pencil font-size-16 text-success me-1" />
                    Edit
                  </DropdownItem>
                  <DropdownItem
                    onClick={(e) => {
                      const doc = cellProps.row.original;
                      handleDeleteMenu(doc.id);
                    }}
                  >
                    <i className="mdi mdi-trash-can font-size-16 text-danger me-1" />
                    Delete
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </div>
          );
        },
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const tagOptions = [
    { value: "Fast Food", label: "Fast Food" },
    { value: "Breakfast & Lunch", label: "Breakfast & Lunch" },
    { value: "American Food", label: "American Food" },
    { value: "Asian Food", label: "Asian Food" },
    { value: "Arabic Food", label: "Arabic Food" },
    { value: "Italian Food", label: "Italian Food" },
    { value: "Turkish Food", label: "Turkish Food" },
    { value: "Vegiterian Food", label: "Vegiterian Food" },
    { value: "Seafood", label: "Seafood" },
    { value: "Special children meals", label: "Special children meals" },
    { value: "Healthy Food", label: "Healthy Food" },
    { value: "Bakery", label: "Bakery" },
    { value: "Desserts", label: "Desserts" },
    { value: "Snacks", label: "Snacks" },
    { value: "Drinks", label: "Drinks" },
  ];

  const customStyles = {
    control: (provided) => ({
      ...provided,
      backgroundColor: "#32394e",
      color: "white",
      borderColor: "#32394e",
      "&:hover": {
        borderColor: "#32394e",
      },
    }),
    option: (provided) => ({
      ...provided,
      backgroundColor: "white",
      color: "black",
      "&:hover": {
        backgroundColor: "#007bff",
        color: "white",
      },
    }),
    multiValue: (provided) => ({
      ...provided,
      backgroundColor: "green",
      borderRadius: "30px",
      fontSize: "14px",
      textTransform: "capitalize",
    }),
    multiValueLabel: (provided) => ({
      ...provided,
      color: "white",
      paddingTop: "3px",
    }),
    multiValueRemove: (provided) => ({
      ...provided,
      color: "white",
      borderRadius: "50px",
      "&:hover": {
        backgroundColor: "white",
        color: "red",
      },
    }),
    input: (provided) => ({
      ...provided,
      color: "white",
    }),
    placeholder: (provided) => ({
      ...provided,
      color: "#bfc8e2",
    }),
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs title="Menus" BreadcrumbItem="All Categories" />
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
                  className="btn-rounded mb-4 me-2 "
                  onClick={openModal}
                >
                  Add Restaurants
                </Button>
              </div>
            </Col>
          </Row>

          <Modal isOpen={modalIsOpen} toggle={() => setModalIsOpen(false)}>
            <ModalHeader toggle={() => setModalIsOpen(false)}>
              Add Restaurants
            </ModalHeader>
            <ModalBody>
              <Label className="form-label">Please Pick a Restaurant</Label>
              <span
                className="required-indicator ms-1"
                style={{ color: "#dc3545" }}
              >
                *
              </span>
              <Input
                type="select"
                required={true}
                title="Please select your store name."
                style={{ textTransform: "capitalize" }}
                value={storeName}
                onChange={(e) => {
                  setStoreName(e.target.value);
                }}
              >
                <option value="">Choose here</option>
                {stores.map((doc) => (
                  <option key={doc.id} value={`${doc.name} - ${doc.branch}`}>
                    {`${doc.name} - ${doc.branch}`}
                  </option>
                ))}
              </Input>
            </ModalBody>
            <ModalBody>
              <Label className="form-label">Tags</Label>
              <span
                className="required-indicator ms-1"
                style={{ color: "#dc3545" }}
              >
                *
              </span>
              <CreatableSelect
                isMulti
                name="tags"
                options={tagOptions}
                styles={customStyles}
                className=" basic-multi-select"
                classNamePrefix="black select"
                value={menuTags}
                onChange={(selectedOptions) => setMenuTags(selectedOptions)}
                placeholder="Choose here"
              />
            </ModalBody>
            <ModalFooter>
              <Button
                className="btn-rounded w-md ms-2"
                color="primary"
                onClick={addMenus}
              >
                Create
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

          <Modal
            isOpen={deleteModal}
            toggle={() => setDeleteModal(false)}
            centered={true}
          >
            <ModalBody className="py-3 px-3">
              <Row>
                <Col sm={12}>
                  <div className="text-center">
                    <i
                      className="mdi mdi-trash-can-outline"
                      style={{ fontSize: "3em", color: "white" }}
                    />
                    <h4 style={{ fontWeight: "bold" }}>Delete Restaurant</h4>
                    <CardTitle>
                      {"Are you sure you want to delete this restaurant?"}
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
                      onClick={deleteMenu}
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
            <Col xs="12">
              <Card>
                <CardBody>
                  <TableContainer
                    columns={columns}
                    data={menus}
                    isGlobalFilter={true}
                    handleOrderClicks={handleMenuClick}
                    customPageSize={10}
                    className="custom-header-css text-center"
                  />
                  <Modal isOpen={modal} toggle={() => setModal(false)}>
                    <ModalHeader>Edit Restaurant</ModalHeader>
                    <ModalBody>
                      <Form onSubmit={validation.handleSubmit}>
                        <Row form>
                          <Col xs={12}>
                            <div className="mb-3">
                              <Label className="form-label">
                                Restaurant Name
                              </Label>
                              <Input
                                required={true}
                                style={{ textTransform: "capitalize" }}
                                name="store"
                                label="select"
                                type="select"
                                onChange={(e) => {
                                  setStoreName(e.target.value);
                                }}
                                value={storeName}
                              >
                                <option value="">Choose here</option>
                                {stores.map((doc) => (
                                  <option
                                    key={doc.id}
                                    value={`${doc.name} - ${doc.branch}`}
                                  >
                                    {`${doc.name} - ${doc.branch}`}
                                  </option>
                                ))}
                              </Input>
                            </div>

                            <div className="mb-3">
                              <Label className="form-label">
                                Restaurant Tags
                              </Label>
                              <CreatableSelect
                                required={true}
                                name="tags"
                                type="select"
                                isMulti
                                className="basic-multi-select"
                                classNamePrefix="select"
                                styles={customStyles}
                                options={tagOptions}
                                style={{ textTransform: "capitalize" }}
                                placeholder="Select or Create Tags"
                                onBlur={validation.handleBlur}
                                onChange={(formattedTags) => {
                                  validation.setFieldValue(
                                    "tags",
                                    formattedTags
                                  );
                                }}
                                value={validation.values.tags}
                              />
                            </div>
                          </Col>
                        </Row>
                      </Form>
                    </ModalBody>
                    <ModalFooter>
                      <Button
                        type="submit"
                        className="btn-rounded"
                        color="primary w-md"
                        onClick={() => validation.handleSubmit()}
                      >
                        Update
                      </Button>
                      <Button
                        style={{ backgroundColor: "#32394e" }}
                        className="btn-rounded"
                        color="primary w-md"
                        onClick={() => {
                          setModal(false);
                          validation.resetForm();
                        }}
                      >
                        Cancel
                      </Button>
                    </ModalFooter>
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

export default withRouter(MenuList);
