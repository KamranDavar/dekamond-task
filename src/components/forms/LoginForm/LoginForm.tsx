'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Input from '@/components/ui/Input/Input';
import Button from '@/components/ui/Button/Button';
import { useAuth } from '@/contexts/AuthContext';
import { loginSchema, LoginSchemaType } from '@/schemas/auth.schema';
import { fetchRandomUser } from '@/utils/api';
import styles from './LoginForm.module.scss';

const LoginForm: React.FC = () => {
  const { setUser } = useAuth();
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchemaType>({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      phone: '',
    },
    mode: 'onSubmit',
  });

  const onSubmit = async (data: LoginSchemaType) => {
    setIsLoading(true);
    
    try {
      const userData = await fetchRandomUser();
      setUser(userData);
      router.push('/dashboard');
    } catch (error) {
      console.error('Login failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.formHeader}>
        <h1 className={styles.title}>ورود به حساب کاربری</h1>
        <p className={styles.subtitle}>شماره تلفن خود را وارد کنید</p>
      </div>

      <Controller
        name="phone"
        control={control}
        render={({ field }) => (
          <Input
            id="phone"
            name="phone"
            type="tel"
            label="شماره تلفن"
            placeholder="09123456789"
            value={field.value}
            onChange={field.onChange}
            error={errors.phone?.message}
            variant={errors.phone ? 'error' : 'default'}
          />
        )}
      />

      <Button 
        type="submit" 
        size="md" 
        loading={isLoading}
        disabled={isLoading}
        className={styles.submitButton}
      >
        {isLoading ? 'در حال ورود...' : 'ورود'}
      </Button>
    </form>
  );
};

export default LoginForm;