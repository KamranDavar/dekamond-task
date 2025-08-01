'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Button from '@/components/ui/Button/Button';
import { useAuth } from '@/contexts/AuthContext';
import styles from './dashboard.module.scss';

const DashboardPage: React.FC = () => {
  const { user, logout, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/auth');
    }
  }, [user, isLoading, router]);

  const handleLogout = () => {
    logout();
    router.push('/auth');
  };

  if (isLoading) {
    return (
      <div className={styles.loading}>
        <div className={styles.spinner}></div>
      </div>
    );
  }

  if (!user) {
    return null; // Will redirect in useEffect
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>به داشبورد خوش آمدید</h1>
        <Button variant="secondary" onClick={handleLogout}>
          خروج
        </Button>
      </div>

      <div className={styles.content}>
        <div className={styles.welcomeCard}>
          <div className={styles.avatar}>
            <img 
              src={user.picture.large} 
              alt={`${user.name.first} ${user.name.last}`}
              className={styles.avatarImage}
            />
          </div>
          
          <div className={styles.userInfo}>
            <h2 className={styles.userName}>
              {user.name.title} {user.name.first} {user.name.last}
            </h2>
            <p className={styles.userEmail}>{user.email}</p>
            <p className={styles.userPhone}>{user.phone}</p>
            <p className={styles.username}>@{user.login.username}</p>
          </div>
        </div>

        <div className={styles.statsGrid}>
          <div className={styles.statCard}>
            <h3>وضعیت حساب</h3>
            <p className={styles.statValue}>فعال</p>
          </div>
          
          <div className={styles.statCard}>
            <h3>آخرین ورود</h3>
            <p className={styles.statValue}>همین الان</p>
          </div>
          
          <div className={styles.statCard}>
            <h3>نوع کاربر</h3>
            <p className={styles.statValue}>استاندارد</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;