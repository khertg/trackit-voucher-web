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
import { Button, Dropdown, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons';

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

const CustomToggle = React.forwardRef<HTMLButtonElement, any>(
  ({ children, onClick }, ref) => (
    <button
      className="invi-btn"
      ref={ref}
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
    >
      {children}
      <FontAwesomeIcon icon={faEllipsisV} />
    </button>
  )
);

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

  const getStatus = (status: number | string, showLabel: boolean = true) => {
    switch (status) {
      case 0:
        return <span>⏳ {showLabel && 'Waiting'}</span>;
      case 1:
        return <span>💰 {showLabel && 'Sold'}</span>;
      case 2:
        return <span>❌ {showLabel && 'Unpaid'}</span>;
      case 3:
        return <span>😕 {showLabel && 'Missing'}</span>;
      default:
        return <span>👽 {showLabel && 'Unknown'}</span>;
    }
  };

  const getActiveStatus = (activeStatus: number | string | undefined) => {
    if (activeStatus === 0) {
      return <span>🔴</span>;
    } else if (activeStatus === 1) {
      return <span>🟢</span>;
    } else {
      return <span>👽</span>;
    }
  };

  return (
    <tr>
      <td>
        <div className="checkbox-container">
          <div>
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
          </div>
          <div className="mobile-view voucher-wrapper">
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
          &nbsp;&nbsp;
          <div className="mobile-view d-flex">
            <div className="value flex-grow-1 flex-shrink-1">
              {getActiveStatus(active)}
            </div>
          </div>
          &nbsp;&nbsp;
          <div className="mobile-view d-flex">
            <div className="value flex-grow-1 flex-shrink-1">
              {getStatus(status, false)}
            </div>
          </div>
          <div className="mobile-view ml-auto">
            <Dropdown>
              <Dropdown.Toggle size="sm" as={CustomToggle} />
              <Dropdown.Menu>
                <Dropdown.Item>Under Contruction</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>
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
          {getStatus(status)}
          </div>
        </div>
      </td>
      <td style={{ textAlign: 'center' }}>
        <div className="d-flex">
          <label className="flex-grow-1 flex-shrink-1">Active</label>
          <div className="value flex-grow-1 flex-shrink-1">
           {getActiveStatus(active)}
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
