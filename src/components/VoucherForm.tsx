import React, { Fragment } from 'react';
import { useForm } from 'react-hook-form';
import { IVoucher } from '../models/voucher';

interface IProps {
  preloadedValues?: Partial<
    Omit<IVoucher, 'status' | 'active'> & { status: string; active: string }
  >;
  onSubmit: (e: any) => void;
}

export const VoucherForm: React.FC<IProps> = ({
  preloadedValues,
  onSubmit,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: preloadedValues,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <table className="no-border">
        <tbody>
          <tr>
            {preloadedValues?.id && (
              <Fragment>
                <td>Id:</td>
                <td style={{ textAlign: 'left' }}>{preloadedValues.id}</td>
              </Fragment>
            )}
          </tr>
          <tr>
            <td>
              <span className="text-danger">*</span>Code:
            </td>
            <td style={{ textAlign: 'left' }}>
              <input
                type="text"
                {...register('voucher_code', {
                  required: 'Voucher Code is required!',
                })}
              />
              &nbsp;
              <small className="text-danger">
                {errors.voucher_code && errors.voucher_code.message}
              </small>
            </td>
          </tr>
          <tr>
            <td>Buyer:</td>
            <td style={{ textAlign: 'left' }}>
              <input type="text" {...register('buyer')} />
            </td>
          </tr>
          <tr>
            <td>Status:</td>
            <td style={{ textAlign: 'left' }}>
              <input
                {...register('status')}
                type="radio"
                value={0}
                id="not_sold"
              />
              <label htmlFor="not_sold">Not Sold</label>&nbsp;
              <input {...register('status')} type="radio" value={1} id="sold" />
              <label htmlFor="sold">Sold</label>&nbsp;
              <input
                {...register('status')}
                type="radio"
                value={2}
                id="unpaid"
              />
              <label htmlFor="unpaid">Unpaid</label>&nbsp;
              <input
                {...register('status')}
                type="radio"
                value={3}
                id="missing"
              />
              <label htmlFor="missing">Missing</label>&nbsp;
            </td>
          </tr>
          {/* <tr>
            <td>Active:</td>
            <td style={{ textAlign: 'left' }}>
              <input
                {...register('active')}
                type="radio"
                value={0}
                id="active"
              />
              <label htmlFor="active">In Active</label>&nbsp;
              <input
                {...register('active')}
                type="radio"
                value={1}
                id="in_active"
              />
              <label htmlFor="in_active">Active</label>
            </td>
          </tr> */}
          <tr>
            <td></td>
            <td style={{ textAlign: 'left' }}>
              <button type="submit">Save</button>
            </td>
          </tr>
        </tbody>
      </table>
    </form>
  );
};
