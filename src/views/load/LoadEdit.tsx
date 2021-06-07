import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import history from '../../history';
import { NotFound } from '../NotFound';
import { useDispatch, useSelector } from 'react-redux';
import { ILoad } from '../../models/load';
import { edit, get } from '../../services/load';
import { LoadForm } from '../../components/LoadForm';
import {
  globalLoadingSelector,
  hideGlobalLoading,
  showGlobalLoading,
} from '../../state/modules/loading';

interface ParamTypes {
  id: string;
}

export const LoadEdit: React.FC = () => {
  //Global State
  const loading = useSelector(globalLoadingSelector);
  const dispatch = useDispatch();

  //Local State
  const [load, setLoad] =
    useState<{
      buyer: string;
      phone_number: string;
      amount: number;
      status: string;
    }>();
  const { id } = useParams<ParamTypes>();

  useEffect(() => {
    const fetchData = async () => {
      dispatch(showGlobalLoading());
      await get(id)
        .then((loadData: ILoad) => {
          setLoad({
            buyer: loadData.buyer,
            phone_number: loadData.phone_number,
            amount: loadData.amount,
            status: loadData.status + '',
          });
          dispatch(hideGlobalLoading());
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
        history.push('/load');
        dispatch(hideGlobalLoading());
      })
      .catch((err) => {
        console.log(err);
        alert('An error occured');
        dispatch(hideGlobalLoading());
      });
  };

  return load ? (
    <div>
      <LoadForm onSubmit={onEdit} preloadedValues={load} />
    </div>
  ) : loading ? (
    <div></div>
  ) : (
    <NotFound />
  );
};
