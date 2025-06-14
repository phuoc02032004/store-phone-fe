import React, { useState, useEffect } from "react";
import { AlignJustify } from 'lucide-react';
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink, 
} from "@/components/ui/navigation-menu";
import { getParents, getChild } from "@/api/category"; 
import type { Category } from "@/types/Category";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils"; 

const NavCategory: React.FC = () => {
    const [parentCategories, setParentCategories] = useState<Category[]>([]);
    const [childCategories, setChildCategories] = useState<Category[]>([]);
    const [selectedParentId, setSelectedParentId] = useState<string | null>(null);
    const [selectedParentName, setSelectedParentName] = useState<string | null>(null);
    const [loadingChildren, setLoadingChildren] = useState(false);
    const [, setIsMenuOpen] = useState(false); 

    useEffect(() => {
        const fetchParents = async () => {
            try {
                const response = await getParents();
                setParentCategories(response);
            } catch (error) {
                console.error('Error fetching parent categories:', error);
            }
        };
        fetchParents();
    }, []);

    useEffect(() => {
        if (selectedParentId) {
            const fetchChildren = async () => {
                setLoadingChildren(true);
                try {
                    const response = await getChild(selectedParentId);
                    setChildCategories(response);
                } catch (error) {
                    console.error(`Error fetching children for ${selectedParentId}:`, error);
                    setChildCategories([]);
                } finally {
                    setLoadingChildren(false);
                }
            };
            fetchChildren();
        } else {
            setChildCategories([]);
        }
    }, [selectedParentId]);

    const handleParentClick = (parentId: string, parentName: string) => {
        setSelectedParentId(parentId);
        setSelectedParentName(parentName);
    };

    return (
        <NavigationMenu onValueChange={(value) => {
            if (!value) {
                setIsMenuOpen(false);
            } else {
                setIsMenuOpen(true);
            }
        }} className="w-full">
            <NavigationMenuList className="flex flex-col md:flex-row w-full ">
                <NavigationMenuItem className="w-full">
                    <NavigationMenuTrigger
                        className="flex items-center gap-2 text-white w-full justify-center md:justify-start
                     !bg-black/80
                        bg-gradient-to-tr from-[rgba(255,255,255,0.1)] to-[rgba(255,255,255,0)]
                        backdrop-blur-[10px]
                        border border-[rgba(255,255,255,0.18)]
                        shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] "
                    >
                        <AlignJustify className="h-4 w-auto" />
                        <div className="w-20 ">Categories</div>
                    </NavigationMenuTrigger>
                    <NavigationMenuContent className="w-full md:w-[600px] lg:w-[400px]">
                        <div className="grid grid-cols-2 md:grid-cols-[1fr_1.5fr] gap-x-4 p-2 ">
                            <div className="flex flex-col space-y-1 md:border-r md:pr-4 border-gray-200 dark:border-gray-700">
                                <p className="px-3 py-2 text-sm font-semibold text-gray-500 dark:text-gray-400">
                                    CATEGORIES
                                </p>
                                {parentCategories.length > 0 ? parentCategories.map(parent => (
                                    <button
                                        key={parent._id}
                                        onClick={() => handleParentClick(parent._id, parent.name)}
                                        className={cn(
                                            "w-full text-left rounded-md p-3 text-sm transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground bg-transparent",
                                            selectedParentId === parent._id && "bg-gray-200 text-accent-foreground font-semibold"
                                        )}
                                    >
                                        {parent.name}
                                    </button>
                                )) : (
                                    <p className="p-3 text-sm text-muted-foreground">No parent categories.</p>
                                )}
                            </div>

                            <div className="flex flex-col space-y-1 mt-4 md:mt-0">
                                {selectedParentId ? (
                                    <>
                                        <p className="px-3 py-2 text-sm font-semibold text-gray-500 dark:text-gray-400">
                                            {selectedParentName ? `CÁC LOẠI ${selectedParentName.toUpperCase()}` : "SUB-CATEGORIES"}
                                        </p>
                                        {loadingChildren ? (
                                            <p className="p-3 text-sm text-muted-foreground">Loading...</p>
                                        ) : childCategories.length > 0 ? (
                                            <ul className="space-y-1">
                                                {childCategories.map(child => (
                                                    <li key={child._id}>
                                                        <NavigationMenuLink asChild>
                                                            <Link
                                                                to={`/category/${child._id}`}
                                                                className={cn(
                                                                    "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                                                                )}
                                                                onClick={() => {
                                                                    setSelectedParentId(null);
                                                                    setSelectedParentName(null);
                                                                }}
                                                            >
                                                                <div className="text-sm font-medium leading-none">{child.name}</div>
                                                            </Link>
                                                        </NavigationMenuLink>
                                                    </li>
                                                ))}
                                            </ul>
                                        ) : (
                                            <p className="p-3 text-sm text-muted-foreground">No child categories.</p>
                                        )}
                                    </>
                                ) : (
                                    <div className="flex h-full items-center justify-center">
                                        <p className="p-3 text-sm text-muted-foreground">
                                            Please select a parent category to view details.
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </NavigationMenuContent>
                </NavigationMenuItem>
            </NavigationMenuList>
        </NavigationMenu>
    );
};

export default NavCategory;
