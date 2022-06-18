import React from 'react';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import { Oval } from 'react-loader-spinner';
import s from './Loader.module.css';

export default function Loader() {
  return (
    <div className={s.Oval}>
      <Oval color="#00BFFF" height={80} width={80} />
    </div>
  );
}
