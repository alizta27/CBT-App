import React from 'react';

import { DragDrop } from '@/components';
import AddClassForm from '@/components/AddClassForm';

import styles from './styles.module.scss';

export default function AddTeacher() {
  return (
    <>
      <div className={styles.cardContainer}>
        <AddClassForm />
      </div>
      <div className={styles.cardContainer}>
        <DragDrop />
      </div>
    </>
  );
}
