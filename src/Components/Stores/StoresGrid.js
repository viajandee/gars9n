import React, { useState, useEffect, useRef } from "react";
import {
  Card,
  CardBody,
  CardFooter,
  UncontrolledTooltip,
  Col,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Input,
  Label,
  Form,
  FormFeedback,
  Modal,
  ModalHeader,
  ModalBody,
  Row,
  Container,
  Button,
  ModalFooter,
} from "reactstrap";
import { Link, withRouter } from "react-router-dom";
import { map, size, isEmpty } from "lodash";
import {
  getStores as onGetStores,
  addNewStore as onAddNewStore,
  updateStore as onUpdateStore,
  deleteStore as onDeleteStore,
} from "../../store/entities/actions";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import Breadcrumbs from "../Breadcrumbs";
import DeleteModal from "CommonTable/DeleteModal";

const StoresGrid = () => {
  document.title = "Stores | Gars9n - Digital Menu & Ordering System";

  const { stores } = useSelector((state) => ({
    stores: state.entities.stores,
  }));

  const [deleteModal, setDeleteModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [modal, setModal] = useState(false);

  // ADD BUTTON
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [newStoreName, setNewStoreName] = useState("");
  const [store, setStore] = useState([]);
  const dispatch = useDispatch();

  const validation = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: (store && store.name) || "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Please Enter Store Name"),
    }),
    onSubmit: (values) => {
      if (isEdit) {
        handleUpdateStore();
      } else {
        const newStore = {
          name: values.name,
        };
        dispatch(onAddNewStore(newStore));
      }
      setIsEdit(false);
      toggle();
    },
  });

  const toggle = () => {
    setModal(!modal);
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

  // Delete store
  const onClickDelete = (store) => {
    setStore(store);
    setDeleteModal(true);
  };

  const handleDeleteStore = () => {
    if (store.id) {
      dispatch(onDeleteStore(store.id));
      setDeleteModal(false);
      onPaginationPageChange(1);
    }
  };

  // Edit Store
  const handleStoreClick = (arg) => {
    const store = arg;

    setStore({
      name: store.name,
    });
    setIsEdit(true);

    toggle();
  };

  const handleUpdateStore = () => {
    const updatedStore = {
      id: store.id,
      name: validation.values.name,
    };

    dispatch(onUpdateStore(updatedStore));
    setIsEdit(false);
    toggle();
  };

  // getStores
  useEffect(() => {
    if (stores && !stores.length) {
      dispatch(onGetStores());
      setIsEdit(false);
    }
  }, [dispatch, stores]);

  useEffect(() => {
    setStore(stores);
    setIsEdit(false);
  }, [stores]);

  useEffect(() => {
    if (!isEmpty(stores) && !!isEdit) {
      setStore(stores);
      setIsEdit(false);
    }
  }, [stores]);

  useEffect(() => {
    if (stores && !stores.length) {
      dispatch(onGetStores());
    }
  }, [dispatch, stores]);

  const keyField = "id";

  // ADD BUTTON
  const openModal = () => {
    setModalIsOpen(true);
  };
  const addNewStore = () => {
    if (newStoreName) {
      const newStore = {
        id: stores.length + 1,
        name: newStoreName,
      };
      dispatch(onAddNewStore(newStore));
      setModalIsOpen(false);
      setNewStoreName("");
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
          {/* ADD BUTTON */}
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
              <Input
                type='text'
                placeholder='Store Name'
                value={newStoreName}
                onChange={(e) => setNewStoreName(e.target.value)}
              />
            </ModalBody>
            <ModalFooter>
              <Button color='success' onClick={addNewStore}>
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
          {/*=== ADD BUTTON ===*/}

          <Row>
            {map(stores, (store, key) => (
              <Col xl='4' sm='6' key={"_store_" + key}>
                <Card className='text-center'>
                  <CardBody>
                    {!store.img ? (
                      <div className='avatar-sm mx-auto mb-4'>
                        <span
                          className={
                            "avatar-title rounded-circle bg-soft bg-" +
                            store.color +
                            " text-" +
                            store.color +
                            " font-size-16"
                          }>
                          {store.name.charAt(0)}
                        </span>
                      </div>
                    ) : (
                      <div className='mb-4'>
                        <img
                          className='rounded-circle avatar-sm'
                          src={store.img}
                          alt=''
                        />
                      </div>
                    )}

                    <h5 className='font-size-15 mb-1'>
                      <Link to='#' className='text-dark'>
                        {store.name}
                      </Link>
                    </h5>

                    <div>
                      {map(
                        store.tags,
                        (tag, index) =>
                          index < 2 && (
                            <Link
                              to='#'
                              className='badge bg-primary font-size-11 m-1'
                              key={"_skill_" + store.id + index}>
                              {tag}
                            </Link>
                          )
                      )}
                      {size(store.tags) > 2 && (
                        <Link
                          to='#'
                          className='badge bg-primary font-size-11 m-1'
                          key={"_skill_" + store.id}>
                          {size(store.tags) - 1} + more
                        </Link>
                      )}
                    </div>
                  </CardBody>
                  <CardFooter className='bg-transparent border-top'>
                    <div className='contact-links d-flex font-size-20'>
                      <div className='flex-fill'>
                        <Link to='#' id={"message" + store.id}>
                          <i className='bx bx-message-square-dots' />
                          <UncontrolledTooltip
                            placement='top'
                            target={"message" + store.id}>
                            Message
                          </UncontrolledTooltip>
                        </Link>
                      </div>

                      <div className='flex-fill'>
                        <Link to='#' id={"project" + store.id}>
                          <i className='bx bx-pie-chart-alt' />
                          <UncontrolledTooltip
                            placement='top'
                            target={"project" + store.id}>
                            Projects
                          </UncontrolledTooltip>
                        </Link>
                      </div>

                      <div className='flex-fill'>
                        <Link to='#' id={"profile" + store.id}>
                          <i className='bx bx-user-circle' />
                          <UncontrolledTooltip
                            placement='top'
                            target={"profile" + store.id}>
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
                            <DropdownItem
                              href='#Edit'
                              onClick={() => handleStoreClick(store)}>
                              <i className='mdi mdi-pencil font-size-16 text-success me-1' />{" "}
                              Edit
                            </DropdownItem>
                            <DropdownItem
                              href='#Delete'
                              onClick={() => onClickDelete(store)}>
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
            ))}
          </Row>

          <Modal isOpen={modal} toggle={toggle}>
            <ModalHeader toggle={toggle} tag='h4'>
              {!!isEdit ? "Edit Store" : "Add Store"}
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
                        name='storename'
                        type='text'
                        onChange={validation.handleChange}
                        onBlur={validation.handleBlur}
                        value={validation.values.storename || ""}
                        invalid={
                          validation.touched.storename &&
                          validation.errors.storename
                            ? true
                            : false
                        }
                      />
                      {validation.touched.storename &&
                      validation.errors.storename ? (
                        <FormFeedback type='invalid'>
                          {validation.errors.storename}
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
                        className='btn btn-success save-customer'>
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
