import React from 'react';
import { useForm } from 'react-hook-form';

interface IProps {
  preloadedValues?: {
    buyer: string;
    amount: number;
    number: string;
    is_paid?: boolean;
  };
  onSubmit: (e: any) => void;
}

export const LoadForm: React.FC<IProps> = ({ preloadedValues, onSubmit }) => {
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
                  <span className="text-danger">*</span>Buyer:
                </td>
                <td>
                  <input
                    type="text"
                    {...register('buyer', { required: 'Buyer is required!' })}
                  />
                  &nbsp;
                  <small className="text-danger">
                    {errors.buyer && errors.buyer.message}
                  </small>
                </td>
              </tr>
              <tr>
                <td>
                  <span className="text-danger">*</span>Number:
                </td>
                <td>
                  <input
                    type="text"
                    {...register('number', { required: 'Number is required!' })}
                  />
                  &nbsp;
                  <small className="text-danger">
                    {errors.number && errors.number.message}
                  </small>
                </td>
              </tr>
              <tr>
                <td>
                  <span className="text-danger">*</span>Amount:
                </td>
                <td>
                  <input
                    type="number"
                    {...register('amount', { required: 'Amount is required!',  })}
                  />
                  &nbsp;
                  <small className="text-danger">
                    {errors.amount && errors.amount.message}
                  </small>
                </td>
              </tr>
              <tr>
                <td>Paid:</td>
                <td>
                  <input type="checkbox" {...register('is_paid')} />
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
