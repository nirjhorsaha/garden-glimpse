import { useState } from "react";
import { Spinner } from "@nextui-org/react";

import { useGetAllPosts } from "@/src/hooks/getPost.hooks";

import { IPost } from "../../../types";
import { PostCard } from "../../UI/Postcard";
import CategoryChips from "../../CategoryChips";

export default function Post() {
    const [activeCategory, setActiveCategory] = useState<string>("For you");

    const { data: post, isLoading } = useGetAllPosts(activeCategory);
    
    const posts = post?.data?.result as IPost[];
    
    const postCategories = posts ? ["For you", ...Array.from(new Set(posts.map((post) => post.category)))] : [];
    
    const handleCategoryClick = (category: string) => {
        setActiveCategory(category);
    };
    
    // Filter posts by active category (if any)
    const filteredPosts = activeCategory === "For you"
    ? posts // Show all posts when "For you" is selected
    : posts.filter(post => post.category === activeCategory);
    
    
    if (isLoading ) return <Spinner />;
    
    return (
        <section className="py-4">
            <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
                <CategoryChips categories={postCategories} onCategoryClick={handleCategoryClick} />
                <div className="grid grid-cols-1 gap-y-8 md:grid-cols-1 lg:grid-cols-1 lg:gap-x-8">
                    {filteredPosts?.length > 0 &&
                        filteredPosts.map((post: IPost) => <PostCard key={post._id} post={post} />)}
                </div>
            </div>
        </section>
    );
}
