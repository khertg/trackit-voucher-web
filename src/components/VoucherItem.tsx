import React, { useEffect, useState } from 'react';
import Moment from 'moment';
import history from '../history';

interface IProps {
  isSelected: boolean;
  isShow: boolean;
  handleSelect: (id: string, code: string, isSelected: boolean) => void;
  handleDelete: (id: string) => void;
  id: string;
  voucher_code: string;
  number: number;
  sold: boolean;
  buyer?: string;
  created_at: string;
  updated_at: string;
}
export const VoucherItem: React.FC<IProps> = ({
  isSelected,
  isShow,
  handleSelect,
  handleDelete,
  id,
  voucher_code,
  number,
  sold,
  buyer,
  created_at,
  updated_at,
}) => {
  const [isChecked, setIsChecked] = useState(false);
  const [showVoucherCode, setShowVoucherCode] = useState(false);
  useEffect(() => {
    if (isSelected) {
      setIsChecked(true);
    } else {
      setIsChecked(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSelected]);

  useEffect(() => {
    if (isShow) {
      setShowVoucherCode(true);
    } else {
      setShowVoucherCode(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isShow]);
  return (
    <tr>
      <td>
        <input
          type="checkbox"
          className="select-item"
          onChange={(e) => {
            setIsChecked(!isChecked);
            handleSelect(id, voucher_code, e.target.checked);
          }}
          value={id}
          checked={isChecked}
        />
      </td>
      <td>{number}</td>
      <td>
        <div className="voucher-container">
          <button onClick={() => setShowVoucherCode(!showVoucherCode)}>
            {showVoucherCode ? <span>🙉</span> : <span>🙈</span>}
          </button>
          &nbsp;
          <input
            size={10}
            type={showVoucherCode ? 'text' : 'password'}
            defaultValue={voucher_code}
          />
        </div>
      </td>
      <td>{sold ? <span>✔️</span> : <span>❌</span>}</td>
      <td>{buyer ? buyer : '-'}</td>

      <td>{Moment(created_at).format('MMM-DD-YYYY hh:mm A')}</td>
      <td>{Moment(updated_at).format('MMM-DD-YYYY hh:mm A')}</td>
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
