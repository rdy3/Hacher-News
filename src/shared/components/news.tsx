import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Comments, Comment } from "./comments";
import { format } from "date-fns";

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
          {newsResponse?.points} point - {newsResponse?.author} -{" "}
          {newsResponse?.created_at !== undefined &&
            format(new Date(newsResponse?.created_at), "dd.MM.y")}
        </div>
      </div>

      <Comments comments={newsResponse?.children || []} />
    </div>
  );
}
