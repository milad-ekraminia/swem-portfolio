import React from 'react';

export interface MainLayoutProps {
  children: React.ReactNode;
  className?: string;
  resources?: any;
}
export interface SubItem {
  id: number;
  title: string;
  route: string;
  children?: any[];
}

export interface NavItem {
  id: number;
  title: string;
  route: string;
  Icon: ({ width, height, fill, stroke }: any) => React.JSX.Element;
  children: any[];
  permission?: string;
}
