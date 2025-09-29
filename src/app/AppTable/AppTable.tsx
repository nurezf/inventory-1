import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ProductTable from "../Products/ProductTable";
import { products } from "../Products/productData";
import { columns } from "../Products/Columns";
import ProductDialog from "./ProductDialog/ProductDialog";
import { useProductStore } from "../useProductStore";
import { useEffect } from "react";

export default function AppTable() {
  const { allProducts, loadProducts } = useProductStore();
  useEffect(() => {
    loadProducts();
  }, []);

  return (
    <Card className="mt-12 flex flex-col shadow-none poppins border-none ">
      <CardHeader className="flex justify-between p-2">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="font-bold text-[23px]">Products</CardTitle>
            <p className="text-sm text-slate-600">34 products</p>
          </div>
        </div>
        <ProductDialog />
      </CardHeader>
      <CardContent>
        <ProductTable
          data={Array.isArray(allProducts) ? allProducts : []}
          columns={columns}
        />
      </CardContent>
    </Card>
  );
}
