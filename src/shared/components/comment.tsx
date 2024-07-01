import { format } from "date-fns";
import parse from "html-react-parser";
import { CommentsProps } from "./comments";

export function Comment(props: CommentsProps) {
  const { comments } = props;
  return (
    <div>
      {comments.map((comment) => {
        return (
          <div className="pl-5">
            <div className="pb-1 pt-2 font-semibold flex ">
              {comment.author} -{" "}
              <div className="flex text-slate-400 text-xs text-center">
                {format(new Date(comment.created_at), "dd.MM.y")}
              </div>
            </div>
            <div className="pb-7 ml-10">{parse(comment.text)}</div>
          </div>
        );
      })}
    </div>
  );
}
