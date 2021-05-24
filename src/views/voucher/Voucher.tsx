import React, { Fragment, useEffect, useRef, useState } from 'react';
import { VoucherFilter } from '../../components/VoucherFilter';
import { VoucherItem } from '../../components/VoucherItem';
import { ISelectedPage } from '../../helpers/common';
import { IPagedVoucher, IVoucher, IVoucherFilter } from '../../models/voucher';
import { deleteById, getList } from '../../services/voucher';
import queryString from 'query-string';
import { useSelector, useDispatch } from 'react-redux';
import { hideLoading, showLoading } from '../../state/actions/loadingAction';
import { FilterState } from '../../state/reducers/filterReducer';
import ReactPaginate from 'react-paginate';
import { VoucherState } from '../../state/reducers/voucherReducer';
import { setSelectedVoucher } from '../../state/actions/voucherAction';

export const Voucher: React.FC = () => {
  //Global State
  const selectVoucher = useSelector(
    (state: VoucherState) => state.voucher.selected
  );
  const reloadList = useSelector(
    (state: VoucherState) => state.voucher.reloadList
  );
  const showFilter = useSelector(
    (state: FilterState) => state.filter.showFilter
  );
  const dispatch = useDispatch();

  //Local State
  const [voucherList, setVoucherList] = useState<IVoucher[]>([]);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [itemPerPage, setItemPerPage] = useState<number>(5);
  const [voucherFilter, setVoucherFilter] = useState<IVoucherFilter>({
    sold: '',
    sort_by: 'id:desc',
    limit: 5,
    page: 1,
  });
  const [selectAll, setSelectAll] = useState<boolean>(false);
  const [showAllVoucherCode, setShowAllVoucherCode] = useState<boolean>(false);
  const firstRun = useRef(true);

  useEffect(() => {
    //Prevents executing codes below in the first load.
    if (firstRun.current) {
      firstRun.current = false;
      return;
    }
    dispatch(showLoading());
    fetchPagedVoucher();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [voucherFilter, reloadList]);

  const isVoucherExist = (voucherId: string) =>
    selectVoucher.some(({ id }) => id === voucherId);

  const handleVoucherSelection = (
    id: string,
    voucher_code: string,
    isSelected: boolean
  ) => {
    if (isSelected) {
      if (!isVoucherExist(id)) {
        dispatch(setSelectedVoucher([...selectVoucher, { id, voucher_code }]));
      }
    } else {
      dispatch(
        setSelectedVoucher(selectVoucher.filter((voucher) => voucher.id !== id))
      );
    }
  };

  const handleSelectAll = (isChecked: boolean) => {
    setSelectAll(isChecked);
    if (isChecked) {
      let vouchers = voucherList.map((voucher) => {
        return { id: voucher.id, voucher_code: voucher.voucher_code };
      });
      dispatch(setSelectedVoucher(vouchers));
    } else {
      dispatch(setSelectedVoucher([]));
    }
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete?')) {
      dispatch(showLoading());
      deleteById(id)
        .then(() => {
          fetchPagedVoucher();
        })
        .catch((err) => {
          console.log(err);
          alert('Error occured while deleting');
          dispatch(hideLoading());
        });
    }
  };

  const handleFilter = (filter: IVoucherFilter) => {
    setCurrentPage(0);
    setVoucherFilter({ ...voucherFilter, ...filter, page: 0 });
  };

  const handlePageClick = (data: ISelectedPage) => {
    setSelectAll(false);
    dispatch(setSelectedVoucher([]));
    setCurrentPage(data.selected);
    setVoucherFilter({
      ...voucherFilter,
      page: data.selected + 1,
    });
  };

  const fetchPagedVoucher = () => {
    const query = queryString.stringify(voucherFilter);
    getList(`?${query}`)
      .then((data: IPagedVoucher) => {
        setVoucherList(data.data);
        setTotalPages(data.totalPages);
        dispatch(hideLoading());
      })
      .catch((err) => {
        console.log(err);
        dispatch(hideLoading());
      });
  };

  const getItemNumber = (index: number) => {
    if (currentPage === 0) {
      return index + 1;
    } else {
      return itemPerPage * currentPage + 1 + index;
    }
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
            <td colSpan={8}>
              <div className="paging-header">
                <div>
                  <ReactPaginate
                    previousLabel={'previous'}
                    nextLabel={'next'}
                    breakLabel={'...'}
                    breakClassName={'break-me'}
                    pageCount={totalPages}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    onPageChange={handlePageClick}
                    initialPage={currentPage}
                    forcePage={currentPage}
                    containerClassName={'pagination'}
                    activeClassName={'active'}
                  />
                </div>
                <div>
                  <select
                    name="voucher-per-page"
                    id="voucher-per-page"
                    onChange={(e) => {
                      setSelectAll(false);
                      dispatch(setSelectedVoucher([]));
                      setItemPerPage(parseInt(e.target.value));
                      setCurrentPage(0);
                      setVoucherFilter({
                        ...voucherFilter,
                        limit: parseInt(e.target.value),
                        page: 1,
                      });
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
            <td>#</td>
            <td>
              <button
                onClick={() => setShowAllVoucherCode(!showAllVoucherCode)}
              >
                {showAllVoucherCode ? <span>🙉</span> : <span>🙈</span>}
              </button>
              &nbsp;Voucher Code
            </td>
            <td>Sold</td>
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
              number={getItemNumber(index)}
              voucher_code={voucher.voucher_code}
              sold={voucher.sold}
              buyer={voucher.buyer}
              created_at={voucher.created_at}
              updated_at={voucher.updated_at}
            />
          ))}

          {voucherList.length < 1 && (
            <tr>
              <td colSpan={8}>No results!</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};
