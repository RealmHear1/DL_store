import React from "react";

export const handleChange = (e: React.ChangeEvent<HTMLInputElement>, func: any, stock: number) => {
  let value = Number(e.target.value);
  if (value === 0) value = 1;
  if (value < 0) value = 0;
  if (value > 99) value = 99;
  if (value >= stock) value = stock;
  func(value);
};

export const handleClickIncrement = (value: number, func: any, stock: number) => {
  if (value + 1 > stock) return;
  if (value < 99) func(value + 1);
};

export const handleClickDecrement = (value: number, func: any) => {
  if (value > 1) func(value - 1);
};