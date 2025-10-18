import React, { useMemo } from "react";
import { useParams, Navigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import matter from "gray-matter";

const mdModules = import.meta.glob("../content/*.md", { as: "raw", eager: true });

export default function PostPage() {
  const { slug } = useParams();

  const raw = useMemo(() => {
    const match = Object.entries(mdModules).find(([p]) =>
      p.split("/").pop().replace(/\.md$/, "") === slug
    );
    return match ? match[1] : null;
  }, [slug]);

  if (!raw) return <Navigate to="/writing" replace />;

  const { data, content } = matter(raw);

  return (
    <div className="space-y-8 py-12 pt-20 lg:pt-12">
      <p className="text-md text-primary">~ writing</p>
      <h1 className="text-3xl text-primary">{data.title || slug}</h1>
      {data.date && <div className="text-sm text-secondary">{data.date}</div>}
      <article className="prose dark:prose-invert max-w-none">
        <ReactMarkdown>{content}</ReactMarkdown>
      </article>
    </div>
  );
}
