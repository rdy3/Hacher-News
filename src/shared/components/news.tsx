import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Comments, Comment } from "./comments";
import { formatDistanceToNow } from "date-fns";

export interface CommentsResponse {
  id: number;
  created_at: string;
  author: string;
  title: string;
  url: string;
  text: string;
  points: number;
  parent_id: null;
  children: Comment[];
}
[];

export function News() {
  const { newsId } = useParams();
  const [newsResponse, setNewsResponse] = useState<CommentsResponse>();
  

  useEffect(() => {
    getNews();
  }, []);

  async function getNews() {
    const response = await fetch(
      `http://hn.algolia.com/api/v1/items/${newsId}`
    );
    const news = await response.json();
    setNewsResponse(news);
    console.log(news);
  }

  return (
    <div id={newsId} className="ml-6 mt-5 mr-6">
      <div className="gap-3 flex-auto ">
        <div className="font-semibold text-3xl">{newsResponse?.title}</div>
        <div className="text-slate-400 text-xs mt-3">
          {newsResponse?.points} point - {newsResponse?.author} ago -{" "}
          {newsResponse?.created_at !== undefined &&
            formatDistanceToNow(new Date(newsResponse?.created_at))}
        </div>
        <div className="border-b-4 pb-4 mb-4">{newsResponse?.text}</div>
      </div>
      <div className="text-3xl font-semibold pb-5">Comments</div>
      <Comments comments={newsResponse?.children || []} />
    </div>
  );
}
