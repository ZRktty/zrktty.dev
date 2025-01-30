import { getStoryblokApi } from "@storyblok/react";

interface Story {
    uuid: string;
    content: {
        title: string;
    };
}

export default async function BlogPage() {
    const storyblokApi = getStoryblokApi();
    const { data } = await storyblokApi.get('cdn/stories', {
        version: 'published',
        content_type: 'blogPost',
    });

    return (
        <div>
            <h1>Blog Posts</h1>
            {data.stories.map((story: Story) => (
                <div key={story.uuid}>
                    <h2>{story.content.title}</h2>
                    {/* Add more blog post preview content */}
                </div>
            ))}
        </div>
    );
}