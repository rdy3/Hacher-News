import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import parse from "html-react-parser";

interface CommentsResponse {
  id: number;
  created_at: string;
  author: string;
  title: string;
  url: string;
  text: string;
  points: number;
  parent_id: null;
  children: [
    {
      id: number;
      created_at: string;
      author: string;
      text: string;
      points: number;
      parent_id: number;
      children: [
        {
          id: number;
          created_at: string;
          author: string;
          text: string;
          points: number;
          parent_id: number;
          children: [];
        }
      ];
    }
  ];
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
    const news = response.json();
    setNewsResponse(await news);
    console.log(news);
  }

  return (
    <div id={newsId} className="ml-6 mt-5 mr-6">
      <div className="gap-3 flex-auto rounded border-2">
        {newsResponse?.title}
        {newsResponse?.author}
      </div>
      {newsResponse?.children.map((news) => {
        return (
          <div className="pt-3 flex-row gap-3">
            <div className="pb-3 basis-1/3">{news.author}</div>
            <div className="basis-2/3 rounded border-2 border-cyan-800">
              {parse(news.text)}
            </div>
            <div className="justify-items-end">
              {news.children.map((comments) => {
                return <div className="pt-3 ml-10">{parse(comments.text)}</div>;
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
