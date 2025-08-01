'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Input from '@/components/ui/Input/Input';
import Button from '@/components/ui/Button/Button';
import { useAuth } from '@/contexts/AuthContext';
import { loginSchema, LoginSchemaType } from '@/schemas/auth.schema';
import { fetchRandomUser } from '@/utils/api';
import styles from './LoginForm.module.scss';

const LoginForm: React.FC = () => {
  const [formData, setFormData] = useState<LoginSchemaType>({ phone: '' });
  const [errors, setErrors] = useState<Partial<LoginSchemaType>>({});
  const [isLoading, setIsLoading] = useState(false);
  const { setUser } = useAuth();
  const router = useRouter();

  console.log("errors", errors)

  const validateForm = (data: LoginSchemaType): boolean => {
    console.log("data",data)
    try {
      loginSchema.parse(data);
      setErrors({});
      return true;
    } catch (error: any) {
      const fieldErrors: Partial<LoginSchemaType> = {};
      error.errors?.forEach((err: any) => {
        if (err.path?.[0]) {
          fieldErrors[err.path[0] as keyof LoginSchemaType] = err.message;
        }
      });
      setErrors(fieldErrors);
      return false;
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name as keyof LoginSchemaType]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm(formData)) {
      return;
    }

    setIsLoading(true);
    
    try {
      const userData = await fetchRandomUser();
      setUser(userData);
      router.push('/dashboard');
    } catch (error) {
      console.error('Login failed:', error);
      // You might want to show an error message to the user here
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.formHeader}>
        <h1 className={styles.title}>ورود به حساب کاربری</h1>
        <p className={styles.subtitle}>شماره تلفن خود را وارد کنید</p>
      </div>

      <Input
        id="phone"
        name="phone"
        type="tel"
        label="شماره تلفن"
        placeholder="09123456789"
        value={formData.phone}
        onChange={handleInputChange}
        error={errors.phone}
        variant={errors.phone ? 'error' : 'default'}
        maxLength={11}
      />

      <Button 
        type="submit" 
        size="lg" 
        loading={isLoading}
        className={styles.submitButton}
      >
        {isLoading ? 'در حال ورود...' : 'ورود'}
      </Button>
    </form>
  );
};

export default LoginForm;