import React, { useState } from "react";
import { Chip } from "@nextui-org/react";

interface CategoryChipsProps {
    categories: string[];
    onCategoryClick: (category: string) => void; 
}

const CategoryChips: React.FC<CategoryChipsProps> = ({ categories, onCategoryClick }) => {
    const [activeCategory, setActiveCategory] = useState("For you");

    const handleClick = (category: string) => {
        setActiveCategory(category); // Set active category
        onCategoryClick(category); // Log the clicked category
    };

    return (
        <div className="flex flex-wrap mb-4 cursor-pointer">
            {categories.map((category, index) => (
                <div key={index} className="flex items-center mb-2 lg:mb-0">
                    <Chip
                        className={`capitalize text-sm px-2 inline-block rounded-full mr-2 ${
                            activeCategory === category
                                ? 'bg-blue-500 text-white'
                                : 'bg-zinc-300 dark:bg-slate-600'
                        }`}
                        color="default"
                        size="sm"
                        variant="flat"
                        onClick={() => handleClick(category)}
                    >
                        {category}
                    </Chip>
                </div>
            ))}
        </div>
    );
};

export default CategoryChips;
