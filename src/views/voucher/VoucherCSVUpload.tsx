import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { importCSV } from '../../services/voucher';
import { hideLoading, showLoading } from '../../state/actions/loadingAction';

export const VoucherCSVUpload: React.FC = () => {
  const {
    register,
    handleSubmit,
    clearErrors,
    setError,
    reset,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const [successMessage, setSuccessMessage] = useState<string>('');

  const onSubmit = (data: any) => {
    setSuccessMessage('');
    if (data.code[0].type !== 'application/vnd.ms-excel') {
      setError('code', {
        type: 'manual',
        message: 'Only csv file is allowed.',
      });
    } else {
      const formData = new FormData();
      formData.append('voucher-csv', data.code[0]);
      dispatch(showLoading());
      importCSV(formData)
        .then((data) => {
          dispatch(hideLoading());
          setSuccessMessage('Successfully Imported!');
          reset();
        })
        .catch((err) => {
          console.log(err);
          setError('code', {
            type: 'manual',
            message: 'Open something went wrong. Pls try again',
          });
          dispatch(hideLoading());
        });
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit, () => {
        setSuccessMessage('');
      })}
    >
      {successMessage && <span className="text-success">{successMessage}</span>}
      <table className="no-border">
        <tbody>
          <tr>
            <td>
              <input
                type="file"
                accept=".csv"
                onClick={() => {
                  setSuccessMessage('');
                  clearErrors('code');
                }}
                {...register('code', { required: 'CSV file is required!' })}
              />
            </td>
            <td>
              <button type="submit">Upload</button>
            </td>
          </tr>
          <tr>
            <td>
              <small className="text-danger">
                {errors.code && errors.code.message}
              </small>
            </td>
            <td></td>
          </tr>
        </tbody>
      </table>
    </form>
  );
};
