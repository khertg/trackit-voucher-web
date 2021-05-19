import React, { Fragment, useEffect, useState } from 'react';
import { VoucherFilter } from '../../components/VoucherFilter';
import { VoucherItem } from '../../components/VoucherItem';
import { ISelectedVoucher, IVoucherFilter } from '../../helpers/common';
import { IVoucher } from '../../models/voucher';
import { deleteById, getList } from '../../services/voucher';
import queryString from 'query-string';
import { LoadingState } from '../../state/reducers/loadingReducer';
import { useSelector, useDispatch } from 'react-redux';
import { hideLoading, showLoading } from '../../state/actions/loadingAction';
import { FilterState } from '../../state/reducers/filterReducer';

export const Voucher: React.FC = () => {
  //Global State
  const loading = useSelector<LoadingState>((state) => state.loading.isLoading);
  const showFilter = useSelector<FilterState>(
    (state) => state.filter.showFilter
  );
  const dispatch = useDispatch();

  //Local State
  const [voucherList, setVoucherList] = useState<IVoucher[]>([]);
  const [voucherFilter, setVoucherFilter] = useState<IVoucherFilter>({
    is_sold: '',
    sortBy: 'createdAt:desc',
  });
  const [selectAll, setSelectAll] = useState<boolean>(false);
  const [selectedVoucher, setSelectedVoucher] = useState<ISelectedVoucher[]>(
    []
  );

  useEffect(() => {
    dispatch(showLoading());
    fethVoucher();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fethVoucher = () => {
    getList('?sortBy=createdAt:desc')
      .then((vouchers: IVoucher[]) => {
        setVoucherList(vouchers);
        dispatch(hideLoading());
      })
      .catch((err) => {
        console.log(err);
        dispatch(hideLoading());
      });
  };

  const isVoucherExist = (voucherId: string) =>
    selectedVoucher.some(({ id }) => id == voucherId);

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
          fethVoucher();
        })
        .catch((err) => {
          console.log(err);
          alert('Error occured while deleting');
          dispatch(hideLoading());
        });
    }
  };

  const handleFilter = (filter: IVoucherFilter) => {
    let queryStringFilter = `?${queryString.stringify(filter)}`;

    dispatch(showLoading());
    getList(queryStringFilter)
      .then((vouchers: IVoucher[]) => {
        setVoucherList(vouchers);
        dispatch(hideLoading());
      })
      .catch((err) => {
        console.log(err);
        dispatch(hideLoading());
      });
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
          <tr>
            <td>
              <input
                type="checkbox"
                onChange={(e) => {
                  handleSelectAll(e.target.checked);
                }}
              />
            </td>
            <td>Voucher Code</td>
            <td>Is Sold ?</td>
            <td>Sold To</td>
            <td>Created At</td>
            <td>Updated At</td>
            <td>Options</td>
          </tr>
        </thead>
        <tbody>
          {voucherList.map((voucher: IVoucher) => (
            <VoucherItem
              handleSelect={handleVoucherSelection}
              handleDelete={handleDelete}
              isSelected={selectAll}
              key={voucher._id}
              id={voucher._id}
              code={voucher.code}
              is_sold={voucher.is_sold}
              sold_to={voucher.sold_to}
              createdAt={voucher.createdAt}
              updatedAt={voucher.updatedAt}
            />
          ))}

          {voucherList.length < 1 && (
            <tr>
              <td colSpan={7}>No results!</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};
