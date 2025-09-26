"use client";

import { useState } from "react"; // Added missing import
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { IoClose } from "react-icons/io5";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { StatusDropDown } from "../AppTable/dropdowns/StatusDropDown";
import { CategoriesDropDown } from "../AppTable/dropdowns/CategoryDropDown";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export interface PaginationType {
  pageIndex: number;
  pageSize: number; // Fixed typo from 'pagesize' to 'pageSize'
}

// PaginationSelection Component
function PaginationSelection({
  pagination,
  setPagination,
  table,
}: {
  pagination: PaginationType;
  setPagination: React.Dispatch<React.SetStateAction<PaginationType>>;
  table: ReturnType<typeof useReactTable>;
}) {
  return (
    <div className="flex items-center gap-4">
      <select
        value={pagination.pageSize}
        onChange={(e) =>
          setPagination((prev) => ({
            ...prev,
            pageSize: Number(e.target.value),
          }))
        }
        className="h-8 rounded-md border px-2 text-sm"
      >
        {[10, 20, 30, 40, 50].map((size) => (
          <option key={size} value={size}>
            Show {size}
          </option>
        ))}
      </select>
    </div>
  );
}

export default function ProductTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [pagination, setPagination] = useState<PaginationType>({
    pageIndex: 0,
    pageSize: 10, // Set reasonable default
  });

  const table = useReactTable({
    data,
    columns,
    state: {
      pagination,
    },
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div>
      <div className="flex flex-col gap-3 mb-8 mt-6">
        <div className="flex justify-between items-center">
          <Input placeholder="Search products..." className="h-10 max-w-sm" />
          <div className="flex items-center gap-4">
            <StatusDropDown />
            <CategoriesDropDown />
          </div>
        </div>
        <FilterArea />
      </div>
      <div>
        <div className="overflow-hidden rounded-md border">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
      <div className="flex items-center justify-between mt-5">
        <PaginationSelection
          pagination={pagination}
          setPagination={setPagination}
          table={table}
        />
        <div className="flex gap-6 items-center">
          <span className="text-sm text-gray-500">
            Page {pagination.pageIndex + 1} of {table.getPageCount()}
          </span>
          <div className="flex items-center justify-end space-x-2 py-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.setPageIndex(0)}
              disabled={!table.getCanPreviousPage()}
            >
              {"<<"}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              {"<"}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              {">"}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.setPageIndex(table.getPageCount() - 1)}
              disabled={!table.getCanNextPage()}
            >
              {">>"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

function FilterArea() {
  return (
    <div className="flex gap-2">
      <div className="flex border-dashed border rounded-sm p-1 gap-2 items-center px-2 text-sm">
        <span className="text-gray-600">Status</span>
        <Separator orientation="vertical" />
        <div className="flex items-center gap-2">
          <Badge variant="secondary">Published</Badge>
          <Badge variant="secondary">Inactive</Badge>
          <Badge variant="secondary">Draft</Badge>
        </div>
      </div>
      <div className="flex border-dashed border rounded-sm p-1 gap-2 items-center px-2 text-sm">
        <span className="text-gray-600">Category</span>
        <Separator orientation="vertical" />
        <div className="flex items-center gap-2">
          <Badge variant="secondary">Electronics</Badge>
          <Badge variant="secondary">Clothing</Badge>
          <Badge variant="secondary">Books</Badge>
        </div>
      </div>
      <Button variant="ghost" className="p-1 px-2">
        <span>Reset</span>
        <IoClose className="text-lg" />
      </Button>
    </div>
  );
}
