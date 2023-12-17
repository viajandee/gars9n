import React, { Fragment } from "react";
import PropTypes from "prop-types";
import {
  useTable,
  useGlobalFilter,
  // useAsyncDebounce,
  useSortBy,
  useFilters,
  useExpanded,
  usePagination,
} from "react-table";
import { Table, Row, Col, Button } from "reactstrap";
import { Filter, DefaultColumnFilter } from "./filter";

const TableContainer = ({
  columns,
  data,
  isGlobalFilter,
  isAddOptions,
  isAddUserList,
  handleOrderClicks,
  handleUserClick,
  handleCustomerClick,
  isAddCustList,
  customPageSize,
  className,
  customPageSizeOptions,
}) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    canPreviousPage,
    canNextPage,
    pageOptions,

    gotoPage,
    nextPage,
    previousPage,

    state: { pageIndex },
  } = useTable(
    {
      columns,
      data,
      defaultColumn: { Filter: DefaultColumnFilter },
      initialState: {
        pageIndex: 0,
        pageSize: customPageSize,
        sortBy: [
          {
            desc: true,
          },
        ],
      },
    },
    useGlobalFilter,
    useFilters,
    useSortBy,
    useExpanded,
    usePagination
  );

  const generateSortingIndicator = (column) => {
    return column.isSorted ? (column.isSortedDesc ? " 🔽" : " 🔼") : "";
  };

  const onChangeInInput = (event) => {
    const page = event.target.value ? Number(event.target.value) - 1 : 0;
    gotoPage(page);
  };

  return (
    <Fragment>
      <Row className='mb-2'>
        {isAddOptions && (
          <Col sm='7'>
            <div className='text-sm-end'>
              <Button
                type='button'
                color='success'
                className='btn-rounded  mb-2 me-2'
                onClick={handleOrderClicks}>
                <i className='mdi mdi-plus me-1' />
                Add New Order
              </Button>
            </div>
          </Col>
        )}

        {isAddCustList && (
          <Col sm='7'>
            <div className='text-sm-end'>
              <Button
                type='button'
                color='success'
                className='btn-rounded mb-2 me-2'
                onClick={handleCustomerClick}>
                <i className='mdi mdi-plus me-1' />
                New Customers
              </Button>
            </div>
          </Col>
        )}
      </Row>

      <div className='table-responsive react-table'>
        <Table bordered hover {...getTableProps()} className={className}>
          <thead className='table-light table-nowrap'>
            {headerGroups.map((headerGroup) => (
              <tr key={headerGroup.id} {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th key={column.id}>
                    <div className='mb-2' {...column.getSortByToggleProps()}>
                      {column.render("Header")}
                      {generateSortingIndicator(column)}
                    </div>
                    <Filter column={column} />
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          <tbody {...getTableBodyProps()}>
            {page.map((row) => {
              prepareRow(row);
              return (
                <Fragment key={row.getRowProps().key}>
                  <tr>
                    {row.cells.map((cell) => {
                      return (
                        <td key={cell.id} {...cell.getCellProps()}>
                          {cell.render("Cell")}
                        </td>
                      );
                    })}
                  </tr>
                </Fragment>
              );
            })}
          </tbody>
        </Table>
      </div>

      <Row className='justify-content-md-center justify-content-center align-items-center'>
        <Col className='col-md-auto'>
          <div className='d-flex gap-1'>
            <Button
              style={{
                paddingBottom: "0.5px",
                fontSize: "17px",
                borderColor: "white",
                backgroundColor: "#32394e",
              }}
              color='white'
              className='btn-rounded'
              onClick={previousPage}
              disabled={!canPreviousPage}>
              <i className='bx bx-left-arrow-alt' />
            </Button>
          </div>
        </Col>

        <Col className='col-md-auto d-none d-md-block '>
          <strong>
            {pageIndex + 1} - {pageOptions.length}
          </strong>
        </Col>

        <Col className='col-md-auto'>
          <div
            min={1}
            max={pageOptions.length}
            defaultValue={pageIndex + 1}
            onChange={onChangeInInput}
          />
        </Col>

        <Col className='col-md-auto'>
          <div className='d-flex gap-1'>
            <Button
              style={{
                marginLeft: "-25px",
                paddingBottom: "0.5px",
                fontSize: "17px",
                borderColor: "white",
                backgroundColor: "#32394e",
              }}
              color='white'
              className='btn-rounded'
              onClick={nextPage}
              disabled={!canNextPage}>
              <i className='bx bx-right-arrow-alt' />
            </Button>
          </div>
        </Col>
      </Row>
    </Fragment>
  );
};

TableContainer.propTypes = {
  preGlobalFilteredRows: PropTypes.any,
};

export default TableContainer;
