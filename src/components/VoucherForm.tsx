import React from 'react';
import { useForm } from 'react-hook-form';

interface IProps {
  preloadedValues?: {
    code: string;
    sold_to?: string;
    is_sold?: boolean;
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
              <span className="text-danger">*</span>Code:
            </td>
            <td>
              <input
                type="text"
                {...register('code', { required: 'Code is required!' })}
              />
              &nbsp;
              <small className="text-danger">
                {errors.code && errors.code.message}
              </small>
            </td>
          </tr>
          <tr>
            <td>Sold To:</td>
            <td>
              <input type="text" {...register('sold_to')} />
            </td>
          </tr>
          <tr>
            <td>Is Sold:</td>
            <td>
              <input type="checkbox" {...register('is_sold')} />
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
