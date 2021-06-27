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

  const handleEdit = (e: any) => {
    history.push(`/voucher/edit/${id}`);
  };

  const handleEnable = (e: any) => {
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
  };

  const handleDisable = (e: any) => {
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
  };

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
        <div className="value flex-grow-1 flex-shrink-1">{id}</div>
      </td>
      <td>
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
      </td>
      <td style={{ whiteSpace: 'nowrap' }}>
        <div className="value flex-grow-1 flex-shrink-1">
          {getStatus(status)}
        </div>
      </td>
      <td style={{ textAlign: 'center' }}>
        <div className="value flex-grow-1 flex-shrink-1">
          {getActiveStatus(active)}
        </div>
      </td>
      <td>
        <div className="value flex-grow-1 flex-shrink-1">
          {buyer ? buyer : '-'}
        </div>
      </td>

      <td>
        <div className="value flex-grow-1 flex-shrink-1">
          {Moment(created_at).tz('Asia/Manila').format('MMM-DD-YYYY hh:mm A')}
        </div>
      </td>
      <td>
        <div className="value flex-grow-1 flex-shrink-1">
          {Moment(updated_at).tz('Asia/Manila').format('MMM-DD-YYYY hh:mm A')}
        </div>
      </td>
      <td>
        <Dropdown>
          <Dropdown.Toggle size="sm" as={CustomToggle} />
          <Dropdown.Menu>
            <Dropdown.Item onClick={handleEdit}>Edit</Dropdown.Item>
            <Dropdown.Item onClick={handleEnable} disabled={active === 1}>
              Enable
            </Dropdown.Item>
            <Dropdown.Item onClick={handleDisable} disabled={active === 0}>
              Disable
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() => {
                window.scrollTo(0, 0);
                handleDelete(id);
              }}
            >
              Delete
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </td>
    </tr>
  );
};
