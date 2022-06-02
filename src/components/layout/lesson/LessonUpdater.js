import React, { useId } from 'react'

function LessonUpdater() {
    const textId = useId();
    const fileId = useId();
    const titleId = useId();


  return (
    <>
        <form>
            <div class="mb-3">
                <label for={titleId} class="form-label">Email address</label>
                <input type="text" class="form-control" id={titleId} />
                <div class="form-text">We'll never share your email with anyone else.</div>
            </div>
            <div class="mb-3">
                <label for={fileId} class="form-label">Default file input example</label>
                <input class="form-control" type="file" id={fileId}/>
            </div>
            <div class="mb-3">
                <label for={textId}class="form-label">Example textarea</label>
                <textarea class="form-control" id={textId} rows="3"></textarea>
            </div>
        </form>
    </>
  )
}

export default LessonUpdater