import React, { useRef } from 'react';
import { Form } from 'react-bootstrap';
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
    reset,
  } = useForm({
    mode: 'onChange',
    defaultValues: preloadedValues,
  });

  const refSubmitButtom = useRef<HTMLButtonElement>(null);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Form.Group>
        <Form.Label>Voucher Code</Form.Label>
        <Form.Control
          type="text"
          size="sm"
          {...register('voucher_code')}
          className="form-control form-control-sm"
        />
        <small className="text-danger">
          {errors.voucher_code && errors.voucher_code.message}
        </small>
      </Form.Group>
      <Form.Group>
        <Form.Label>Buyer</Form.Label>
        <Form.Control
          type="text"
          size="sm"
          {...register('buyer')}
          className="form-control form-control-sm"
        />
      </Form.Group>
      <fieldset>
        <Form.Group>
          <Form.Label>Status</Form.Label>
          <Form.Check
            type="radio"
            label="All"
            {...register('status')}
            value=""
            id="all"
          />
          <Form.Check
            type="radio"
            label="Sold"
            {...register('status')}
            value="1"
            id="sold"
          />
          <Form.Check
            type="radio"
            label="Not Sold"
            {...register('status')}
            value="0"
            id="not_sold"
          />
          <Form.Check
            type="radio"
            label="Unpaid"
            {...register('status')}
            value="2"
            id="unpaid"
          />
          <Form.Check
            type="radio"
            label="Missing"
            {...register('status')}
            value="3"
            id="missing"
          />
        </Form.Group>
      </fieldset>
      <Form.Group>
        <Form.Label>Sort</Form.Label>
        <select
          {...register('sort_by', { required: true })}
          className="form-control form-control-sm"
        >
          <option value="id:desc">Desc</option>
          <option value="id:asc">Asc</option>
        </select>
      </Form.Group>
      <button
        ref={refSubmitButtom}
        type="submit"
        className="btn btn-secondary btn-sm mt-2"
      >
        Apply Filter
      </button>
      &nbsp;
      <button
        type="button"
        onClick={() => {
          const filter = {
            status: '',
            sort_by: 'id:desc',
            voucher_code: '',
            buyer: '',
          };
          reset(filter);
          refSubmitButtom?.current?.click();
        }}
        className="btn btn-light btn-sm mt-2"
      >
        Clear Filter
      </button>
    </form>
  );
};
