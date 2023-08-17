// ========== IN THE CARD ========== //
import React from "react";
import {
  Card,
  CardBody,
  CardFooter,
  UncontrolledTooltip,
} from "reactstrap";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { map, size } from "lodash";

const CardContact = (props) => {
  const { store } = props;

  return (
    <>
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
            <p className='text-muted'>{store.designation}</p>

            <div>
              {map(
                store.tags,
                (tag, index) =>
                  index < 2 && (
                    <Link
                      to='#'
                      className='badge bg-primary front-size-11 m-1'
                      key={"_skill_" + store.id + index}>
                      {tag}
                    </Link>
                  )
              )}
              {size(store.tags) > 2 && (
                <Link
                  to='#'
                  className='badge bg-primary front- size-11 m-1'
                  key={"_skill_" + store.id}>
                  {size(store.tags) - 1} + more
                </Link>
              )}
            </div>
          </CardBody>
          <CardFooter className='bg-transparent border-top'>
            <div className='contact-links d-flex front-size-20'>
              <div className='flex-fill'>
                <Link to='#' id={"message" + store.id}>
                  <i className='bx bx-message-square-dots' />
                  <UncontrolledTooltip
                    plascement='top'
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
                    project
                  </UncontrolledTooltip>
                </Link>
              </div>

              <div className='flex-fill'>
                <Link to='#' id={"profile" + store.id}>
                  <i className='bx bx-store-circle' />
                  <UncontrolledTooltip
                    placeement='top'
                    target={"profile" + store.id}>
                    Profile
                  </UncontrolledTooltip>
                </Link>
              </div>
            </div>
          </CardFooter>
        </Card>
    </>
  );
};

CardContact.propTypes = {
  store: PropTypes.object,
};

export default CardContact;
