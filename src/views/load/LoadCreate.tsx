import React from 'react';
import history from '../../history';
import { useDispatch } from 'react-redux';
import { hideLoading, showLoading } from '../../state/actions/loadingAction';
import { LoadForm } from '../../components/LoadForm';
import { create } from '../../services/load';

export const LoadCreate: React.FC = () => {
  const dispatch = useDispatch();

  const onCreate = async (data: any) => {
    const { buyer, number, amount, is_paid } = data;
    dispatch(showLoading());
    create(buyer, number, amount, is_paid)
      .then((data) => {
        history.push('/load');
      })
      .catch((err) => {
        console.log(err);
        dispatch(hideLoading());
      });
  };
  return (
    <div>
      <LoadForm onSubmit={onCreate} />
    </div>
  );
};
