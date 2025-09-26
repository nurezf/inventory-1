"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ReactNode } from "react";
import { IconType } from "react-icons";
import { IoClose } from "react-icons/io5";
import { FaCheck, FaInbox } from "react-icons/fa";
import ProductDropDown from "./ProductDropDown";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

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
    header: ({ column }) => {
      const isSorted = column.getIsSorted();
      const SortingIcon = isSorted
        ? isSorted === "asc"
          ? " 🔼"
          : " 🔽"
        : " ↕️";
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 px-2">
              Name {SortingIcon}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" side="bottom">
            <DropdownMenuItem onClick={() => column.toggleSorting(false)}>
              Asc
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => column.toggleSorting(true)}>
              Desc
            </DropdownMenuItem>
            <DropdownMenuSeparator />
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
    sortingFn: (rowA, rowB, columnId) => {
      // Case-insensitive sorting for the name column
      const a = rowA.getValue(columnId) as string;
      const b = rowB.getValue(columnId) as string;
      return a.localeCompare(b, undefined, { sensitivity: "base" });
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
  {
    id: "actions",
    cell: ({ row }) => {
      return <ProductDropDown row={row} />;
    },
  },
];
