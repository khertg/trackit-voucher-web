import React from 'react';
import { Button, Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import {
  NavLink,
  Route,
  Switch,
  useHistory,
  useRouteMatch,
} from 'react-router-dom';
import { deleteAll, soldEnableManyVoucher } from '../services/voucher';
import { hideGlobalLoading, showGlobalLoading } from '../state/modules/loading';
import {
  fetchVoucherAction,
  selectedVoucherSelector,
  toggleFilterAction,
  voucherFilterSelector,
} from '../state/modules/voucher';
import { NotFound } from './NotFound';
import { Voucher } from './voucher/Voucher';
import { VoucherCreate } from './voucher/VoucherCreate';
import { VoucherCSVUpload } from './voucher/VoucherCSVUpload';
import { VoucherEdit } from './voucher/VoucherEdit';

export const VoucherLayout: React.FC = () => {
  //Global state
  const selectedVoucher = useSelector(selectedVoucherSelector);
  const voucherFilter = useSelector(voucherFilterSelector);

  const dispatch = useDispatch();
  const history = useHistory();

  let { path } = useRouteMatch();

  const soldSelectedVoucher = () => {
    const voucherCodes = selectedVoucher
      .map(({ voucher_code }) => voucher_code)
      .join(', ');
    var buyer = prompt(
      `The following voucher/s will be sold. \n[ ${voucherCodes} ]\nPlease enter buyer name.`
    );

    if (buyer != null) {
      dispatch(showGlobalLoading());
      const ids = selectedVoucher.map(({ id }) => id);
      soldEnableManyVoucher(buyer, ids)
        .then(() => {
          dispatch(
            fetchVoucherAction({
              ...voucherFilter,
              page: 0,
            })
          );
          alert(`Successfully sold ${selectedVoucher.length} vouchers.`);
          dispatch(hideGlobalLoading());
        })
        .catch((err) => {
          console.log(err);
          alert('Error occured while processing');
          dispatch(hideGlobalLoading());
        });
    }
  };

  const deleteSelectedVoucher = () => {
    if (
      window.confirm('Are you sure you want to delete all selected vouchers?')
    ) {
      dispatch(showGlobalLoading());
      deleteAll([...selectedVoucher.map(({ id }) => id)])
        .then(() => {
          dispatch(
            fetchVoucherAction({
              ...voucherFilter,
              page: 0,
            })
          );
          alert(`Successfully deleted ${selectedVoucher.length} vouchers.`);
          dispatch(hideGlobalLoading());
        })
        .catch((err) => {
          console.log(err);
          alert('Error occured while deleting');
          dispatch(hideGlobalLoading());
        });
    }
  };

  return (
    <div style={{ backgroundColor: '#EBEBEB' }}>
      <div className="general-header" style={{ paddingTop: '10px', paddingBottom: '10px' }}>
        <div className="title-header">
          <h2>Voucher</h2>
        </div>
        <div className="title-actions">
          <div>
            <NavLink to="/voucher">
              <Button
                variant="secondary"
                size="sm"
                style={{ whiteSpace: 'nowrap' }}
              >
                Voucher List
              </Button>
            </NavLink>
          </div>
          &nbsp;
          <div>
            <NavLink to="/voucher/create">
              <Button
                variant="secondary"
                size="sm"
                style={{ whiteSpace: 'nowrap' }}
              >
                Create
              </Button>
            </NavLink>
          </div>
          &nbsp;
          <div>
            <NavLink to="/voucher/csv-upload">
              <Button
                variant="secondary"
                size="sm"
                style={{ whiteSpace: 'nowrap' }}
              >
                Import CSV
              </Button>
            </NavLink>
          </div>
          &nbsp;
          <div>
            <Button
              variant="secondary"
              size="sm"
              style={{ whiteSpace: 'nowrap' }}
              onClick={() => {
                dispatch(toggleFilterAction());
              }}
              disabled={path !== history.location.pathname}
            >
              Toggle Filter
            </Button>
          </div>
          &nbsp;
          <div>
            <Button
              variant="secondary"
              size="sm"
              style={{ whiteSpace: 'nowrap' }}
              onClick={() => {
                soldSelectedVoucher();
              }}
              disabled={selectedVoucher.length <= 0}
            >
              Sold ({selectedVoucher.length})
            </Button>
          </div>
          &nbsp;
          <div>
            <Button
              variant="secondary"
              size="sm"
              style={{ whiteSpace: 'nowrap' }}
              onClick={() => {
                deleteSelectedVoucher();
              }}
              disabled={selectedVoucher.length <= 0}
            >
              Delete ({selectedVoucher.length})
            </Button>
          </div>
        </div>
      </div>

      <Container fluid style={{ backgroundColor: '#EBEBEB' }}>
        <Switch>
          <Route exact path={path}>
            <Voucher />
          </Route>
          <Route path={`${path}/create`}>
            <VoucherCreate />
          </Route>
          <Route path={`${path}/csv-upload`}>
            <VoucherCSVUpload />
          </Route>
          <Route path={`${path}/edit/:id`}>
            <VoucherEdit />
          </Route>
          <Route path="*" component={NotFound}></Route>
        </Switch>
      </Container>
    </div>
  );
};
