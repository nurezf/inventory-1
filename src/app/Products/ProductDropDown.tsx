import { Row } from "@tanstack/react-table";
import { Product } from "./Columns";

import { FaRegEdit } from "react-icons/fa";
import { MdContentCopy, MdOutlineDelete } from "react-icons/md";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";

export default function ProductDropDown({ row }: { row: Row<Product> }) {
  console.log(row);

  const menuItem = [
    {
      icon: <MdContentCopy />,
      label: "copy",
      className: "",
    },
    { icon: <FaRegEdit />, label: "Edit", className: "" },
    { separator: true },
    {
      icon: <MdOutlineDelete />,
      label: "Delete",
      className: "text-red-600",
    },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {menuItem.map((item, index) =>
          item.separator ? (
            <DropdownMenuSeparator key={index} />
          ) : (
            <DropdownMenuItem
              key={index}
              className={`cursor-pointer flex items-center gap-2 ${item.className}`}
              onClick={() => {
                // Handle item click
                console.log(
                  `${item.label} clicked for row id: ${row.original.id}`
                );
              }}
            >
              {item.icon}
              {item.label}
            </DropdownMenuItem>
          )
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
