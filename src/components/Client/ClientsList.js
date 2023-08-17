import React, { useState, useEffect, useMemo, useRef } from "react";
import { Link, withRouter } from "react-router-dom";
import TableContainer from "Common/TableContainer";
import { ModalHeader } from "reactstrap";
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
} from "reactstrap";
import * as Yup from "yup";
import { useFormik } from "formik";
import { Name, Email, Tags, Projects } from "./ClientListCol";
import Breadcrumb from "components/Breadcrumb";
import DeleteModal from "Common/DeleteModal";
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
      tags: (client && client.tags) || [],
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

        // update Client
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
        // save new Client
        dispatch(onAddNewClient(newClient));
        validation.resetForm();
      }
      toggle();
    },
  });

  // useSlector
  const { clients } = useSelector((state) => ({
    clients: state.client.clients,
  }));

  const [clientList, setClientList] = useState([]);
  const [modal, setModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const columns = useMemo(
    () => [
      {
        id: 1,
        Headers: "#",
        Cell: () => {
          return <input type='checkbox' />;
        },
      },
      {
        id: 2,
        Header: "Name",
        accessor: "name",
        filterable: true,
        Cell: (cellProps) => {
          return <Name {...cellProps} />;
        },
      },
      {
        id: 3,
        Header: "Email",
        accessor: "email",
        filterable: true,
        Cell: (cellProps) => {
          return <Email {...cellProps} />;
        },
      },
      {
        id: 4,
        Header: "Tags",
        accessor: "tags",
        filterable: true,
        Cell: (cellProps) => {
          return <Tags {...cellProps} />;
        },
      },
      {
        id: 5,
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
        id: 6,
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
        id: 7,
        Header: "Action",
        Cell: (cellProps) => {
          const client = cellProps.row.original;
          return (
            <div className='d-flex gap-3'>
              <Link
                to='#'
                className='text-success'
                onClick={() => handleClientClick(client)}>
                <i
                  className='mdi mdi-pencil font-size-18'
                  id={`edittooltip${client.id}`}
                />
                <UncontrolledTooltip
                  placement='top'
                  target={`edittooltip${client.id}`}>
                  Edit
                </UncontrolledTooltip>
              </Link>
              <Link
                to='#'
                className='text-danger'
                onClick={() => onClickDelete(client)}>
                <i
                  className='mdi mdi-delete font-size-18'
                  id={`deletetooltip${client.id}`}
                />
                <UncontrolledTooltip
                  placement='top'
                  target={`deletetooltip${client.id}`}>
                  Delete
                </UncontrolledTooltip>
              </Link>
            </div>
          );
        },
      },
    ],
    []
  );

  useEffect(() => {
    if (client && !client.length) {
      dispatch(onGetClients());
      setIsEdit(false);
    }
  }, [dispatch, client]);

  useEffect(() => {
    setClient(client);
    setIsEdit(false);
  }, [client]);

  useEffect(() => {
    if (!isEmpty(client) && !!isEdit) {
      setClient(client);
      setIsEdit(false);
    }
  }, [client]);

  const toggle = () => {
    setModal(!modal);
  };

  const handleClientClick = (arg) => {
    const client = arg;

    setClient({
      id: client.id,
      name: client.name,
      designation: client.designation,
      email: client.email,
      tags: client.tags,
      projects: client.projects,
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

  const [deleteModal, setDeleteModal] = useState(false);

  const onClickDelete = (clients) => {
    setClient(clients);
    setDeleteModal(true);
  };

  const handleDeleteClient = () => {
    dispatch(onDeleteClient(client));
    onPaginationPageChange("");
    setDeleteModal(false);
  };

  const handleClientClicks = () => {
    setClientList("");
    setIsEdit(false);
    toggle();
  };

  return (
    <React.Fragment>
      <DeleteModal
        show={deleteModal}
        onDeleteClick={handleDeleteClient}
        onCloseClick={() => setDeleteModal(false)}
      />
      <div className='page-content'>
        <Container fluid>
          <Breadcrumb title='Clients' BreadcrumbItem='Clients List' />
          <Row>
            <Col lg='12'>
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
                                }
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
