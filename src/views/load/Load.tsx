import React, { Fragment, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  ILoad,
  ILoadFilter,
  IPagedLoad,
  ISelectedLoad,
} from '../../models/load';
import { deleteById, getList } from '../../services/load';
import { hideLoading, showLoading } from '../../state/actions/loadingAction';
import queryString from 'query-string';
import { LoadItem } from '../../components/LoadItem';
import ReactPaginate from 'react-paginate';
import { ISelectedPage, rowPerPage } from '../../helpers/common';
import { LoadFilter } from '../../components/LoadFilter';
import { toggleFilterSelector } from '../../state/modules/load';

export const Load: React.FC = () => {
  //Global State
  const showFilter = useSelector(toggleFilterSelector);
  const dispatch = useDispatch();

  //Local State
  const [loadList, setLoadList] = useState<ILoad[]>([]);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [itemPerPage, setItemPerPage] = useState<number>(5);
  const [loadFilter, setLoadFilter] = useState<ILoadFilter>({
    status: '',
    sort_by: 'created_at:desc',
    limit: rowPerPage(),
    page: 0,
  });
  const [selectAll, setSelectAll] = useState<boolean>(false);
  const [selectedLoad, setSelectedLoad] = useState<ISelectedLoad[]>([]);

  const firstRun = useRef(true);

  useEffect(() => {
    //Prevents executing codes below in the first load.
    if (firstRun.current) {
      firstRun.current = false;
      return;
    }
    dispatch(showLoading());
    fetchPagedLoad();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadFilter]);

  const handleDelete = (id: number) => {
    if (window.confirm('Are you sure you want to delete?')) {
      dispatch(showLoading());
      deleteById(id)
        .then(() => {
          fetchPagedLoad();
        })
        .catch((err) => {
          console.log(err);
          alert('Error occured while deleting');
          dispatch(hideLoading());
        });
    }
  };

  const handleSelectAll = (isChecked: boolean) => {
    setSelectAll(isChecked);
    if (isChecked) {
      let loads = loadList.map((load) => {
        return {
          id: load.id,
          buyer: load.buyer,
          amount: load.amount,
          phone_number: load.phone_number,
          status: load.status,
        };
      });
      setSelectedLoad(loads);
    } else {
      setSelectedLoad([]);
    }
  };

  const isLoadExist = (loadId: number) =>
    selectedLoad.some(({ id }) => id === loadId);

  const handleLoadSelection = (
    id: number,
    phone_number: string,
    isSelected: boolean
  ) => {
    if (isSelected) {
      if (!isLoadExist(id)) {
        setSelectedLoad([...selectedLoad, { id, phone_number }]);
      }
    } else {
      setSelectedLoad(selectedLoad.filter((voucher) => voucher.id !== id));
    }
  };

  const handlePageClick = (data: ISelectedPage) => {
    setCurrentPage(data.selected);
    setLoadFilter({
      ...loadFilter,
      page: data.selected,
    });
  };

  const handleFilter = (filter: ILoadFilter) => {
    setCurrentPage(0);
    setLoadFilter({ ...loadFilter, ...filter, page: 0 });
  };

  const fetchPagedLoad = () => {
    const query = queryString.stringify(loadFilter);
    getList(`?${query}`)
      .then((data: IPagedLoad) => {
        setLoadList(data.data);
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
          <LoadFilter onSubmit={handleFilter} preloadedValues={loadFilter} />
          <br />
        </Fragment>
      )}
      <div className="table-responsive">
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
                        setLoadFilter({
                          ...loadFilter,
                          limit: parseInt(e.target.value),
                          page: 0,
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
              <td>Buyer</td>
              <td>Number</td>
              <td>Amount</td>
              <td>Status</td>
              <td>Created At</td>
              <td>Updated At</td>
              <td>Options</td>
            </tr>
          </thead>
          <tbody>
            {loadList.map((load: ILoad, index) => (
              <LoadItem
                handleSelect={handleLoadSelection}
                handleDelete={handleDelete}
                isSelected={selectAll}
                key={load.id}
                id={load.id}
                rowNumber={getItemNumber(index)}
                buyer={load.buyer}
                amount={load.amount}
                phone_number={load.phone_number}
                status={load.status}
                created_at={load.created_at}
                updated_at={load.updated_at}
              />
            ))}

            {loadList.length < 1 && (
              <tr>
                <td colSpan={9}>No results!</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
