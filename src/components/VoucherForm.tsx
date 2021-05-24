import React from 'react';
import { useForm } from 'react-hook-form';

interface IProps {
  preloadedValues?: {
    voucher_code: string;
    buyer?: string;
    sold?: boolean;
  };
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
            <td>
              <span className="text-danger">*</span>Voucher Code:
            </td>
            <td>
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
            <td>
              <input type="text" {...register('buyer')} />
            </td>
          </tr>
          <tr>
            <td>Is Sold:</td>
            <td>
              <input type="checkbox" {...register('sold')} />
            </td>
          </tr>
          <tr>
            <td></td>
            <td>
              <button type="submit">Save</button>
            </td>
          </tr>
        </tbody>
      </table>
    </form>
  );
};
