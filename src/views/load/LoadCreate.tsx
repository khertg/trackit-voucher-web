import React from 'react';
import history from '../../history';
import { useDispatch } from 'react-redux';
import { hideLoading, showLoading } from '../../state/actions/loadingAction';
import { LoadForm } from '../../components/LoadForm';
import { create } from '../../services/load';

export const LoadCreate: React.FC = () => {
  const dispatch = useDispatch();

  const onCreate = async (data: any) => {
    dispatch(showLoading());
    create(data)
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
      <LoadForm onSubmit={onCreate} preloadedValues={{ status: '0'}}/>
    </div>
  );
};
