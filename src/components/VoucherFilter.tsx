import React from 'react';
import { useForm } from 'react-hook-form';
import { IVoucherFilter } from '../helpers/common';

interface IProps {
  preloadedValues?: IVoucherFilter;
  onSubmit: (e: any) => void;
}

export const VoucherFilter: React.FC<IProps> = ({
  preloadedValues,
  onSubmit,
}) => {
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
            <td>Code</td>
            <td>
              <input type="text" {...register('code')} />
              &nbsp;
              <small className="text-danger">
                {errors.code && errors.code.message}
              </small>
            </td>
          </tr>
          <tr>
            <td>Sold To</td>
            <td>
              <input type="text" {...register('sold_to')} />
            </td>
          </tr>
          <tr>
            <td></td>
            <td>
              <input {...register('is_sold')} type="radio" value="" id="all" />
              <label htmlFor="all">All</label>&nbsp;
              <input
                {...register('is_sold')}
                type="radio"
                value="true"
                id="sold"
              />
              <label htmlFor="sold">Sold</label>&nbsp;
              <input
                {...register('is_sold')}
                type="radio"
                value="false"
                id="not_sold"
              />
              <label htmlFor="not_sold">Not Sold</label>
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
