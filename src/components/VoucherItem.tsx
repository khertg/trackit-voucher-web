import React, { useEffect, useState } from 'react';
import Moment from 'moment-timezone';
import history from '../history';
import { disableVoucher, enableVoucher } from '../services/voucher';
import { useDispatch, useSelector } from 'react-redux';
import { hideGlobalLoading, showGlobalLoading } from '../state/modules/loading';
import {
  fetchVoucherAction,
  voucherFilterSelector,
} from '../state/modules/voucher';

interface IProps {
  isSelected: boolean;
  isShow: boolean;
  handleSelect: (id: number, code: string, isSelected: boolean) => void;
  handleDelete: (id: number) => void;
  id: number;
  voucher_code: string;
  status: number | string;
  active?: number | string;
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
  status,
  active,
  buyer,
  created_at,
  updated_at,
}) => {
  const [isChecked, setIsChecked] = useState(false);
  const [showVoucherCode, setShowVoucherCode] = useState(false);
  const voucherFilter = useSelector(voucherFilterSelector);
  const dispatch = useDispatch();
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
      <td>{id}</td>
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
      <td>
        {status === 0 && <span>⏳ Waiting</span>}
        {status === 1 && <span>💰 Sold</span>}
        {status === 2 && <span>❌ Unpaid</span>}
        {status === 3 && <span>😕 Missing</span>}
        {(status > 3 || status < 0) && <span>👽 Unknown</span>}
      </td>
      <td style={{ textAlign: 'center' }}>
        {active === 0 && <span>🔴</span>}
        {active === 1 && <span>🟢</span>}
      </td>
      <td>{buyer ? buyer : '-'}</td>

      <td>
        {Moment(created_at).tz('Asia/Manila').format('MMM-DD-YYYY hh:mm A')}
      </td>
      <td>
        {Moment(updated_at).tz('Asia/Manila').format('MMM-DD-YYYY hh:mm A')}
      </td>
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
            dispatch(showGlobalLoading());
            enableVoucher(id)
              .then(() => {
                dispatch(hideGlobalLoading());
                dispatch(
                  fetchVoucherAction({
                    ...voucherFilter,
                  })
                );
              })
              .catch((err) => {
                console.log(err);
                alert('Error enabling the voucher');
                dispatch(hideGlobalLoading());
              });
          }}
          disabled={active === 1}
        >
          Enable
        </button>
        &nbsp;
        <button
          onClick={() => {
            dispatch(showGlobalLoading());
            disableVoucher(id)
              .then(() => {
                dispatch(hideGlobalLoading());
                dispatch(
                  fetchVoucherAction({
                    ...voucherFilter,
                  })
                );
              })
              .catch((err) => {
                console.log(err);
                alert('Error disabling the voucher');
                dispatch(hideGlobalLoading());
              });
          }}
          disabled={active === 0}
        >
          Disable
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
