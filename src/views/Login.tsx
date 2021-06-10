import React, { useState } from 'react';
import { Alert, Button, Card, Form } from 'react-bootstrap';
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
      <Card style={{ width: '18rem' }}>
        <Card.Body>
          <Card.Title style={{ textAlign: 'center' }} className="mb-4">
            Login
          </Card.Title>
          {errorArr.map((msg, index) => (
            <span className="text-danger" style={{ fontSize: '13px' }}>
              {msg}
            </span>
          ))}

          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group controlId="formBasicEmail">
              <Form.Control
                size="sm"
                type="email"
                placeholder="Enter email"
                className={errors.email && 'is-invalid'}
                {...register('email', { required: 'Email is required!' })}
              />
              <div className="invalid-feedback">
                {errors.email && errors.email.message}
              </div>
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Control
                size="sm"
                type="password"
                placeholder="Password"
                className={errors.password && 'is-invalid'}
                {...register('password', {
                  required: 'Password is required!',
                })}
              />
              <div className="invalid-feedback">
                {errors.password && errors.password.message}
              </div>
            </Form.Group>
            <Button
              type="submit"
              variant="primary"
              size="sm"
              block
              disabled={loading}
            >
              {loading ? 'Loading...' : 'Submit'}
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

const style = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '300px',
};
