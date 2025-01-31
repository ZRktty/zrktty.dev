import { storyblokInit, apiPlugin } from "@storyblok/react/rsc";
import BlogPost from "@/components/Blog/BlogPost";
import BlogPage from "@/components/Blog/BlogPage";

export const getStoryblokApi = storyblokInit({
    accessToken: process.env.NEXT_PUBLIC_STORYBLOK_TOKEN,
    use: [apiPlugin],

    components: {
        blogPost: BlogPost,
        page: BlogPage,
    },
    // apiOptions: {
    //     region: "eu",
    // }
    // bridge: false,
    // apiOptions: {},
    // richText: {},
    // enableFallbackComponent: false,
    // customFallbackComponent: FallbackComponent,
});