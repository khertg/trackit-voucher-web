import React from 'react';
import { useForm } from 'react-hook-form';

interface IProps {
  preloadedValues?: {
    buyer: string;
    amount: number;
    phone_number: string;
    paid?: boolean;
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
                  <span className="text-danger">*</span>Phone Number:
                </td>
                <td>
                  <input
                    type="text"
                    {...register('phone_number', { required: 'Phone Number is required!' })}
                  />
                  &nbsp;
                  <small className="text-danger">
                    {errors.phone_number && errors.phone_number.message}
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
                  <input type="checkbox" {...register('paid')} />
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
