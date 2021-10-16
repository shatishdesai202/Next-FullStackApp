import fs from "fs";
import path from "path";
import matter from "gray-matter";

const postDirectory = path.join(process.cwd(), "Post-MD");

export function getPostData(fileName) {
  const filePath = path.join(postDirectory, fileName);
  const fileContent = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(fileContent);

  const postSlug = fileName.replace(/\.md$/, ""); // remove file extention

  const postData = {
    slug: postSlug,
    ...data,
    content,
  };

  return postData;
}

export function getAllPost() {
  const postFiles = fs.readdirSync(postDirectory);

  const allPost = postFiles.map((postFile) => {
    return getPostData(postFile);
  });

  return allPost.sort((postA, postB) => (postA.date > postB.date ? 1 : -1));
}

export function getAllFeatured() {
  const postFiles = fs.readdirSync(postDirectory);

  const allPost = postFiles.map((postFile) => {
    return getPostData(postFile);
  });

  return allPost
    .filter((post) => post.isFeatured === true)
    .sort((postA, postB) => (postA.date > postB.date ? 1 : -1));
}

export function getAllPostSlug() {
  const postFiles = fs.readdirSync(postDirectory);

  const allPost = postFiles.map((postFile) => {
    return getPostData(postFile);
  });

  const slugs = allPost.map((post) => {
    return {
      params: {
        slug: post.slug,
      },
    };
  });
  return slugs;
}
