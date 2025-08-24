"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ReactNode } from "react";
import { IconType } from "react-icons";
import { IoClose } from "react-icons/io5";
import { FaCheck } from "react-icons/fa";
import { FaInbox } from "react-icons/fa";

export type Product = {
  id: string;
  name: string;
  supplier: string;
  sku: number;
  status: "published" | "inactive" | "draft";
  category:
    | "electronics"
    | "clothing"
    | "books"
    | "home"
    | "toys"
    | "sports"
    | "beauty"
    | "automotive";
  quantityInStock: number;
  price: number;
  icon: IconType;
};

export const columns: ColumnDef<Product>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => {
      const Icon = row.original.icon;
      const name = row.original.name;
      return (
        <div className="flex items-center space-x-2">
          <div className="p-2 rounded-sm bg-primary/10">
            <Icon className="text-lg" />
          </div>
          <span>{name}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "supplier",
    header: "Supplier",
  },
  {
    accessorKey: "sku",
    header: "SKU",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.status;
      let colorClass: string;
      let icon: ReactNode;

      switch (status) {
        case "published":
          colorClass = "text-green-600 bg-green-100";
          icon = <FaCheck className="text-[12px]" />;
          break;
        case "inactive":
          colorClass = "bg-red-100 text-red-600";
          icon = <IoClose />;
          break;
        case "draft":
          colorClass = "text-gray-600 bg-gray-200";
          icon = <FaInbox />;
          break;
        default:
          colorClass = "text-gray-600 bg-gray-200";
          icon = <FaInbox />;
      }

      return (
        <span
          className={`px-3 py-[2px] rounded-full ${colorClass} font-medium flex gap-1 items-center w-fit`}
        >
          {icon}
          <span className="text-[13px]">{status}</span>
        </span>
      );
    },
  },
  {
    accessorKey: "category",
    header: "Category",
  },
  {
    accessorKey: "quantityInStock",
    header: "Quantity in Stock",
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => `$${row.getValue("price").toFixed(2)}`,
  },
];
