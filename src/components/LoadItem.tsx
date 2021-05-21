import React, { useEffect, useState } from 'react';
import Moment from 'moment';
import history from '../history';

interface IProps {
    isSelected: boolean;
    handleSelect: (id: string, number: string, isSelected: boolean) => void;
    handleDelete: (id: string) => void;
    rowNumber: number;
    id: string;
    buyer: string;
    amount: number;
    number: string;
    is_paid: boolean;
    createdAt: string;
    updatedAt: string;
  }

export const LoadItem: React.FC<IProps> = ({
    isSelected,
    handleSelect,
    handleDelete,
    rowNumber,
    id,
    buyer,
    amount,
    number,
    is_paid,
    createdAt,
    updatedAt,
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
    return (
        <tr>
      <td>
        <input
          type="checkbox"
          className="select-item"
          onChange={(e) => {
            setIsChecked(!isChecked);
            handleSelect(id, number, e.target.checked);
          }}
          value={id}
          checked={isChecked}
        />
      </td>
      <td>{rowNumber}</td>
      <td>{buyer}</td>
      <td>{number}</td>
      <td>{amount}</td>
      <td>
        {is_paid ? <span>✔️</span> : <span>❌</span>}
      </td>

      <td>{Moment(createdAt).format('MMM-DD-YYYY hh:mm A')}</td>
      <td>{Moment(updatedAt).format('MMM-DD-YYYY hh:mm A')}</td>
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
    )
}
