import React from 'react';
import { useForm } from 'react-hook-form';
import { ILoadFilter } from '../models/load';

interface IProps {
  preloadedValues?: ILoadFilter;
  onSubmit: (e: any) => void;
}

export const LoadFilter: React.FC<IProps> = ({ preloadedValues, onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    defaultValues: preloadedValues,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <table className="no-border">
        <tbody>
          <tr>
            <td>Buyer</td>
            <td>
              <input type="text" {...register('buyer')} />
              &nbsp;
              <small className="text-danger">
                {errors.buyer && errors.buyer.message}
              </small>
            </td>
          </tr>
          <tr>
            <td>Number</td>
            <td>
              <input type="text" {...register('number')} />
            </td>
          </tr>
          <tr>
            <td></td>
            <td>
              <input {...register('is_paid')} type="radio" value="" id="all" />
              <label htmlFor="all">All</label>&nbsp;
              <input
                {...register('is_paid')}
                type="radio"
                value="true"
                id="sold"
              />
              <label htmlFor="sold">Paid</label>&nbsp;
              <input
                {...register('is_paid')}
                type="radio"
                value="false"
                id="not_sold"
              />
              <label htmlFor="not_sold">Not Paid</label>
            </td>
          </tr>
          <tr>
            <td></td>
            <td>
              <select {...register('sortBy', { required: true })}>
                <option value="createdAt:desc">Desc</option>
                <option value="createdAt:asc">Asc</option>
              </select>
            </td>
          </tr>
          <tr>
            <td></td>
            <td>
              <button type="submit">Apply Filter</button>
            </td>
          </tr>
        </tbody>
      </table>
    </form>
  );
};
