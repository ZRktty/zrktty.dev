
import { storyblokEditable, SbBlokData } from "@storyblok/react";

interface Blok extends SbBlokData {
  title: string;
  content: string;
}
const BlogPost = ({ blok }: { blok: Blok }) => {
    return (
        <article {...storyblokEditable(blok)}>
            <h1>{blok.title}</h1>
            <div>{blok.content}</div>
        </article>
    );
};

export default BlogPost;