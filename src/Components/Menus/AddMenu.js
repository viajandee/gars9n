import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Card,
  CardBody,
  CardSubtitle,
  CardTitle,
  Col,
  Container,
  Form,
  Input,
  Label,
  Row,
  Modal,
  ModalHeader,
  ModalBody,
} from "reactstrap";
import Select from "react-select";
import Dropzone from "react-dropzone";
import Breadcrumbs from "../Breadcrumbs";

const AddFood = () => {
  //meta title
  document.title = "Add Menu | Gars9n - Digital Menu & Ordering System";

  const [selectedFiles, setselectedFiles] = useState([]);

  const options = [
    { value: "AK", label: "Alaska" },
    { value: "HI", label: "Hawaii" },
    { value: "CA", label: "California" },
    { value: "NV", label: "Nevada" },
    { value: "OR", label: "Oregon" },
    { value: "WA", label: "Washington" },
  ];

  function handleAcceptedFiles(files) {
    files.map((file) =>
      Object.assign(file, {
        preview: URL.createObjectURL(file),
        formattedSize: formatBytes(file.size),
      })
    );

    setselectedFiles(files);
  }

  function formatBytes(bytes, decimals = 2) {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
  }

  

  return (
    <React.Fragment>
      <div className='page-content'>
        <Container fluid>
          <Breadcrumbs title='Menus' BreadcrumbItem='Add Menu' />
          <Row>
            <Col xs='12'>
              <Card>
                <CardBody>
                  <CardTitle>Basic Information</CardTitle>
                  <CardSubtitle className='mb-4'>
                    Fill all information below
                  </CardSubtitle>

                  <Form>
                    <Row>
                      <Col sm='6'>
                        <div className='mb-3'>
                          <Label htmlFor='name'>Name</Label>
                          <Input
                            id='foodname'
                            name='foodname'
                            type='text'
                            className='form-control'
                          />
                        </div>
                        <div className='mb-3'>
                          <Label htmlFor='manufacturername'>
                            Manufacturer Name
                          </Label>
                          <Input
                            id='manufacturername'
                            name='manufacturername'
                            type='text'
                            className='form-control'
                          />
                        </div>
                        <div className='mb-3'>
                          <Label htmlFor='manufacturerbrand'>
                            Manufacturer Brand
                          </Label>
                          <Input
                            id='manufacturerbrand'
                            name='manufacturerbrand'
                            type='text'
                            className='form-control'
                          />
                        </div>
                        <div className='mb-3'>
                          <Label htmlFor='price'>Price</Label>
                          <Input
                            id='price'
                            name='price'
                            type='text'
                            className='form-control'
                          />
                        </div>
                      </Col>

                      <Col sm='6'>
                        <div className='mb-3'>
                          <Label className='control-label'>Category</Label>
                          <select className='form-control select2'>
                            <option>Select</option>
                            <option value='FA'>Food</option>
                            <option value='EL'>Drink</option>
                          </select>
                        </div>
                        <div className='mb-3'>
                          <Label className='control-label'>Features</Label>
                          <Select
                            classNamePrefix='select2-selection'
                            placeholder='Choose...'
                            title='Country'
                            options={options}
                            isMulti
                          />
                        </div>
                        <div className='mb-3'>
                          <Label htmlFor='fooddesc'>Description</Label>
                          <textarea
                            className='form-control mb-3'
                            id='fooddesc'
                            rows='5'
                          />
                        </div>
                      </Col>
                    </Row>
                    <div className='text-start'>
                      <Button
                        type='submit'
                        className='btn-rounded '
                        color='btn btn-primary w-md'>
                        Submit
                      </Button>
                    </div>
                  </Form>
                </CardBody>
              </Card>

              <Card>
                <CardBody>
                  <CardTitle className='mb-3'>Menu Images</CardTitle>
                  <Form>
                    <Dropzone
                      onDrop={(acceptedFiles) => {
                        handleAcceptedFiles(acceptedFiles);
                      }}>
                      {({ getRootProps, getInputProps }) => (
                        <div className='dropzone'>
                          <div
                            className='dz-message needsclick'
                            {...getRootProps()}>
                            <input {...getInputProps()} />
                            <div className='dz-message needsclick'>
                              <div className='mb-3'>
                                <i className='display-4 text-muted bx bxs-cloud-upload' />
                              </div>
                              <h4>Drop files here or click to upload.</h4>
                            </div>
                          </div>
                        </div>
                      )}
                    </Dropzone>
                    <div className='dropzone-previews mt-3' id='file-previews'>
                      {selectedFiles.map((f, i) => {
                        return (
                          <Card
                            className='mt-1 mb-0 shadow-none border dz-processing dz-image-preview dz-success dz-complete'
                            key={i + "-file"}>
                            <div className='p-2'>
                              <Row className='align-items-center'>
                                <Col className='col-auto'>
                                  <img
                                    data-dz-thumbnail=''
                                    height='80'
                                    className='avatar-sm rounded bg-light'
                                    alt={f.name}
                                    src={f.preview}
                                  />
                                </Col>
                                <Col>
                                  <Link
                                    to='#'
                                    className='text-muted font-weight-bold'>
                                    {f.name}
                                  </Link>
                                  <p className='mb-0'>
                                    <strong>{f.formattedSize}</strong>
                                  </p>
                                </Col>
                              </Row>
                            </div>
                          </Card>
                        );
                      })}
                    </div>
                  </Form>
                </CardBody>
              </Card>

              <Card>
                <CardBody>
                  <CardTitle>Meta Data</CardTitle>
                  <CardSubtitle className='mb-3'>
                    Fill all information below
                  </CardSubtitle>

                  <Form>
                    <Row>
                      <Col sm={6}>
                        <div className='mb-3'>
                          <Label htmlFor='metatitle'>Meta title</Label>
                          <Input
                            id='metatitle'
                            name='foodname'
                            type='text'
                            className='form-control'
                          />
                        </div>
                        <div className='mb-3'>
                          <Label htmlFor='metakeywords'>Meta Keywords</Label>
                          <Input
                            id='metakeywords'
                            name='manufacturername'
                            type='text'
                            className='form-control'
                          />
                        </div>
                      </Col>

                      <Col sm={6}>
                        <div className='mb-3'>
                          <Label htmlFor='metadescription'>
                            Meta Description
                          </Label>
                          <textarea
                            className='form-control'
                            id='metadescription'
                            rows='5'
                          />
                        </div>
                      </Col>
                    </Row>
                    <div className='text-start'>
                      <Button
                        className='btn-rounded'
                        type='submit'
                        color='btn btn-primary w-md'>
                        Submit
                      </Button>
                    </div>
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>
        
        </Container>
      </div>
    </React.Fragment>
  );
};

export default AddFood;
