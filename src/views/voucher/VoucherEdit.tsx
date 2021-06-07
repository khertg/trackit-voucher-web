import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { VoucherForm } from '../../components/VoucherForm';
import { IVoucher, IVoucherForm } from '../../models/voucher';
import { edit, get } from '../../services/voucher';
import history from '../../history';
import { NotFound } from '../NotFound';
import { useDispatch, useSelector } from 'react-redux';
import {
  globalLoadingSelector,
  hideGlobalLoading,
  showGlobalLoading,
} from '../../state/modules/loading';

interface ParamTypes {
  id: string;
}

export const VoucherEdit: React.FC = () => {
  //Global State
  const loading = useSelector(globalLoadingSelector);
  const dispatch = useDispatch();

  //Local State
  const [voucher, setVoucher] = useState<IVoucherForm>();
  const { id } = useParams<ParamTypes>();

  useEffect(() => {
    const fetchData = async () => {
      dispatch(showGlobalLoading());
      await get(parseInt(id))
        .then((voucherData: IVoucher) => {
          dispatch(hideGlobalLoading());
          const data: IVoucherForm = {
            ...voucherData,
            active: voucherData.active + '',
            status: voucherData.status + '',
          };
          setVoucher(data);
        })
        .catch((err) => {
          console.log(err);
          dispatch(hideGlobalLoading());
        });
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onEdit = async (data: any) => {
    dispatch(showGlobalLoading());
    edit(parseInt(id), data)
      .then((data) => {
        const redirect = window.confirm(
          'Voucher successfully updated.\nGo to voucher list?'
        );
        if (redirect) {
          history.push('/voucher');
        }
        dispatch(hideGlobalLoading());
      })
      .catch((err) => {
        console.log(err);
        alert('An error occured');
        dispatch(hideGlobalLoading());
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
