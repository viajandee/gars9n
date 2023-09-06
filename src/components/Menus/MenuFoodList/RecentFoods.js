import React from "react";
import PropTypes from "prop-types";
import { Card, CardBody, Col, Row } from "reactstrap";
import { Link } from "react-router-dom";
import { map } from "lodash";
import images from "assets/images";

const RecentFoods = ({ recentFoods }) => {
  return (
    <Row className='mt-3'>
      <Col lg={12}>
        <div>
          <h5 className='mb-3'>Recent food :</h5>
          <Row>
            {map(recentFoods, (food, key) => (
              <Col xl='4' sm='6' key={"__food__" + key}>
                <Card>
                  <CardBody>
                    <Row className='align-items-center'>
                      <Col md='4'>
                        <img
                          src={images[food.img]}
                          alt=''
                          className='img-fluid mx-auto d-block'
                        />
                      </Col>
                      <Col md='8'>
                        <div className='text-center text-md-start pt-3 pt-md-0'>
                          <h5 className='text-truncate'>
                            <Link to='#' className='text-dark'>
                              {food.name}
                            </Link>
                          </h5>
                        </div>
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      </Col>
    </Row>
  );
};

RecentFoods.propTypes = {
  recentFoods: PropTypes.array,
};

export default RecentFoods;
