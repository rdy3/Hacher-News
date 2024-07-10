import { formatDistanceToNow } from "date-fns";
import parse from "html-react-parser";

export interface CommentsProps {
  comments: Comment[];
}

export interface Comment {
  id: number;
  created_at: string;
  author: string;
  text: string;
  points: number;
  parent_id: number;
  children: Comment[];
}

export function Comments(props: CommentsProps) {
  const { comments } = props;
  return (
    <div>
      {comments.map((comment) => {
        return (
          <div className="pl-4 flex-row gap-3 border-l-4 ml-2" key={comment.id}>
            <div className="flex pb-1 font-semibold">{comment.author}</div>
            <div className="flex text-slate-400 text-xs text-center">
              {formatDistanceToNow(new Date(comment.created_at))} ago
            </div>
            <div className="pb-7 ">{parse(comment.text)}</div>
            <div className="pl-5">
              <Comments comments={comment.children} />
            </div>
          </div>
        );
      })}
    </div>
  );
}
