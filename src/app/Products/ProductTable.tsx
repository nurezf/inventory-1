import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { IoClose } from "react-icons/io5";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { StatusDropDown } from "../AppTable/dropdowns/StatusDropDown";

export default function ProductTable() {
  return (
    <div className="">
      <div className="flex flex-col gap-3 mb-8 mt-6">
        <div className="flex justify-between items-center">
          <Input placeholder="Search products..." className="h-10 max-w-sm" />
          <div className="flex item-center gap-4">
            <StatusDropDown />
            <Button variant="secondary">Catagory</Button>
          </div>
        </div>
        <FilterArea />
      </div>
      <div></div>
    </div>
  );
}

function FilterArea() {
  return (
    <div className="flex  gap-2">
      {/*status */}
      <div className="flex border-dashed border rounded-sm p-1 gap-2 items-center px-2 text-sm">
        <span className="txet-grey-600">Status</span>
        <Separator orientation="vertical" />
        <div className="flex items-center gap-2">
          <Badge variant={"secondary"}>Active</Badge>
          <Badge variant={"secondary"}>Inactive</Badge>
        </div>
      </div>
      {/*catagory */}
      <div className="flex border-dashed border rounded-sm p-1 gap-2 items-center px-2 text-sm">
        <span className="txet-grey-600">Catagory</span>
        <Separator orientation="vertical" />
        <div className="flex items-center gap-2">
          <Badge variant={"secondary"}>item 1</Badge>
          <Badge variant={"secondary"}>item 2</Badge>
          <Badge variant={"secondary"}>item 3</Badge>
        </div>
      </div>
      <Button variant="ghost" className="p-1 px-2">
        <span>Reset</span>
        <IoClose className="text-lg" />
      </Button>
    </div>
  );
}

//  <Separator className="my-4" />
//   <div className="flex items-center h-5 space-x-4 text-sm">
//     <div className="">add</div>

//     <Separator orientation="vertical" />
//     <div className="">add</div>
//     <Separator orientation="vertical" />
//     <div className="">add</div>
