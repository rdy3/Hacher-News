import { format } from "date-fns";
import { Link } from "react-router-dom";

interface CreateNewsProps {
  news: {
    title: string;
    url: string;
    author: string;
    points: number;
    story_text: null;
    comment_text: null;
    objectID: string;
    story_title: string;
    created_at: string;
    num_comments: number;
  };
}

export function CreateNews(props: CreateNewsProps) {
  const { news } = props;
  return (
    <div className="justify-left " key={news.objectID}>
      <div className="gap-6 ">
        <Link to={`/news/${news.objectID}`}>
          {news.title || news.story_title}{" "}
        </Link>
        {news.url !== undefined && (
          <a
            target="_blank"
            href={news.url}
            className="text-slate-400 text-xs place-self-center"
          >
            {new URL(news.url).hostname}
          </a>
        )}
      </div>

      <div className="flex text-slate-400 text-xs mb-3">
        {news.points} points by {news.author} -{" "}
        {format(new Date(news.created_at), "dd.MM.y")} -{" "}
        {news.num_comments || 0} comments
      </div>
    </div>
  );
}
