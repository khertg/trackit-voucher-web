import React from 'react';
import { VoucherForm } from '../../components/VoucherForm';
import { create } from '../../services/voucher';
import history from '../../history';
import { useDispatch } from 'react-redux';
import { handleError } from '../../helpers/services-common';
import {
  hideGlobalLoading,
  showGlobalLoading,
} from '../../state/modules/loading';

export const VoucherCreate: React.FC = () => {
  const dispatch = useDispatch();

  const onCreate = async (data: any) => {
    dispatch(showGlobalLoading());
    create(data)
      .then((data) => {
        const redirect = window.confirm(
          'Voucher successfully created.\nGo to voucher list?'
        );
        if (redirect) {
          history.push('/voucher');
        }
        dispatch(hideGlobalLoading());
      })
      .catch((err) => {
        const errorMsg = handleError(err);
        const message = errorMsg.join('\n');
        alert('Error\n' + message);
        dispatch(hideGlobalLoading());
      });
  };
  return (
    <div>
      <VoucherForm
        onSubmit={onCreate}
        preloadedValues={{ status: '0', active: '0' }}
      />
    </div>
  );
};
