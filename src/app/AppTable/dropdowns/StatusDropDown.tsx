"use client";
import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandList, // Corrected import
  CommandGroup,
  CommandItem,
} from "@/components/ui/command";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";

import { LuGitPullRequestDraft } from "react-icons/lu";
import { FaCheck } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { FaInbox } from "react-icons/fa";

type status = {
  value: string;
  label: string;
  icon: React.ReactNode;
};

const statuses: status[] = [
  {
    value: "published",
    label: "Published",
    icon: <LuGitPullRequestDraft className="text-green-500" />,
  },
  {
    value: "inactive",
    label: "Inactive",
    icon: <IoClose className="text-red-500" />,
  },
  {
    value: "draft",
    label: "Draft",
    icon: <FaInbox className="text-yellow-500" />,
  },
];

export function StatusDropDown() {
  const [open, setOpen] = React.useState(false);

  function returnColor(status: string) {
    switch (status) {
      case "published":
        return "text-green-500 bg-green-100";
      case "inactive":
        return "text-red-500 bg-red-100";
      case "draft":
        return "text-yellow-500 bg-grey-100"; // Note: 'bg-grey-100' might be a typo; consider 'bg-gray-100'
      default:
        return "";
    }
  }

  return (
    <div className="flex items-center space-x-4 poppins">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="secondary" className="w-full">
            <LuGitPullRequestDraft />
            Status
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="w-48 poppins p-0"
          side="bottom"
          align="center"
        >
          <Command className="p-1">
            <CommandList>
              {" "}
              {/* Corrected from CommandLsit */}
              <CommandGroup>
                {statuses.map((status) => (
                  <CommandItem
                    key={status.value}
                    value={status.value}
                    className={`flex items-center gap-2 ${returnColor(
                      status.value
                    )}`}
                  >
                    <Checkbox className="mr-2" />
                    {status.icon}
                    {status.label}
                    <FaCheck className="ml-auto" />
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
            <div className="flex flex-col gap-2 text-[23px]">
              <Separator />
              <Button variant="ghost" className="p-1 px-2">
                Clear Filters
              </Button>
            </div>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}

export default StatusDropDown; // Ensure default export
