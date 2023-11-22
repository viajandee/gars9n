import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { Link, withRouter } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getMenus } from "store/menus/actions";
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
  Pagination,
  PaginationItem,
  PaginationLink,
  Row,
} from "reactstrap";
import Breadcrumbs from "../../Breadcrumbs";
import { foodImages } from "../../../assets/images/product";
import { foodsData } from "../../../Common/Data/DataMenus";

const FoodsList = (props) => {
  document.title = "All Menus | Gars9n - Digital Menu & Ordering System";

  const dispatch = useDispatch();

  const { menu } = useSelector((state) => ({
    menu: state.menus.menu,
  }));

  // eslint-disable-next-line no-unused-vars
  const [FilterList, setFilterList] = useState([
    { id: 1, name: "KFC" },
    { id: 2, name: "McDonald's" },
    { id: 3, name: "Pizza Hut" },
    { id: 4, name: "Papa Johns" },
  ]);
  const { history } = props;
  const [foodList, setFoodList] = useState([]);
  const [page, setPage] = useState(1);
  // eslint-disable-next-line no-unused-vars
  const [totalPage, setTotalPage] = useState(5);

  const onChangeCategory = (category) => {
    setFoodList(foodsData.filter((menu) => menu.category === category));
  };

  useEffect(() => {
    setFoodList(foodsData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [foodsData]);

  useEffect(() => {
    dispatch(getMenus());
  }, [dispatch]);

  useEffect(() => {
    if (!isEmpty(foodList)) setFoodList(menu);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [menu]);

  const handlePageClick = (page) => {
    setPage(page);
  };

  return (
    <React.Fragment>
      <div className='page-content'>
        <Container fluid>
          <Breadcrumbs title='Menus' BreadcrumbItem='All Menus' />
          <Row>
            {/* Filter Icon */}
            <Col sm='3'>
              <Card>
                <CardBody>
                  <CardTitle className='mb-4'>Filters</CardTitle>
                  <div>
                    <h5 className='font-size-14 mb-3'>Category :</h5>
                    <ul className='list-unstyled product-list'>
                      {FilterList.map((menu, key) => (
                        <li key={"_li_" + key}>
                          <Link
                            to={menu.link}
                            onClick={() => onChangeCategory(menu.name)}>
                            <i className='mdi mdi-chevron-right me-1' />
                            {menu.name}
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
            <Col sm='9'>
              <Row className='mb-3'>
                <Col xl='4' sm='6'>
                  <div className='mt-2'>
                    <h5>Menu List</h5>
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
                    <Nav className='product-view-nav' pills></Nav>
                  </Form>
                </Col>
              </Row>
              {/*=== Search & Icon Name ===*/}

              {/* Images Food & menu page*/}
              <Row>
                {!isEmpty(foodList) &&
                  foodList.map((menu, key) => (
                    <Col xl='4' sm='6' key={"_col_" + key}>
                      <Card
                        onClick={() =>
                          history.push(`/all-menus/menu/${menu.id}`)
                        }>
                        <CardBody>
                          <div className='food-img position-relative'>
                            <img
                              src={foodImages[menu.image]}
                              alt=''
                              className='img-fluid mx-auto d-block'
                            />
                          </div>
                          <div className='mt-4 text-center'>
                            <h5 className='mb-3 text-truncate'>
                              <Link
                                to={"/all-menus/menu" + menu.id}
                                className='text-dark'>
                                {menu.name}
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
                <Col sm='12'>
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
  menus: PropTypes.array,
  history: PropTypes.object,
  getMenus: PropTypes.func,
};

export default withRouter(FoodsList);
