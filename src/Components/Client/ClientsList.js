import React, { useState, useEffect, useMemo, useRef } from "react";
import { Link, withRouter } from "react-router-dom";
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
} from "reactstrap";
import * as Yup from "yup";
import { useFormik } from "formik";
import { Name, Email, Tags, Projects } from "./ClientListCol";
import Breadcrumbs from "../Breadcrumbs";
import DeleteModal from "../../CommonTable/DeleteModal";
import TableContainer from "../../CommonTable/TableContainer";
import {
  getClients as onGetClients,
  addNewClient as onAddNewClient,
  updateClient as onUpdateClient,
  deleteClient as onDeleteClient,
} from "../../store/client/actions";
import { isEmpty } from "lodash";
import { useSelector, useDispatch } from "react-redux";

const ClientsList = () => {
  document.title = "Clients List | Gars9n - React Admin & Dashboard Template";

  const dispatch = useDispatch();
  const [client, setClient] = useState(null);

  const validation = useFormik({
    enableReinitialize: true,

    initialValues: {
      name: (client && client.name) || "",
      designation: (client && client.designation) || "",
      tags: (client && client.tags) || "",
      email: (client && client.email) || "",
      projects: (client && client.projects) || "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Please Enter Your Name"),
      designation: Yup.string().required("Please Enter Your Designation"),
      tags: Yup.array().required("Please Enter Tag"),
      email: Yup.string().required("Please Enter Your Email"),
      projects: Yup.number().required("Please Enter Your Project"),
    }),
    onSubmit: (values) => {
      if (isEdit) {
        const updateClient = {
          id: client.id,
          name: values.name,
          designation: values.designation,
          tags: values.tags,
          email: values.email,
          projects: values.projects,
        };

        // update client
        dispatch(onUpdateClient(updateClient));
        validation.resetForm();
        setIsEdit(false);
      } else {
        const newClient = {
          id: Math.floor(Math.random() * (30 - 20)) + 20,
          name: values["name"],
          designation: values["designation"],
          email: values["email"],
          tags: values["tags"],
          projects: values["projects"],
        };
        // save new client
        dispatch(onAddNewClient(newClient));
        validation.resetForm();
      }
      toggle();
    },
  });

  const { clients } = useSelector((state) => ({
    clients: state.client.clients,
  }));

  // eslint-disable-next-line no-unused-vars
  const [clientList, setClientList] = useState([]);
  const [modal, setModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const columns = useMemo(
    () => [
      {
        Header: "#",
        Cell: () => {
          return <input type='checkbox' />;
        },
      },
      {
        Header: "Img",
        disableFilters: true,
        filterable: true,
        accessor: (cellProps) => (
          <>
            {!cellProps.img ? (
              <div className='avatar-xs'>
                <span className='avatar-title rounded-circle'>
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
        Header: "Name",
        accessor: "name",
        filterable: true,
        Cell: (cellProps) => {
          return <Name {...cellProps} />;
        },
      },
      {
        Header: "Email",
        accessor: "email",
        filterable: true,
        Cell: (cellProps) => {
          return <Email {...cellProps} />;
        },
      },
      {
        Header: "Tags",
        accessor: "tags",
        filterable: true,
        Cell: (cellProps) => {
          return <Tags {...cellProps} />;
        },
      },
      {
        Header: "Projects",
        accessor: "projects",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <>
              {" "}
              <Projects {...cellProps} />{" "}
            </>
          );
        },
      },
      {
        Header: "Action",
        Cell: (cellProps) => {
          return (
            <div className='d-flex gap-3'>
              <Link
                to='#'
                className='text-success'
                onClick={() => {
                  const userData = cellProps.row.original;
                  handleClientClick(userData);
                }}>
                <i className='mdi mdi-pencil font-size-18' id='edittooltip' />
                <UncontrolledTooltip placement='top' target='edittooltip'>
                  Edit
                </UncontrolledTooltip>
              </Link>
              <Link
                to='#'
                className='text-danger'
                onClick={() => {
                  const userData = cellProps.row.original;
                  onClickDelete(userData);
                }}>
                <i className='mdi mdi-delete font-size-18' id='deletetooltip' />
                <UncontrolledTooltip placement='top' target='deletetooltip'>
                  Delete
                </UncontrolledTooltip>
              </Link>
            </div>
          );
        },
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  useEffect(() => {
    if (clients && !clients.length) {
      dispatch(onGetClients());
      setIsEdit(false);
    }
  }, [dispatch, clients]);

  useEffect(() => {
    setClient(clients);
    setIsEdit(false);
  }, [clients]);

  useEffect(() => {
    if (!isEmpty(clients) && !!isEdit) {
      setClient(clients);
      setIsEdit(false);
    }
     // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clients]);

  const toggle = () => {
    setModal(!modal);
  };

  const handleClientClick = (arg) => {
    const clientData = arg;

    setClient({
      id: clientData.id,
      name: clientData.name,
      designation: clientData.designation,
      email: clientData.email,
      tags: clientData.tags,
      projects: clientData.projects,
    });
    setIsEdit(true);

    toggle();
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

  // DELETE CLIENTS
  const [deleteModal, setDeleteModal] = useState(false);

  const onClickDelete = (client) => {
    setClient(client);
    setDeleteModal(true);
  };

  const handleDeleteClient = () => {
    if (client.id) {
      dispatch(onDeleteClient(client.id));
      setDeleteModal(false);
      onPaginationPageChange(1);
      setClient(null);
    }
  };

  const handleClientClicks = () => {
    setClientList("");
    setIsEdit(false);
    toggle();
  };

  // eslint-disable-next-line no-unused-vars
  const keyField = "id";

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
              <Card>
                <CardBody>
                  <TableContainer
                    columns={columns}
                    data={clients}
                    isGlobalFilter={true}
                    isAddUserList={true}
                    handleUserClick={handleClientClicks}
                    customPageSize={10}
                    className='custom-header-css'
                  />

                  <Modal isOpen={modal} toggle={toggle}>
                    <ModalHeader toggle={toggle} tag='h4'>
                      {!!isEdit ? "Edit Client" : "Add Client"}
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
                              <Label className='form-label'>Name</Label>
                              <Input
                                name='name'
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
                                required
                              />
                              {validation.touched.name &&
                              validation.errors.name ? (
                                <FormFeedback type='invalid'>
                                  {validation.errors.name}
                                </FormFeedback>
                              ) : null}
                            </div>
                            <div className='mb-3'>
                              <Label className='form-label'>Designation</Label>
                              <Input
                                name='designation'
                                label='Designation'
                                type='text'
                                onChange={validation.handleChange}
                                onBlur={validation.handleBlur}
                                value={validation.values.designation || ""}
                                invalid={
                                  validation.touched.designation &&
                                  validation.errors.designation
                                    ? true
                                    : false
                                }
                                required
                              />
                              {validation.touched.designation &&
                              validation.errors.designation ? (
                                <FormFeedback type='invalid'>
                                  {validation.errors.designation}
                                </FormFeedback>
                              ) : null}
                            </div>
                            <div className='mb-3'>
                              <Label className='form-label'>Email</Label>
                              <Input
                                name='email'
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
                                required
                              />
                              {validation.touched.email &&
                              validation.errors.email ? (
                                <FormFeedback type='invalid'>
                                  {validation.errors.email}
                                </FormFeedback>
                              ) : null}
                            </div>
                            <div className='mb-3'>
                              <Label className='form-label'>Option</Label>
                              <Input
                                type='select'
                                name='tags'
                                className='form-select'
                                multiple={true}
                                onChange={validation.handleChange}
                                onBlur={validation.handleBlur}
                                value={validation.values.tags || []}
                                invalid={
                                  validation.touched.tags &&
                                  validation.errors.tags
                                    ? true
                                    : false
                                }>
                                <option>Photoshop</option>
                                <option>illustrator</option>
                                <option>Html</option>
                                <option>Php</option>
                                <option>Java</option>
                                <option>Python</option>
                                <option>UI/UX Designer</option>
                                <option>Ruby</option>
                                <option>Css</option>
                              </Input>
                              {validation.touched.tags &&
                              validation.errors.tags ? (
                                <FormFeedback type='invalid'>
                                  {validation.errors.tags}
                                </FormFeedback>
                              ) : null}
                            </div>
                            <div className='mb-3'>
                              <Label className='form-label'>Projects</Label>
                              <Input
                                name='projects'
                                label='Projects'
                                type='text'
                                onChange={validation.handleChange}
                                onBlur={validation.handleBlur}
                                value={validation.values.projects || ""}
                                invalid={
                                  validation.touched.projects &&
                                  validation.errors.projects
                                    ? true
                                    : false
                                }
                                required
                              />
                              {validation.touched.projects &&
                              validation.errors.projects ? (
                                <FormFeedback type='invalid'>
                                  {validation.errors.projects}
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
                                className='btn btn-success save-client'>
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
