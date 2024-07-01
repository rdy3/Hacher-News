import { format } from "date-fns";
import parse from "html-react-parser";
import { Comment } from "./comment";

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
          <div className="pt-3 flex-row gap-3" key={comment.id}>
            <div className="flex pb-1 pt-2 font-semibold">{comment.author}</div>
            <div className="flex text-slate-400 text-xs text-center">
              {format(new Date(comment.created_at), "dd.MM.y")}
            </div>
            <div className="pb-7 ">{parse(comment.text)}</div>
            <div className="pl-5">
              {comment.children.map(() => {
                return <Comments comments={comment.children} />;
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
