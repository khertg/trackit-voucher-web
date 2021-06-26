import React, { Fragment, useState } from 'react';
import { VoucherFilter } from '../../components/VoucherFilter';
import { VoucherItem } from '../../components/VoucherItem';
import { ISelectedPage } from '../../helpers/common';
import { IVoucher, IVoucherFilter } from '../../models/voucher';
import { deleteById } from '../../services/voucher';
import { useSelector, useDispatch } from 'react-redux';
import { hideLoading } from '../../state/actions/loadingAction';
import ReactPaginate from 'react-paginate';
import {
  fetchVoucherAction,
  selectedVoucherSelector,
  voucherFilterSelector,
  voucherSelector,
  voucherToggleFilterSelector,
  voucherTotalPageSelector,
  voucherRowCountPerPageSelector,
  updateRowCountPerPageAction,
  setSelectedVoucherAction,
  updateFilterAction,
  voucherCurrenPageSelector,
  voucherPageFilterSelector,
  voucherTotalItemsSelector,
  voucherToggleMobileListHeaderSelector,
} from '../../state/modules/voucher';
import { useForm } from 'react-hook-form';
import {
  hideGlobalLoading,
  showGlobalLoading,
} from '../../state/modules/loading';
import { Row, Col, Button, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';

export const Voucher: React.FC = () => {
  //Global State
  const voucherList = useSelector(voucherSelector);
  const selectVoucher = useSelector(selectedVoucherSelector);
  const showFilter = useSelector(voucherToggleFilterSelector);
  const showMobileHeader = useSelector(voucherToggleMobileListHeaderSelector);
  const voucherFilter = useSelector(voucherFilterSelector);
  const totalPage = useSelector(voucherTotalPageSelector);
  const totalVoucher = useSelector(voucherTotalItemsSelector);
  const rowCountPerPage = useSelector(voucherRowCountPerPageSelector);
  const filterPage = useSelector(voucherPageFilterSelector);
  const currentPage = useSelector(voucherCurrenPageSelector);
  const dispatch = useDispatch();

  //Local State
  const [selectAll, setSelectAll] = useState<boolean>(false);
  const [showAllVoucherCode, setShowAllVoucherCode] = useState<boolean>(false);

  const { register, getValues } = useForm({
    defaultValues: { voucher_per_page: rowCountPerPage },
  });

  const isVoucherExist = (voucherId: number) =>
    selectVoucher.some(({ id }) => id === voucherId);

  const handleVoucherSelection = (
    id: number,
    voucher_code: string,
    isSelected: boolean
  ) => {
    if (isSelected) {
      if (!isVoucherExist(id)) {
        dispatch(
          setSelectedVoucherAction([...selectVoucher, { id, voucher_code }])
        );
      }
    } else {
      dispatch(
        setSelectedVoucherAction(
          selectVoucher.filter((voucher) => voucher.id !== id)
        )
      );
    }
  };

  const handleSelectAll = (isChecked: boolean) => {
    setSelectAll(isChecked);
    if (isChecked) {
      let vouchers = voucherList.map((voucher) => {
        return { id: voucher.id, voucher_code: voucher.voucher_code };
      });
      dispatch(setSelectedVoucherAction(vouchers));
    } else {
      dispatch(setSelectedVoucherAction([]));
    }
  };

  const handleDelete = (id: number) => {
    if (window.confirm('Are you sure you want to delete?')) {
      dispatch(showGlobalLoading());
      deleteById(id)
        .then(() => {
          dispatch(
            fetchVoucherAction({
              ...voucherFilter,
              page: 0,
            })
          );
          alert(`Successfully deleted voucher with id = ${id}.`);
          dispatch(hideGlobalLoading());
        })
        .catch((err) => {
          console.log(err);
          alert('Error occured while deleting');
          dispatch(hideLoading());
        });
    }
  };

  const handleFilter = (filter: IVoucherFilter) => {
    dispatch(updateFilterAction({ ...voucherFilter, ...filter, page: 0 }));
  };

  const handlePageClick = (data: ISelectedPage) => {
    const page = data.selected;
    setSelectAll(false);
    dispatch(
      fetchVoucherAction({
        ...voucherFilter,
        page: page,
      })
    );
  };

  const showItemCounter = () => {
    const endCount = (currentPage + 1) * getValues().voucher_per_page;
    const startCount = endCount - (getValues().voucher_per_page - 1);
    return (
      <div>
        Showing {startCount}-{endCount} of {totalVoucher}
      </div>
    );
  };

  return (
    <div>
      {showFilter && (
        <Fragment>
          <VoucherFilter
            onSubmit={handleFilter}
            preloadedValues={voucherFilter}
          />
          <br />
        </Fragment>
      )}
      <Row>
        <Col>
          <div className="table-responsive">
            <table className="custom-table">
              <thead>
                <tr className="no-border">
                  <td colSpan={9}>
                    <div className="paging-header">
                      <div>
                        <ReactPaginate
                          previousLabel={'previous'}
                          nextLabel={'next'}
                          breakLabel={'...'}
                          breakClassName={'break-me'}
                          pageCount={totalPage}
                          marginPagesDisplayed={2}
                          pageRangeDisplayed={5}
                          onPageChange={handlePageClick}
                          initialPage={filterPage}
                          forcePage={currentPage}
                          containerClassName={'pagination'}
                          activeClassName={'active'}
                        />
                      </div>
                      <div>
                        <div className="d-flex">
                          <Form.Control
                            as="select"
                            id="voucher_per_page"
                            className="form-control-sm"
                            style={{ width: '59px' }}
                            {...register('voucher_per_page')}
                            onChange={(e) => {
                              setSelectAll(false);
                              const filter = { ...voucherFilter };
                              filter.limit = parseInt(e.target.value);
                              filter.page = 0;
                              dispatch(updateRowCountPerPageAction(filter));
                            }}
                          >
                            <option value="5">5</option>
                            <option value="10">10</option>
                            <option value="15">15</option>
                            <option value="20">20</option>
                          </Form.Control>
                          &nbsp;
                          <label
                            style={{ width: '65px' }}
                            htmlFor="voucher-per-page"
                          >
                            per page
                          </label>
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <input
                      type="checkbox"
                      onChange={(e) => {
                        handleSelectAll(e.target.checked);
                      }}
                      checked={selectAll}
                    />
                  </td>
                  <td>ID</td>
                  <td>
                    <Button
                      variant="light"
                      size="sm"
                      onClick={() => setShowAllVoucherCode(!showAllVoucherCode)}
                    >
                      {showAllVoucherCode ? <span>🙉</span> : <span>🙈</span>}
                    </Button>
                    &nbsp;Voucher Code
                  </td>
                  <td>Status</td>
                  <td>Active</td>
                  <td>Sold To</td>
                  <td>Created At</td>
                  <td>Updated At</td>
                  <td>Options</td>
                </tr>
                {showMobileHeader && (
                  <tr className="mobile-view">
                    <td>
                      <div className="d-flex align-items-center">
                        <div>
                          <input
                            type="checkbox"
                            onChange={(e) => {
                              handleSelectAll(e.target.checked);
                            }}
                            checked={selectAll}
                          />
                        </div>
                        <div style={{ paddingLeft: '15px' }}>
                          <Button
                            variant="light"
                            size="sm"
                            onClick={() =>
                              setShowAllVoucherCode(!showAllVoucherCode)
                            }
                          >
                            {showAllVoucherCode ? (
                              <span>🙉</span>
                            ) : (
                              <span>🙈</span>
                            )}
                          </Button>
                        </div>
                        &nbsp;
                        <div>Voucher List</div>
                      </div>
                    </td>
                  </tr>
                )}
              </thead>
              <tbody>
                {voucherList.map((voucher: IVoucher, index) => (
                  <VoucherItem
                    handleSelect={handleVoucherSelection}
                    handleDelete={handleDelete}
                    isSelected={selectAll}
                    isShow={showAllVoucherCode}
                    key={voucher.id}
                    id={voucher.id}
                    voucher_code={voucher.voucher_code}
                    status={voucher.status}
                    active={voucher.active}
                    buyer={voucher.buyer}
                    created_at={voucher.created_at}
                    updated_at={voucher.updated_at}
                  />
                ))}

                {voucherList.length < 1 && (
                  <tr>
                    <td colSpan={9}>No results!</td>
                  </tr>
                )}
              </tbody>
              <tfoot>
                <tr className="mobile-view">
                  <td>
                    <div className="d-flex align-items-center">
                      {showItemCounter()}
                      <div className="ml-auto">
                        <ReactPaginate
                          previousLabel={<FontAwesomeIcon icon={faAngleLeft} />}
                          nextLabel={<FontAwesomeIcon icon={faAngleRight} />}
                          breakLabel={'...'}
                          breakClassName={'break-me'}
                          pageCount={totalPage}
                          marginPagesDisplayed={1}
                          pageRangeDisplayed={1}
                          onPageChange={handlePageClick}
                          initialPage={filterPage}
                          forcePage={currentPage}
                          containerClassName={'pagination'}
                          activeClassName={'active'}
                        />
                      </div>
                    </div>
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </Col>
      </Row>
      <br />
    </div>
  );
};
