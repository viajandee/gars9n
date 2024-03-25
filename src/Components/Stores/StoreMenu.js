import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  CardImg,
  CardTitle,
  CardText,
  Button,
  CardBody,
  Label,
  Input,
  DropdownToggle,
  UncontrolledDropdown,
  DropdownMenu,
  DropdownItem,
  ModalFooter,
  CardSubtitle,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormFeedback,
} from "reactstrap";
import Breadcrumbs from "Components/Breadcrumbs";
import { useFormik } from "formik";
import * as Yup from "yup";
import { StoreDataService } from "../../helpers/firebase_helper";
import JumpArrow from "./JumpArrow";
import pic from "assets/images/sidebar/img4.jpg";
import { useParams } from "react-router-dom";

const StoreMenu = () => {
  document.title = "Store Menu | Gars9n - Digital Menu & Ordering System";

  const [open, setOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [isEditCat, setIsEditCat] = useState(false);
  const [reload, setReload] = useState(false);
  const [reloadCategory, setReloadCategory] = useState(false);
  const [modal, setModal] = useState(false);
  const [categoryName, setCategoryName] = useState("");
  const [itemName, setItemName] = useState("");
  const [itemPrice, setItemPrice] = useState("");
  // const [itemPic, setItemPic] = useState("");
  const [itemDesc, setItemDesc] = useState("");
  const [deleteItemModal, setDeleteItemModal] = useState(false);
  const [deleteCategoryModal, setDeleteCategoryModal] = useState(false);
  const [items, setItems] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalAddItem, setModalAddItem] = useState(false);
  const [categories, setCategories] = useState([]);
  const [deleteId, setDeleteId] = useState(null);

  const { id } = useParams();

  // Firebase
  const storeDataService = new StoreDataService();

  //  TODO: Add Category
  const addCategory = async (e) => {
    e.preventDefault();
    if (id && categoryName) {
      const newCategories = {
        category: categoryName,
      };

      try {
        await storeDataService.addCategoriesFirebase(id, newCategories);
        console.log("New category added successfully", newCategories);
        setReloadCategory(true);
      } catch (error) {
        console.error("Error adding category:", error);
      }
      setCategoryName("");
      setOpen(false);
    }
  };

  const openCategoryModal = () => {
    setOpen(true);
    setCategoryName("");
  };

  // Update Category
  const categoryValidation = useFormik({
    enableReinitialize: true,
    initialValues: {
      id: "",
      category: "",
    },
    validationSchema: Yup.object({
      category: Yup.string().required("Please Enter Your Category Name"),
    }),
    onSubmit: async (values) => {
      console.log("Updated Category With ID", values.id);
      console.log("Update Category", values.category);

      if (isEditCat) {
        const updateCategory = {
          category: values.category,
        };

        if (!values.id || !values.category) {
          console.error("Invalid data provided for category Updated");
          return;
        }

        try {
          await storeDataService.updateCategoriesFirebase(
            values.id,
            updateCategory
          );
          console.log(
            "category updated successfully",
            values.id,
            "and updatedCategory",
            updateCategory
          );
          setReloadCategory(true);
          setModalIsOpen(false);
          toggleEdit();
        } catch (error) {
          console.error("Error Updated Category", error);
        }
      }
    },
  });

  const toggleEdit = () => {
    if (modalIsOpen) {
      setModalIsOpen(false);
    } else {
      setModalIsOpen(true);
      setIsEditCat(true);
    }
  };

  // Delete Category

  const deleteCategory = async () => {
    try {
      await storeDataService.deleteCategoriesFirebase(deleteId);
      setReloadCategory(true);
      getCategories();
      console.log("Category deleted successfully", deleteId);
    } catch (error) {
      console.error("Error deleting category", error);
    }
    setDeleteId(null);
    setDeleteCategoryModal(false);
  };

  const handleDeleteCategory = async (id) => {
    if (id) {
      setDeleteId(id);
      setDeleteCategoryModal(true);
    }
  };

  // Get All Categories
  const getCategories = async () => {
    try {
      const querySnapshotCat = await storeDataService.getAllCategoriesFirebase(
        id
      );
      const categoriesIDs = querySnapshotCat.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      console.log("categories IDs : ", categoriesIDs);
      setCategories(categoriesIDs);
    } catch (error) {
      console.error("Error getting categories:", error);
      throw error;
    }
  };

  useEffect(() => {
    getCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Refresh the page by AJAX for category
  useEffect(() => {
    if (reloadCategory) {
      getCategories();
      setReloadCategory(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reloadCategory]);

  //  Get category
  const getCategory = async (id) => {
    try {
      const categoryDoc = await storeDataService.getCategoryFirebase(id);
      const categoryData = categoryDoc.data();
      console.log("get category success by id", id);
      console.log("get category success by category Data", categoryData);

      categoryValidation.setValues({
        id: id,
        category: categoryData.category,
      });

      setModalIsOpen(true);
      setIsEditCat(true);
      setReloadCategory(true);
    } catch (error) {
      console.error("Get category error", error);
    }
  };

  // TODO: Add Items
  const addItems = async (e) => {
    e.preventDefault();
    if (itemName && itemDesc && itemPrice && categoryName) {
      const itemData = {
        name: itemName,
        price: itemPrice,
        // image: itemPic,
        description: itemDesc,
        category: categoryName,
      };

      try {
        await storeDataService.addItemsFirebase(itemData);
        setReload(true);
        console.log("New Item Added Successfuly", itemData);
      } catch (error) {
        console.error("Error adding Item", error);
      }

      setItemName("");
      setItemPrice("");
      // setItemPic("");
      setItemDesc("");
      setModalAddItem(false);
    }
  };

  const openAddNewItemModal = () => {
    setModalAddItem(true);
  };

  // Upadte Items
  const itemValidation = useFormik({
    enableReinitialize: true,
    initialValues: {
      id: "",
      name: "",
      price: "",
      description: "",
      // image: '',
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Please Enter Your Item Name"),
      price: Yup.string().required("Please Enter Your Price Item"),
      description: Yup.string().required("Please Enter Your Description"),
    }),
    onSubmit: async (values) => {
      console.log("Updated Item With ID", values.id);
      console.log("Update Item name", values.name);
      console.log("Update Price", values.price);
      console.log("Update Picture", values.image);
      console.log("Update Description", values.description);

      if (
        !values.id ||
        !values.name ||
        !values.price ||
        // !values.image ||
        !values.description
      ) {
        console.error("Invalid data provided for Item Updated");
        return;
      }

      if (isEdit) {
        const updatedItem = {
          name: values.name,
          price: values.price,
          // image: values.image,
          description: values.description,
        };

        try {
          await storeDataService.updateItemsFirebase(values.id, updatedItem);
          console.log(
            "Item updated successfully",
            values.id,
            "and updatedItemData",
            updatedItem
          );
          setReload(true);
          setModal(false);
          toggle();
        } catch (error) {
          console.error("Error Updated Item", error);
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

  // Delete Item
  const deleteItem = async (itemId) => {
    if (itemId) {
      try {
        // await storeDataService.deleteItemsFirebase(deleteId);
        setReload(true);
        getItems();
        // console.log("Item deleted successfuly", deleteId);
      } catch (error) {
        console.error("Error deleting Item", error);
      }
      // setDeleteId(null);
      setDeleteItemModal(false);
    }
  };

  const handleDeleteItem = async (id) => {
    if (id) {
      // setDeleteId(id);
      setDeleteItemModal(true);
    }
  };

  // Get Items
  const getItems = async () => {
    try {
      const querySnapshot = await storeDataService.getAllItemsFirebase();
      const data = [];
      querySnapshot.docs.forEach((itm) => {
        data.push({ id: itm.id, ...itm.data() });
      });
      setItems(data);
    } catch (error) {
      console.error("Error getting items:", error);
    }
  };

  useEffect(() => {
    getItems();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Refresh the page by AJAX for Items
  useEffect(() => {
    if (reload) {
      getItems();
      setReload(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reload]);

  // Get Item
  const getItem = async (id) => {
    try {
      const itemDoc = await storeDataService.getItemFirebase(id);
      const itemData = itemDoc.data();
      console.log("get item success by id", id);
      console.log("get item success by itemData", itemData);

      itemValidation.setValues({
        id: id,
        name: itemData.name,
        price: itemData.price,
        image: itemData.image,
        description: itemData.description,
      });

      setModal(true);
      setIsEdit(true);
      setReload(true);
    } catch (error) {
      console.error("get Item error", error);
    }
  };

  // Short name
  // const shortName = (shortname) => {
  //   if (!shortname || typeof shortname !== "string") {
  //     return <div>{doc.shortname}</div>;
  //   }
  //   const parts = shortname.split(",");

  //   if (parts.length > 1) {
  //     const shortAddress = parts.slice(0, 2).join(", ");
  //     return (
  //       <div>
  //         {shortAddress.length > 123
  //           ? shortAddress.substring(0, 125) + "..."
  //           : shortAddress}
  //       </div>
  //     );
  //   }

  //   return (
  //     <div>
  //       {shortname.length > 123
  //         ? shortname.substring(0, 125) + "..."
  //         : shortname}
  //     </div>
  //   );
  // };

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs title="Stores Grid" BreadcrumbItem="Store Menu" />
          {/* Add Item Button */}
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
                  onClick={openCategoryModal}
                >
                  Add Categories
                </Button>
              </div>
            </Col>
          </Row>
          {/*=== Add Item Button ===*/}

          {/* Category Title & Edit, Delete Category Buttons */}
          {categories
            // .filter((doc) => doc.category)
            // .sort((a, b) => a.category.localeCompare(b.category))
            // .sort((a, b) => (a.category || "").localeCompare(b.category || ""))
            .map((doc) => (
              <div key={doc.id}>
                <div className="mb-3">
                  <Label
                    className="font-size-15 text-white"
                    style={{
                      textTransform: "capitalize",
                      fontWeight: "bold",
                    }}
                  >
                    {doc.category}
                  </Label>
                  <Button
                    onClick={() => handleDeleteCategory(doc.id)}
                    className="btn-rounded ms-2"
                    color="outline-danger"
                    title="Delete Category"
                    disabled={
                      items.filter((itm) => itm.category === doc.id).length > 0
                    }
                  >
                    <i className="mdi mdi-trash-can" />
                  </Button>
                  <Button
                    onClick={() => getCategory(doc.id)}
                    className="btn-rounded ms-2"
                    color="outline-success"
                    title="Edit Category"
                  >
                    <i className="bx bx-edit-alt" />
                  </Button>
                  <Button
                    onClick={openAddNewItemModal}
                    className="btn-rounded ms-2"
                    color="outline-primary"
                    title="Add Items"
                    style={{ paddingTop: "8px" }}
                  >
                    <i className="bx bxs-add-to-queue" />
                  </Button>
                </div>

                {/* Display cards for the current category */}
                <Row>
                  {items
                    .filter((itm) => itm.category === doc.id)
                    .map((itm) => (
                      <Col md="6" key={itm.id}>
                        <Card className=" rounded-4">
                          <Row>
                            <Col md="6" sm="8">
                              <CardBody
                                style={{ height: "185px", overflowY: "auto" }}
                              >
                                <CardTitle
                                  tag="h5"
                                  className="mb-3"
                                  style={{
                                    textTransform: "capitalize",
                                  }}
                                >
                                  {itm.name}
                                </CardTitle>
                                <CardSubtitle
                                  className="mb-2"
                                  tag="h5"
                                  style={{ color: "white" }}
                                >
                                  {itm.price} EGP
                                </CardSubtitle>
                                <CardText
                                  style={{
                                    textTransform: "capitalize",
                                  }}
                                >
                                  {itm.description}
                                </CardText>
                              </CardBody>
                            </Col>
                            <Col>
                              <CardImg
                                className="rounded-4"
                                alt="Image"
                                src={pic}
                                // src={itm.image}
                                right
                                style={{
                                  objectFit: "cover",
                                  width: "100%",
                                  height: "100%",
                                }}
                              />
                              <UncontrolledDropdown
                                style={{
                                  borderRadius: "30px",
                                  position: "absolute",
                                  top: "65%",
                                  left: "77%",
                                  margin: "auto",
                                }}
                              >
                                <DropdownToggle
                                  color="outline-secondary"
                                  style={{
                                    paddingTop: "10px",
                                    borderRadius: "30px",
                                  }}
                                >
                                  <i className="bx bx-dots-vertical-rounded" />
                                </DropdownToggle>
                                <DropdownMenu>
                                  <DropdownItem
                                    onClick={(e) => getItem(itm.id)}
                                  >
                                    <i className="mdi mdi-pencil font-size-16 text-success me-3" />
                                    Edit
                                  </DropdownItem>
                                  <DropdownItem
                                    onClick={() => handleDeleteItem(itm.id)}
                                  >
                                    <i className="mdi mdi-trash-can font-size-16 text-danger me-3" />
                                    Delete
                                  </DropdownItem>
                                </DropdownMenu>
                              </UncontrolledDropdown>
                            </Col>
                          </Row>
                        </Card>
                      </Col>
                    ))}
                </Row>
              </div>
            ))}
          {/* Category Title & Edit, Delete Category Buttons */}

          {/* Add Category Modal */}
          <Modal centered={true} isOpen={open} toggle={() => setOpen(false)}>
            <ModalHeader>Add Category</ModalHeader>
            <ModalBody className="mb-3">
              <Label className="form-label">Category</Label>
              <span
                className="required-indicator ms-1"
                style={{ color: "#dc3545" }}
              >
                *
              </span>
              <Input
                type="text"
                required={true}
                style={{ textTransform: "capitalize" }}
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
              />
            </ModalBody>
            <ModalFooter>
              <Button
                className="btn-rounded w-md"
                color="primary"
                onClick={addCategory}
              >
                Save
              </Button>
              <Button
                style={{
                  backgroundColor: "#32394e",
                  transition: "transform 0.5s ease-out",
                }}
                className="btn-rounded w-md ms-2"
                color="primary"
                onClick={() => setOpen(false)}
              >
                Cancel
              </Button>
            </ModalFooter>
          </Modal>
          {/*=== Add Category Modal ===*/}

          {/* Edit Category Modal */}
          <Modal
            centered
            isOpen={modalIsOpen}
            toggle={() => setModalIsOpen(false)}
          >
            <ModalHeader>Edit Category</ModalHeader>
            <ModalBody>
              <Form
                onSubmit={(e) => {
                  e.preventDefault();
                  categoryValidation.handleSubmit();
                  return false;
                }}
              >
                <Row form>
                  <Col>
                    <div className="mb-3">
                      <Label className="form-label">Category</Label>
                      <Input
                        id="category"
                        type="text"
                        name="category"
                        value={categoryValidation.values.category}
                        onChange={categoryValidation.handleChange}
                        onBlur={categoryValidation.handleBlur}
                        invalid={
                          categoryValidation.touched.category &&
                          categoryValidation.errors.category
                            ? true
                            : false
                        }
                      />
                      {categoryValidation.touched.category &&
                      categoryValidation.errors.category ? (
                        <FormFeedback type="invalid">
                          {categoryValidation.errors.category}
                        </FormFeedback>
                      ) : null}
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
                onClick={() => categoryValidation.handleSubmit()}
              >
                Update
              </Button>
              <Button
                style={{ backgroundColor: "#32394e" }}
                className="btn-rounded w-md ms-2"
                color="primary"
                onClick={() => {
                  setModalIsOpen(false);
                  categoryValidation.resetForm();
                }}
              >
                Cancel
              </Button>
            </ModalFooter>
          </Modal>
          {/*===  Edit Category Modal ===*/}

          {/* Delete Category Modal*/}
          <Modal
            isOpen={deleteCategoryModal}
            toggle={() => setDeleteCategoryModal(false)}
            centered={true}
          >
            <ModalBody>
              <Row>
                <Col sm={12}>
                  <div className="text-center">
                    <i
                      className="mdi mdi-trash-can-outline"
                      style={{ fontSize: "3em", color: "white" }}
                    />
                    <h4 style={{ fontWeight: "bold" }}>Delete Category</h4>
                    <CardTitle>
                      {"Are you sure you want to delete this Category?"}
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
                      onClick={deleteCategory}
                    >
                      Yes, I'm sure
                    </button>
                    <button
                      style={{ borderColor: "#007bff" }}
                      type="button"
                      className="btn btn-light btn-rounded btn-lg ms-2"
                      onClick={() => setDeleteCategoryModal(false)}
                    >
                      No, Cancel
                    </button>
                  </div>
                </Col>
              </Row>
            </ModalBody>
          </Modal>
          {/*=== Delete Category Modal ===*/}

          {/* FIXME: Add Items Modal */}
          <Modal isOpen={modalAddItem} toggle={() => setModalAddItem(false)}>
            <ModalHeader>Add Items</ModalHeader>
            <ModalBody>
              <Label className="form-label">Category</Label>
              <span
                className="required-indicator ms-1"
                style={{ color: "#dc3545" }}
              >
                *
              </span>
              <Input
                type="select"
                value={categoryName}
                style={{
                  textTransform: "capitalize",
                }}
                onChange={(e) => setCategoryName(e.target.value)}
                required={true}
              >
                <option value="">Choose here</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.category}
                  </option>
                ))}
              </Input>
            </ModalBody>
            {/*=== FIXME: Uncomment this code when you fix the Google storage issue first ===*/}
            {/* <ModalBody>
              <Label className="form-label">Picture</Label>
              <span
                className="required-indicator ms-1"
                style={{ color: "#dc3545" }}
              >
                *
              </span>
              <Input
                type="file"
                name="image"
                accept="image/*"
                value={itemPic}
                onChange={(e) => setItemPic(e.target.files[0])}
                required={true}
              />
            </ModalBody> */}
            <ModalBody>
              <Label className="form-label">Item</Label>
              <span
                className="required-indicator ms-1"
                style={{ color: "#dc3545" }}
              >
                *
              </span>
              <Input
                type="text"
                value={itemName}
                onChange={(e) => setItemName(e.target.value)}
                required={true}
                placeholder="Enter your item name"
              />
            </ModalBody>
            <ModalBody>
              <Label className="form-label">Price</Label>
              <span
                className="required-indicator ms-1"
                style={{ color: "#dc3545" }}
              >
                *
              </span>
              <Input
                type="number"
                value={itemPrice}
                onChange={(e) => setItemPrice(e.target.value)}
                placeholder="Enter your item price"
                min="1"
                pattern="\d{1,11}"
                required={true}
              />
            </ModalBody>
            <ModalBody className="mb-3">
              <Label htmlFor="metadescription">Description</Label>
              <span
                className="required-indicator ms-1"
                style={{ color: "#dc3545" }}
              >
                *
              </span>
              <textarea
                row="4"
                className="form-control"
                id="metadescription"
                style={{
                  textTransform: "lowercase",
                }}
                type="text"
                value={itemDesc}
                onChange={(e) => setItemDesc(e.target.value)}
                required={true}
                placeholder="Enter only two lines in the description..."
                maxLength="123"
              />
            </ModalBody>
            <ModalFooter>
              <Button
                className="btn-rounded w-md"
                color="primary"
                onClick={addItems}
              >
                Save
              </Button>
              <Button
                style={{
                  backgroundColor: "#32394e",
                }}
                className="btn-rounded w-md ms-2"
                color="primary"
                onClick={() => setModalAddItem(false)}
              >
                Cancel
              </Button>
            </ModalFooter>
          </Modal>
          {/*==== Add Items Modal ====*/}

          {/*FIXME: Edit Item */}
          <Modal isOpen={modal} toggle={() => setModal(false)}>
            <ModalHeader>Edit Item</ModalHeader>
            <ModalBody>
              <Form
                onSubmit={(e) => {
                  e.preventDefault();
                  itemValidation.handleSubmit();
                  return false;
                }}
              >
                <Row form>
                  <Col sm="12">
                    <div className="mb-3">
                      <Label className="form-label">Category</Label>
                      <Input
                        type="select"
                        label="select"
                        value={categoryName}
                        style={{
                          textTransform: "capitalize",
                        }}
                        onChange={(e) => setCategoryName(e.target.value)}
                      >
                        <option value="">Choose here</option>
                        {categories.map((cat) => (
                          <option key={cat.id} value={cat.id}>
                            {cat.category}
                          </option>
                        ))}
                      </Input>
                    </div>
                    {/*=== FIXME: uncomment this code when you fix the Google storage issue first ===*/}
                    {/* <div className="mb-3">
                      <Label className="form-label">Picture</Label>
                      <Input
                        id="image"
                        type="file"
                        name="image"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files[0];
                          itemValidation.setFieldValue("image", file);
                        }}
                        value={
                          itemValidation.values.image && (
                            <div>
                              Selected File: {itemValidation.values.image}
                            </div>
                          )
                        }
                        onBlur={itemValidation.handleBlur}
                        invalid={
                          itemValidation.touched.image &&
                          itemValidation.errors.image
                            ? true
                            : false
                        }
                      />
                      {itemValidation.touched.image &&
                      itemValidation.errors.image ? (
                        <FormFeedback type="invalid">
                          {itemValidation.errors.image}
                        </FormFeedback>
                      ) : null}
                    </div> */}
                    <div className="mb-3">
                      <Label className="form-label">Item</Label>
                      <Input
                        id="name"
                        style={{ textTransform: "capitalize" }}
                        name="name"
                        type="text"
                        onChange={itemValidation.handleChange}
                        onBlur={itemValidation.handleBlur}
                        value={itemValidation.values.name}
                        invalid={
                          itemValidation.touched.name &&
                          itemValidation.errors.name
                            ? true
                            : false
                        }
                      />
                      {itemValidation.touched.name &&
                      itemValidation.errors.name ? (
                        <FormFeedback type="invalid">
                          {itemValidation.errors.name}
                        </FormFeedback>
                      ) : null}
                    </div>
                    <div className="mb-3">
                      <Label className="form-label">Price</Label>
                      <Input
                        id="price"
                        name="price"
                        type="text"
                        onChange={itemValidation.handleChange}
                        onBlur={itemValidation.handleBlur}
                        value={itemValidation.values.price}
                        invalid={
                          itemValidation.touched.price &&
                          itemValidation.errors.price
                            ? true
                            : false
                        }
                      />
                      {itemValidation.touched.price &&
                      itemValidation.errors.price ? (
                        <FormFeedback type="invalid">
                          {itemValidation.errors.price}
                        </FormFeedback>
                      ) : null}
                    </div>
                    <div className="mb-3">
                      <Label htmlFor="metadescription">Description</Label>
                      <textarea
                        rows="3"
                        id="description"
                        name="description"
                        className="form-control"
                        type="text"
                        maxLength="123"
                        onChange={itemValidation.handleChange}
                        onBlur={itemValidation.handleBlur}
                        value={itemValidation.values.description}
                        invalid={
                          itemValidation.touched.description &&
                          itemValidation.errors.description
                            ? true
                            : false
                        }
                      />
                      {itemValidation.touched.description &&
                      itemValidation.errors.description ? (
                        <FormFeedback type="invalid">
                          {itemValidation.errors.description}
                        </FormFeedback>
                      ) : null}
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
                onClick={() => itemValidation.handleSubmit()}
              >
                Update
              </Button>
              <Button
                style={{ backgroundColor: "#32394e" }}
                className="btn-rounded"
                color="primary w-md ms-2"
                onClick={() => {
                  setModal(false);
                  itemValidation.resetForm();
                }}
              >
                Cancel
              </Button>
            </ModalFooter>
          </Modal>
          {/*=== Edit Item ===*/}

          {/* Delete Item Modal */}
          <Modal
            isOpen={deleteItemModal}
            toggle={() => setDeleteItemModal(false)}
            centered={true}
          >
            <ModalBody>
              <Row>
                <Col sm={12}>
                  <div className="text-center">
                    <i
                      className="mdi mdi-trash-can-outline"
                      style={{ fontSize: "3em", color: "white" }}
                    />
                    <h4 style={{ fontWeight: "bold" }}>Delete Item</h4>
                    <CardTitle>
                      {"Are you sure you want to delete this Item?"}
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
                      onClick={deleteItem}
                    >
                      Yes, I'm sure
                    </button>
                    <button
                      style={{ borderColor: "#007bff" }}
                      type="button"
                      className="btn btn-light btn-rounded btn-lg ms-2"
                      onClick={() => setDeleteItemModal(false)}
                    >
                      No, Cancel
                    </button>
                  </div>
                </Col>
              </Row>
            </ModalBody>
          </Modal>
          {/*=== Delete Item Modal ===*/}

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

export default StoreMenu;
