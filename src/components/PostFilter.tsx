/* eslint-disable prettier/prettier */
"use client"; // Ensure this is a client component

import { useState, useEffect } from "react";

interface PostFilterProps {
    categories: string[];
    onCategoryChange: (category: string) => void;
}

export const PostFilter: React.FC<PostFilterProps> = ({ categories, onCategoryChange }) => {
    const [selectedCategory, setSelectedCategory] = useState("");

    useEffect(() => {
        onCategoryChange(selectedCategory);
    }, [selectedCategory, onCategoryChange]);

    const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedCategory(event.target.value);
    };

    return (
        <div className="mb-4">
            <label htmlFor="category" className="block text-sm font-medium text-gray-700">Filter by Category</label>
            <select
                id="category"
                value={selectedCategory}
                onChange={handleCategoryChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
                <option value="">All Categories</option>
                {categories.map((category) => (
                    <option key={category} value={category}>
                        {category}
                    </option>
                ))}
            </select>
        </div>
    );
};
