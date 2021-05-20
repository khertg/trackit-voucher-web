import React, { Fragment, useEffect, useRef, useState } from 'react';
import { VoucherFilter } from '../../components/VoucherFilter';
import { VoucherItem } from '../../components/VoucherItem';
import {
  ISelectedPage,
  ISelectedVoucher,
  IVoucherFilter,
} from '../../helpers/common';
import { IPagedVoucher, IVoucher } from '../../models/voucher';
import { deleteById, getList } from '../../services/voucher';
import queryString from 'query-string';
import { useSelector, useDispatch } from 'react-redux';
import { hideLoading, showLoading } from '../../state/actions/loadingAction';
import { FilterState } from '../../state/reducers/filterReducer';
import ReactPaginate from 'react-paginate';

export const Voucher: React.FC = () => {
  //Global State
  const showFilter = useSelector<FilterState>(
    (state) => state.filter.showFilter
  );
  const dispatch = useDispatch();

  //Local State
  const [voucherList, setVoucherList] = useState<IVoucher[]>([]);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [itemPerPage, setItemPerPage] = useState<number>(5);
  const [voucherFilter, setVoucherFilter] = useState<IVoucherFilter>({
    is_sold: '',
    sortBy: 'createdAt:desc',
    limit: 5,
    page: 1,
  });
  const [selectAll, setSelectAll] = useState<boolean>(false);
  const [selectedVoucher, setSelectedVoucher] = useState<ISelectedVoucher[]>(
    []
  );
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
  }, [voucherFilter]);

  const isVoucherExist = (voucherId: string) =>
    selectedVoucher.some(({ id }) => id === voucherId);

  const handleVoucherSelection = (
    id: string,
    code: string,
    isSelected: boolean
  ) => {
    if (isSelected) {
      if (!isVoucherExist(id)) {
        setSelectedVoucher([...selectedVoucher, { id, code }]);
      }
    } else {
      setSelectedVoucher(
        selectedVoucher.filter((voucher) => voucher.id !== id)
      );
    }
  };

  const handleSelectAll = (isChecked: boolean) => {
    setSelectAll(isChecked);
    if (isChecked) {
      let vouchers = voucherList.map((voucher) => {
        return { id: voucher._id, code: voucher.code };
      });
      setSelectedVoucher(vouchers);
    } else {
      setSelectedVoucher([]);
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
        setVoucherList(data.docs);
        setTotalPages(data.totalPages);
        dispatch(hideLoading());
      })
      .catch((err) => {
        console.log(err);
        dispatch(hideLoading());
      });
  };

  const getItemNumber = (index: number) => {
    if (currentPage == 0) {
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
              />
            </td>
            <td>#</td>
            <td>Voucher Code</td>
            <td>Is Sold ?</td>
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
              key={voucher._id}
              id={voucher._id}
              number={getItemNumber(index)}
              code={voucher.code}
              is_sold={voucher.is_sold}
              sold_to={voucher.sold_to}
              createdAt={voucher.createdAt}
              updatedAt={voucher.updatedAt}
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
