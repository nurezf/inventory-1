"use client";
import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandList,
  CommandGroup,
  CommandItem,
  CommandInput,
  CommandEmpty,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { LuGitPullRequestDraft } from "react-icons/lu";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";

type Category = {
  value: string;
  label: string;
};

type CategoriesDropDownProps = {
  selectedCategories: string[];
  setSelectedCategories: React.Dispatch<React.SetStateAction<string[]>>;
};

const categories: Category[] = [
  {
    value: "electronics",
    label: "Electronics",
  },
  {
    value: "clothing",
    label: "Clothing",
  },
  {
    value: "books",
    label: "Books",
  },
  {
    value: "home",
    label: "Home & Garden",
  },
  {
    value: "toys",
    label: "Toys & Games",
  },
  {
    value: "sports",
    label: "Sports & Outdoors",
  },
  {
    value: "beauty",
    label: "Beauty & Personal Care",
  },
  {
    value: "automotive",
    label: "Automotive",
  },
  {
    value: "groceries",
    label: "Groceries",
  },
  {
    value: "furniture",
    label: "Furniture",
  },
];

export function CategoriesDropDown({
  selectedCategories,
  setSelectedCategories,
}: CategoriesDropDownProps) {
  const [open, setOpen] = React.useState(false);

  function handleCheckboxChange(value: string) {
    setSelectedCategories((prevSelected) => {
      const updatedCategories = prevSelected.includes(value)
        ? prevSelected.filter((category) => category !== value)
        : [...prevSelected, value];
      console.log("Updated Categories:", updatedCategories);
      return updatedCategories;
    });
  }

  function clearFilter() {
    setSelectedCategories([]);
  }

  return (
    <div className="flex items-center space-x-4 poppins">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="secondary" className="h-10 flex items-center gap-2">
            <LuGitPullRequestDraft className="h-4 w-4" />
            Categories
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="w-56 poppins p-0"
          side="bottom" // Explicitly set to bottom
          sideOffset={5} // Add offset to ensure separation from button
          align="end"
          avoidCollisions={false} // Optional: Disable auto-flipping
        >
          <Command className="p-1">
            <CommandInput placeholder="Search categories..." />
            <CommandList>
              <CommandEmpty className="text-slate-500 text-sm text-center p-5">
                No categories found.
              </CommandEmpty>
              <CommandGroup>
                {categories.map((category) => (
                  <CommandItem
                    key={category.value}
                    value={category.value}
                    className="flex items-center gap-2"
                  >
                    <Checkbox
                      checked={selectedCategories.includes(category.value)}
                      onClick={() => handleCheckboxChange(category.value)}
                      className="size-4 rounded-[4px]"
                    />
                    {category.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
            <Separator />
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}

export default CategoriesDropDown;
