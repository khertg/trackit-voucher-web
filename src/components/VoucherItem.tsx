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
import { Button, Form } from 'react-bootstrap';

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
      <td>
        <div className="d-flex">
          <label className="flex-grow-1 flex-shrink-1">ID</label>
          <div className="value flex-grow-1 flex-shrink-1">{id}</div>
        </div>
      </td>
      <td>
        <div className="d-flex">
          <label className="flex-grow-1 flex-shrink-1">Voucher</label>
          <div className="value flex-grow-1 flex-shrink-1">
            <div className="voucher-container">
              <Button
                variant="light"
                size="sm"
                onClick={() => setShowVoucherCode(!showVoucherCode)}
              >
                {showVoucherCode ? <span>🙉</span> : <span>🙈</span>}
              </Button>
              &nbsp;
              <Form.Control
                size="sm"
                type={showVoucherCode ? 'text' : 'password'}
                defaultValue={voucher_code}
              />
            </div>
          </div>
        </div>
      </td>
      <td>
        <div className="d-flex">
          <label className="flex-grow-1 flex-shrink-1">Status</label>
          <div className="value flex-grow-1 flex-shrink-1">
            {status === 0 && <span>⏳ Waiting</span>}
            {status === 1 && <span>💰 Sold</span>}
            {status === 2 && <span>❌ Unpaid</span>}
            {status === 3 && <span>😕 Missing</span>}
            {(status > 3 || status < 0) && <span>👽 Unknown</span>}
          </div>
        </div>
      </td>
      <td style={{ textAlign: 'center' }}>
        <div className="d-flex">
          <label className="flex-grow-1 flex-shrink-1">Active</label>
          <div className="value flex-grow-1 flex-shrink-1">
            {' '}
            {active === 0 && <span>🔴</span>}
            {active === 1 && <span>🟢</span>}
          </div>
        </div>
      </td>
      <td>
        <div className="d-flex">
          <label className="flex-grow-1 flex-shrink-1">Buyer</label>
          <div className="value flex-grow-1 flex-shrink-1">
            {buyer ? buyer : '-'}
          </div>
        </div>
      </td>

      <td>
        <div className="d-flex">
          <label className="flex-grow-1 flex-shrink-1">Created</label>
          <div className="value flex-grow-1 flex-shrink-1">
            {Moment(created_at).tz('Asia/Manila').format('MMM-DD-YYYY hh:mm A')}
          </div>
        </div>
      </td>
      <td>
        <div className="d-flex">
          <label className="flex-grow-1 flex-shrink-1">Updated</label>
          <div className="value flex-grow-1 flex-shrink-1">
            {Moment(updated_at).tz('Asia/Manila').format('MMM-DD-YYYY hh:mm A')}
          </div>
        </div>
      </td>
      <td>
        <Button
          style={{ minWidth: '60px' }}
          variant="info"
          size="sm"
          onClick={(e) => {
            history.push(`/voucher/edit/${id}`);
          }}
        >
          Edit
        </Button>
        &nbsp;
        <Button
          variant="success"
          size="sm"
          onClick={() => {
            window.scrollTo(0, 0);
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
        </Button>
        &nbsp;
        <Button
          variant="warning"
          size="sm"
          onClick={() => {
            window.scrollTo(0, 0);
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
        </Button>
        &nbsp;
        <Button
          variant="danger"
          size="sm"
          onClick={() => {
            window.scrollTo(0, 0);
            handleDelete(id);
          }}
        >
          Delete
        </Button>
      </td>
    </tr>
  );
};
