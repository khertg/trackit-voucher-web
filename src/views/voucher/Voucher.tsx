import React, { Fragment, useState } from 'react';
import { VoucherFilter } from '../../components/VoucherFilter';
import { VoucherItem } from '../../components/VoucherItem';
import { ISelectedPage } from '../../helpers/common';
import { IVoucher, IVoucherFilter } from '../../models/voucher';
import { deleteById } from '../../services/voucher';
import { useSelector, useDispatch } from 'react-redux';
import { hideLoading, showLoading } from '../../state/actions/loadingAction';
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
} from '../../state/modules/voucher';
import { useForm } from 'react-hook-form';
import { hideGlobalLoading, showGlobalLoading } from '../../state/modules/loading';

export const Voucher: React.FC = () => {
  //Global State
  const voucherList = useSelector(voucherSelector);
  const selectVoucher = useSelector(selectedVoucherSelector);
  const showFilter = useSelector(voucherToggleFilterSelector);
  const voucherFilter = useSelector(voucherFilterSelector);
  const totalPage = useSelector(voucherTotalPageSelector);
  const rowCountPerPage = useSelector(voucherRowCountPerPageSelector);
  const filterPage = useSelector(voucherPageFilterSelector);
  const currentPage = useSelector(voucherCurrenPageSelector);
  const dispatch = useDispatch();

  //Local State
  const [selectAll, setSelectAll] = useState<boolean>(false);
  const [showAllVoucherCode, setShowAllVoucherCode] = useState<boolean>(false);

  const { register } = useForm({
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
          alert(
            `Successfully deleted voucher with id = ${id}.`
          );
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
      <table>
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
                  <select
                    id="voucher_per_page"
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
                  </select>
                  &nbsp;
                  <label htmlFor="voucher-per-page">per page</label>
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
              <button
                onClick={() => setShowAllVoucherCode(!showAllVoucherCode)}
              >
                {showAllVoucherCode ? <span>🙉</span> : <span>🙈</span>}
              </button>
              &nbsp;Voucher Code
            </td>
            <td>Status</td>
            <td>Active</td>
            <td>Sold To</td>
            <td>Created At</td>
            <td>Updated At</td>
            <td>Options</td>
          </tr>
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
      </table>
    </div>
  );
};
