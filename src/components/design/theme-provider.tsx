"use client";
import React from "react";
import { ReactNode } from 'react';

interface MyComponentProps {
  children: ReactNode;
}

const MyComponent = ({ children }: MyComponentProps) => {
  return <div>{children}</div>;
};


export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  return <div className="min-h-screen bg-[color:var(--bg)]">{children}</div>;
}