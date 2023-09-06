import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Link, withRouter } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getMenus } from "../../../store/menus/actions";
import { isEmpty, map } from "lodash";
import {
  Card,
  CardBody,
  CardTitle,
  Col,
  Container,
  Form,
  Input,
  Nav,
  NavItem,
  NavLink,
  Pagination,
  PaginationItem,
  PaginationLink,
  Row,
} from "reactstrap";
import Breadcrumbs from "../../Breadcrumbs";
import classnames from "classnames";
import { foodImages } from "../../../assets/images/product";
import { foodsData } from "../../../common/data/DataMenus";

const FoodsList = (props) => {
  document.title = "Foods List | Gars9n - Digital Menu & Ordering System";

  const dispatch = useDispatch();

  const { food } = useSelector((state) => ({
    food: state.menus.food,
  }));

  const [FilterList, setFilterList] = useState([
    { id: 1, name: "KFC" },
    { id: 2, name: "McDonald's" },
    { id: 3, name: "Pizza Hut" },
    { id: 4, name: "Papa Johns" },
  ]);
  const { history } = props;
  const [foodList, setFoodList] = useState([]);
  const [activeTab, setActiveTab] = useState("1");
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(5);

  const onChangeCategory = (category) => {
    setFoodList(foodsData.filter((food) => food.category === category));
  };

  useEffect(() => {
    setFoodList(foodsData);
  }, []);

  const toggleTab = (tab) => {
    if (activeTab !== tab) {
      setActiveTab(tab);
    }
  };

  useEffect(() => {
    dispatch(getMenus());
  }, [dispatch]);

  useEffect(() => {
    if (!isEmpty(food)) setFoodList(food);
  }, [food]);

  const handlePageClick = (page) => {
    setPage(page);
  };

  return (
    <React.Fragment>
      <div className='page-content'>
        <Container fluid>
          <Breadcrumbs title='Food Menus' BreadcrumbItem='Food List' />
          <Row>
            {/* Filter Icon */}
            <Col lg='3'>
              <Card>
                <CardBody>
                  <CardTitle className='mb-4'>Filter</CardTitle>
                  <div>
                    <h5 className='font-size-14 mb-3'>Food List</h5>
                    <ul className='list-unstyled product-list'>
                      {FilterList.map((food, key) => (
                        <li key={"_li_" + key}>
                          <Link
                            to={food.link}
                            onClick={() => onChangeCategory(food.name)}>
                            <i className='mdi mdi-chevron-right me-1' />
                            {food.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardBody>
              </Card>
            </Col>
            {/*=== Filter Icon ===*/}

            {/* Search & Icon Name */}
            <Col lg='9'>
              <Row className='mb-3'>
                <Col xl='4' sm='6'>
                  <div className='mt-2'>
                    <h5>Food</h5>
                  </div>
                </Col>
                <Col lg='8' sm='6'>
                  <Form className='mt-4 mt-sm-0 float-sm-end d-flex align-items-center'>
                    <div className='search-box me-2'>
                      <div className='position-relative'>
                        <Input
                          type='text'
                          className='form-control border-0'
                          placeholder='Search...'
                        />
                        <i className='bx bx-search-alt search-icon' />
                      </div>
                    </div>
                    <Nav className='product-view-nav' pills>
                      <NavItem>
                        <NavLink
                          className={classnames({
                            active: activeTab === "1",
                          })}
                          onClick={() => {
                            toggleTab("1");
                          }}>
                          <i className='bx bx-grid-alt' />
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
                          <i className='bx bx-list-ul' />
                        </NavLink>
                      </NavItem>
                    </Nav>
                  </Form>
                </Col>
              </Row>
              {/*=== Search & Icon Name ===*/}

              {/* Images Food >>>NEW<<< */}
              <Row>
                {!isEmpty(foodList) &&
                  foodList.map((food, key) => (
                    <Col xl='4' sm='6' key={key}>
                      <Card
                        onClick={() =>
                          history.push(`/menu-food-detail/${food.id}`)
                        }>
                        <CardBody>
                          <div className='food-img position-relative'>
                            <img
                              src={foodImages[food.image]}
                              alt=''
                              className='img-fluid mx-auto d-block'
                            />
                          </div>
                          <div className='mt-4 text-center'>
                            <h5 className='mb-3 text-truncate'>
                              <Link
                                to={"/menu-food-detail" + food.id}
                                className='text-dark'>
                                {food.name}{" "}
                              </Link>
                            </h5>
                          </div>
                        </CardBody>
                      </Card>
                    </Col>
                  ))}
              </Row>
              {/*=== Images Food ===*/}

              {/* Pagination */}
              <Row>
                <Col lg='12'>
                  <Pagination className='pagination pagination-rounded justify-content-center mb-2'>
                    <PaginationItem disabled={page === 1}>
                      <PaginationLink
                        previous
                        href='#'
                        onClick={() => handlePageClick(page - 1)}
                      />
                    </PaginationItem>
                    {map(Array(totalPage), (item, i) => (
                      <PaginationItem active={i + 1 === page} key={i}>
                        <PaginationLink
                          onClick={() => handlePageClick(i + 1)}
                          href='#'>
                          {i + 1}
                        </PaginationLink>
                      </PaginationItem>
                    ))}
                    <PaginationItem disabled={page === totalPage}>
                      <PaginationLink
                        next
                        href='#'
                        onClick={() => handlePageClick(page + 1)}
                      />
                    </PaginationItem>
                  </Pagination>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

FoodsList.propTypes = {
  food: PropTypes.array,
  history: PropTypes.object,
  getMenus: PropTypes.func,
};

export default withRouter(FoodsList);
