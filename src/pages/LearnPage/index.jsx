import React from 'react';
import { Outlet } from 'react-router-dom';

export default function LearnPage() {
  return (
    <div className="py-10">
      <Outlet />
    </div>   
  );
}
