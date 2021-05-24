import React from 'react';
import { useForm } from 'react-hook-form';
import { IVoucherFilter } from '../models/voucher';

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
            <td>Voucher Code</td>
            <td>
              <input type="text" {...register('voucher_code')} />
              &nbsp;
              <small className="text-danger">
                {errors.voucher_code && errors.voucher_code.message}
              </small>
            </td>
          </tr>
          <tr>
            <td>Buyer</td>
            <td>
              <input type="text" {...register('buyer')} />
            </td>
          </tr>
          <tr>
            <td></td>
            <td>
              <input {...register('sold')} type="radio" value="" id="all" />
              <label htmlFor="all">All</label>&nbsp;
              <input
                {...register('sold')}
                type="radio"
                value="true"
                id="sold"
              />
              <label htmlFor="sold">Sold</label>&nbsp;
              <input
                {...register('sold')}
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
              <select {...register('sort_by', { required: true })}>
                <option value="id:desc">Desc</option>
                <option value="id:asc">Asc</option>
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
