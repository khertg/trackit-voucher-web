import React, { useEffect, useState } from 'react';
import Moment from 'moment';
import history from '../history';

interface IProps {
  isSelected: boolean;
  handleSelect: (id: number, number: string, isSelected: boolean) => void;
  handleDelete: (id: number) => void;
  rowNumber: number;
  id: number;
  buyer: string;
  amount: number;
  phone_number: string;
  status: number;
  created_at: string;
  updated_at: string;
}

export const LoadItem: React.FC<IProps> = ({
  isSelected,
  handleSelect,
  handleDelete,
  rowNumber,
  id,
  buyer,
  amount,
  phone_number,
  status,
  created_at,
  updated_at,
}) => {
  const [isChecked, setIsChecked] = useState(false);
  useEffect(() => {
    if (isSelected) {
      setIsChecked(true);
    } else {
      setIsChecked(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSelected]);

  const formatToPeso = (amount: number) => {
    const formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'Php',
      minimumFractionDigits: 2
    })

    return formatter.format(amount);
  }
  return (
    <tr>
      <td>
        <input
          type="checkbox"
          className="select-item"
          onChange={(e) => {
            setIsChecked(!isChecked);
            handleSelect(id, phone_number, e.target.checked);
          }}
          value={id}
          checked={isChecked}
        />
      </td>
      <td>{rowNumber}</td>
      <td>{buyer}</td>
      <td>{phone_number}</td>
      <td>{formatToPeso(amount)}</td>
      <td>
        {status === 0 && <span>❌ Unpaid</span>}
        {status === 1 && <span>💰 Paid</span>}
        {(status > 1 || status < 0) && <span>👽 Unknown</span>}
      </td>
      <td>
        {Moment(created_at).tz('Asia/Manila').format('MMM-DD-YYYY hh:mm A')}
      </td>
      <td>
        {Moment(updated_at).tz('Asia/Manila').format('MMM-DD-YYYY hh:mm A')}
      </td>
      <td>
        <button
          onClick={(e) => {
            history.push(`/load/edit/${id}`);
          }}
        >
          Edit
        </button>
        &nbsp;
        <button
          onClick={() => {
            handleDelete(id);
          }}
        >
          Delete
        </button>
      </td>
    </tr>
  );
};
