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
} from "reactstrap";
import { foodImages } from "../../../assets/images/product";
import { getMenuDetail as onGetMenuDetail } from "store/menus/actions";
import { useSelector, useDispatch } from "react-redux";
import classnames from "classnames";
import Breadcrumbs from "../../Breadcrumbs";
import RecentFoods from "./RecentFoods";

const FoodListDetail = (props) => {
  document.title = "Food Detail | Gars9n - Digital Menu & Ordering System";

  const dispatch = useDispatch([]);

  const { menu } = useSelector((state) => ({
    menu: state.menus.menu,
  }));

  const {
    match: { params },
  } = props;
  const [activeTab, setActiveTab] = useState("1");

  useEffect(() => {
    if (params && params.id) {
      dispatch(onGetMenuDetail(params.id));
    } else {
      dispatch(onGetMenuDetail(1));
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
                              {menu.subImage &&
                                menu.subImage.map((img, index) => (
                                  <NavItem key={index}>
                                    <NavLink
                                      className={classnames({
                                        active:
                                          activeTab === (index + 1).toString(),
                                      })}
                                      onClick={() => {
                                        toggleTab((index + 1).toString());
                                      }}>
                                      <img
                                        src={img}
                                        alt=''
                                        onClick={() => {
                                          imageShow(img, index + 1);
                                        }}
                                        className='img-fluid mx-auto d-block rounded'
                                      />
                                    </NavLink>
                                  </NavItem>
                                ))}
                            </Nav>
                          </Col>

                          {/* Image */}
                          <Col md={{ size: 7, offset: 1 }} xs='9'>
                            <TabContent activeTab={activeTab}>
                              {menu.subImage &&
                                menu.subImage.map((img, index) => (
                                  <TabPane
                                    key={index}
                                    tabId={(index + 1).toString()}>
                                    <div>
                                      <img
                                        src={foodImages[menu.image]}
                                        alt=''
                                        className='img-fluid mx-auto d-block'
                                      />
                                    </div>
                                  </TabPane>
                                ))}
                            </TabContent>
                          </Col>
                        </Row>
                      </div>
                    </Col>

                    {/* Category */}
                    <Col xl='6'>
                      <div className='mt-4 mt-xl-3'>
                        <Link to='#' className='text-primary'>
                          {menu.category}
                        </Link>

                        {/* Name */}
                        <h4 className='mt-1 mb-3'>{menu.name}</h4>

                        {/* Price */}
                        {/* <h5 className='mb-4'>
                          Price: <b>${menu.Price} USD</b>
                        </h5> */}

                        <p className='text-muted mb-4'>
                          To achieve this, it would be necessary to have uniform
                          grammar pronunciation and more common words. If
                          several languages coalesce.
                        </p>

                        {/* Vlaue */}
                        <Row className='mb-3'>
                          <Col md='6'>
                            {menu.features &&
                              menu.features.map((item, i) => (
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
                            {menu.features &&
                              menu.features.map((item, i) => (
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
                        </Row>

                        {/* Color */}
                        <div className='food-color'>
                          <h5 className='font-size-15'>Color:</h5>

                          {menu.colorOptions &&
                            menu.colorOptions.map((option, i) => (
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

                  {/* Specifications */}
                  <div className='mt-5'>
                    <h5 className='mb-3'>Specifications:</h5>

                    <div className='table-responsive'>
                      <Table className='table mb-0 table-bordered'>
                        <tbody>
                          {menu.specification &&
                            menu.specification.map((specification, i) => (
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

          <RecentFoods recentFoods={menu.recentFoods} />
        </Container>
      </div>
    </React.Fragment>
  );
};

FoodListDetail.propTypes = {
  menus: PropTypes.object,
  match: PropTypes.any,
  onGetMenuDetail: PropTypes.func,
};

export default FoodListDetail;
