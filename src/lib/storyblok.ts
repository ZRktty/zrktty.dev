import { storyblokInit, apiPlugin } from "@storyblok/react";
import BlogPost from "@/components/Blog/BlogPost";
import BlogPage from "@/components/Blog/BlogPage";

storyblokInit({
    accessToken: process.env.NEXT_PUBLIC_STORYBLOK_TOKEN,
    use: [apiPlugin],
    components: {
        blogPost: BlogPost,
        page: BlogPage,
    }
});