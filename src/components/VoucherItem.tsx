import React, { useEffect, useState } from 'react';
import Moment from 'moment';
import history from '../history';

interface IProps {
  isSelected: boolean;
  handleSelect: (id: string, code: string, isSelected: boolean) => void;
  handleDelete: (id: string) => void;
  id: string;
  code: string;
  is_sold: boolean;
  sold_to?: string;
  createdAt: string;
  updatedAt: string;
}
export const VoucherItem: React.FC<IProps> = ({
  isSelected,
  handleSelect,
  handleDelete,
  id,
  code,
  is_sold,
  sold_to,
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
            handleSelect(id, code, e.target.checked);
          }}
          value={id}
          checked={isChecked}
        />
      </td>
      <td>{code}</td>
      <td>
        <input type="checkbox" defaultChecked={is_sold} />
      </td>
      <td>{sold_to ? sold_to : '-'}</td>

      <td>{Moment(createdAt).format('MMM-DD-YYYY')}</td>
      <td>{Moment(updatedAt).format('MMM-DD-YYYY')}</td>
      <td>
        <button
          onClick={(e) => {
            history.push(`/voucher/edit/${id}`);
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
