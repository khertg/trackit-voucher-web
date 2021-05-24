import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { VoucherForm } from '../../components/VoucherForm';
import { IVoucher } from '../../models/voucher';
import { edit, get } from '../../services/voucher';
import history from '../../history';
import { NotFound } from '../NotFound';
import { LoadingState } from '../../state/reducers/loadingReducer';
import { useDispatch, useSelector } from 'react-redux';
import { hideLoading, showLoading } from '../../state/actions/loadingAction';

interface ParamTypes {
  id: string;
}

export const VoucherEdit: React.FC = () => {
  //Global State
  const loading = useSelector<LoadingState>((state) => state.loading.isLoading);
  const dispatch = useDispatch();

  //Local State
  const [voucher, setVoucher] =
    useState<{ voucher_code: string; buyer?: string; sold?: boolean }>();
  const { id } = useParams<ParamTypes>();

  useEffect(() => {
    const fetchData = async () => {
      dispatch(showLoading());
      await get(id)
        .then((voucherData: IVoucher) => {
          dispatch(hideLoading());
          setVoucher({
            voucher_code: voucherData.voucher_code,
            buyer: voucherData.buyer,
            sold: voucherData.sold,
          });
        })
        .catch((err) => {
          console.log(err);
          dispatch(hideLoading());
        });
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onEdit = async (data: any) => {
    const { voucher_code, buyer, sold } = data;
    dispatch(showLoading());
    edit(id, voucher_code, buyer, sold)
      .then((data) => {
        history.push('/voucher');
      })
      .catch((err) => {
        console.log(err);
        alert('An error occured');
        dispatch(hideLoading());
      });
  };

  return voucher ? (
    <div>
      <VoucherForm onSubmit={onEdit} preloadedValues={voucher} />
    </div>
  ) : loading ? (
    <div></div>
  ) : (
    <NotFound />
  );
};
