import { Post } from '@baseline/types/post';

export const postMapper = (data: Post): Post => {
  const post: Post = {
    postId: data?.postId,
    title: data?.title,
    html: data?.html,
    slug: data?.slug,
    publishedAt: data?.publishedAt,
    author: data?.author,
    excerpt: data?.excerpt,
    status: data?.status,
    commentStatus: data?.commentStatus,
    createdAt: data?.createdAt,
    updatedAt: data?.updatedAt,
    postType: data?.postType,
    previewImage: data?.previewImage,
    headerImage: data?.headerImage,
    videoUrl: data?.videoUrl,
    category: data?.category,
  };
  return post;
};
