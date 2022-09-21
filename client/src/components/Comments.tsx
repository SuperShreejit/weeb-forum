import { CONTAINER_CLASS } from "../constants/component"
import { CommentType } from "../hooks/useViewPost"
import Comment from './Comment'

type CommentsProps = {
  comments: CommentType[]
}

const Comments = ({ comments }: CommentsProps) => {
  return (
    <div className={CONTAINER_CLASS.FLEX_VERITICAL}>
      {comments.map((comment:CommentType) => (<Comment comment={comment}/>))}
    </div>
  )
}

export default Comments