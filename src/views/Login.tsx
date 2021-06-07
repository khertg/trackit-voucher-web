import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { errorSelector, loadingSelector, login } from '../state/modules/auth';

export const Login: React.FC = () => {
  //Global State
  const loading = useSelector(loadingSelector);
  const errorArr = useSelector(errorSelector);
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({});

  const onSubmit = async (data: any) => {
    dispatch(login(data));
  };

  return (
    <div style={style}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <table className="no-border">
          <tbody>
            <tr>
              <td style={{ textAlign: 'center' }}>LOGIN PAGE </td>
            </tr>
            {errorArr.length > 0 && (
              <tr>
                <td>
                  {errorArr.map((msg) => (
                    <span className="text-danger" style={{ fontSize: '13px' }}>
                      {msg}
                    </span>
                  ))}
                </td>
              </tr>
            )}
            <tr>
              <td>
                <input
                  type="email"
                  {...register('email', { required: 'Email is required!' })}
                  placeholder="Email"
                />
              </td>
            </tr>
            <tr>
              <td>
                <small className="text-danger">
                  {errors.email && errors.email.message}
                </small>
              </td>
            </tr>
            <tr>
              <td>
                <input
                  type="password"
                  {...register('password', {
                    required: 'Password is required!',
                  })}
                  placeholder="Password"
                />
              </td>
            </tr>
            <tr>
              <td>
                <small className="text-danger">
                  {errors.password && errors.password.message}
                </small>
              </td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center' }}>
                <button type="submit">
                  <div style={centerStyle}>
                    <div>Login&nbsp;</div>
                    {loading && <div className="loader"></div>}
                  </div>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </form>
    </div>
  );
};

const style = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '300px',
};

const centerStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};
