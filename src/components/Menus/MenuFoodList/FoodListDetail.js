import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import {
  Card,
  CardBody,
  Col,
  Container,
  Nav,
  NavItem,
  NavLink,
  Row,
  TabContent,
  Table,
  TabPane,
  Button,
} from "reactstrap";
import { isEmpty } from "lodash";
import { foodImages } from "../../../assets/images/product";
import { getMenuDetail } from "../../../store/menus/actions";
import { useSelector, useDispatch } from "react-redux";
import classnames from "classnames";
import Breadcrumbs from "../../Breadcrumbs";
import RecentFoods from "./RecentFoods";

const FoodListDetail = (props) => {
  document.title = "Food Detail | Gars9n - Digital Menu & Ordering System";

  const dispatch = useDispatch();
  const { food } = useSelector((state) => ({
    food: state.menus.food,
  }));

  const {
    match: { params },
  } = props;
  const [activeTab, setActiveTab] = useState("1");

  useEffect(() => {
    if (params && params.id) {
      dispatch(getMenuDetail(params.id));
    } else {
      dispatch(getMenuDetail(1));
    }
  }, [dispatch, params]);

  const toggleTab = (tab) => {
    if (activeTab !== tab) {
      setActiveTab(tab);
    }
  };

  const imageShow = (img, id) => {
    const expandImg = document.getElementById("expandedImg" + id);
    expandImg.src = img;
  };

  return (
    <React.Fragment>
      <div className='page-content'>
        <Container fluid>
          <Breadcrumbs title='Food Menus' BreadcrumbItem='Food Detail' />
          {!isEmpty(food) && (
            <Row>
              <Col>
                <Card>
                  <CardBody>
                    <Row>
                      <Col xl='6'>
                        <div className='food-detail-imgs'>
                          <Row>
                            <Col md='2' xs='3'>
                              <Nav className='flex-column' pills>
                                <NavItem>
                                  <NavLink
                                    className={classnames({
                                      active: activeTab === "1",
                                    })}
                                    onClick={() => {
                                      toggleTab("1");
                                    }}>
                                    <img
                                      src={food["subImage"][0]}
                                      alt=''
                                      onClick={() => {
                                        imageShow(food["subImage"][0], 1);
                                      }}
                                      className='img-fluid mx-auto d-block rounded'
                                    />
                                  </NavLink>
                                </NavItem>
                                <NavItem>
                                  <NavLink
                                    className={classnames({
                                      active: activeTab === "2",
                                    })}
                                    onClick={() => {
                                      toggleTab("2");
                                    }}>
                                    <img
                                      src={food["subImage"][1]}
                                      alt=''
                                      onClick={() => {
                                        imageShow(food["subImage"][1], 2);
                                      }}
                                      className='img-fluid mx-auto d-block rounded'
                                    />
                                  </NavLink>
                                </NavItem>
                                <NavItem>
                                  <NavLink
                                    className={classnames({
                                      active: activeTab === "3",
                                    })}
                                    onClick={() => {
                                      toggleTab("3");
                                    }}>
                                    <img
                                      src={food["subImage"][2]}
                                      alt=''
                                      onClick={() => {
                                        imageShow(food["subImage"][2], 3);
                                      }}
                                      className='img-fluid mx-auto d-block rounded'
                                    />
                                  </NavLink>
                                </NavItem>
                              </Nav>
                            </Col>
                            <Col md={{ size: 7, offset: 1 }} xs='9'>
                              <TabContent activeTab={activeTab}>
                                <TabPane tabId='1'>
                                  <div>
                                    <img
                                      src={foodImages[food.image]}
                                      alt=''
                                      id='expandedImg1'
                                      className='img-fluid mx-auto d-block'
                                    />
                                  </div>
                                </TabPane>
                                <TabPane tabId='2'>
                                  <div>
                                    <img
                                      src={foodImages[food.image]}
                                      id='expandedImg2'
                                      alt=''
                                      className='img-fluid mx-auto d-block'
                                    />
                                  </div>
                                </TabPane>
                                <TabPane tabId='3'>
                                  <div>
                                    <img
                                      src={foodImages[food.image]}
                                      id='expandedImg3'
                                      alt=''
                                      className='img-fluid mx-auto d-block'
                                    />
                                  </div>
                                </TabPane>
                                <TabPane tabId='4'>
                                  <div>
                                    <img
                                      src={foodImages[food.image]}
                                      id='expandedImg4'
                                      alt=''
                                      className='img-fluid mx-auto d-block'
                                    />
                                  </div>
                                </TabPane>
                              </TabContent>
                              <div className='text-center'>
                                <Button
                                  type='button'
                                  color='primary'
                                  className='btn  mt-2 me-1'>
                                  <i className='bx bx-cart me-2' /> Add to cart
                                </Button>
                                <Button
                                  type='button'
                                  color='success'
                                  className='ms-1 btn mt-2'>
                                  <i className='bx bx-shopping-bag me-2' />
                                  Buy now
                                </Button>
                              </div>
                            </Col>
                          </Row>
                        </div>
                      </Col>

                      <Col xl='6'>
                        <div className='mt-4 mt-xl-3'>
                          <Link to='#' className='text-primary'>
                            {food.category}
                          </Link>
                          <h4 className='mt-1 mb-3'>{food.name}</h4>

                          <p className='text-muted mb-4'>
                            ( {food.reviews} Customers Review )
                          </p>

                          {!!food.isOffer && (
                            <h6 className='text-success text-uppercase'>
                              {food.offer} % Off
                            </h6>
                          )}
                          <h5 className='mb-4'>
                            Price :{" "}
                            <span className='text-muted me-2'>
                              <del>${food.oldPrice} USD</del>
                            </span>{" "}
                            <b>${food.newPrice} USD</b>
                          </h5>
                          <p className='text-muted mb-4'>
                            To achieve this, it would be necessary to have
                            uniform grammar pronunciation and more common words
                            If several languages coalesce
                          </p>
                          <Row className='mb-3'>
                            <Col md='6'>
                              {food.features &&
                                food.features.map((item, i) => (
                                  <div key={i}>
                                    <p className='text-muted'>
                                      <i
                                        className={classnames(
                                          item.icon,
                                          "font-size-16 align-middle text-primary me-2"
                                        )}
                                      />
                                      {item.type && `${item.type}: `}
                                      {item.value}
                                    </p>
                                  </div>
                                ))}
                            </Col>
                            <Col md='6'>
                              {food.features &&
                                food.features.map((item, i) => (
                                  <div key={i}>
                                    <p className='text-muted'>
                                      <i
                                        className={classnames(
                                          item.icon,
                                          "font-size-16 align-middle text-primary me-2"
                                        )}
                                      />
                                      {item.type && `${item.type}:`}
                                      {item.value}
                                    </p>
                                  </div>
                                ))}
                            </Col>
                          </Row>

                          <div className='food-color'>
                            <h5 className='font-size-15'>Color :</h5>
                            {food.colorOptions &&
                              food.colorOptions.map((option, i) => (
                                <Link to='#' className='active' key={i}>
                                  <div className='food-color-item border rounded'>
                                    <img
                                      src={foodImages[option.image]}
                                      alt=''
                                      className='avatar-md'
                                    />
                                  </div>
                                  <p>{option.color}</p>
                                </Link>
                              ))}
                          </div>
                        </div>
                      </Col>
                    </Row>

                    <div className='mt-5'>
                      <h5 className='mb-3'>Specifications :</h5>

                      <div className='table-responsive'>
                        <Table className='table mb-0 table-bordered'>
                          <tbody>
                            {food.specification &&
                              food.specification.map((specification, i) => (
                                <tr key={i}>
                                  <th
                                    scope='row'
                                    style={{ width: "400px" }}
                                    className={"text-capitalize"}>
                                    {specification.type}
                                  </th>
                                  <td>{specification.value}</td>
                                </tr>
                              ))}
                          </tbody>
                        </Table>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          )}

          <RecentFoods recentFoods={RecentFoods} />
        </Container>
      </div>
    </React.Fragment>
  );
};

FoodListDetail.propTypes = {
  food: PropTypes.object,
  match: PropTypes.any,
  getMenuDetail: PropTypes.func,
};

export default FoodListDetail;
