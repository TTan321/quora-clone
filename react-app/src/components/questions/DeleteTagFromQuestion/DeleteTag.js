import { useDispatch } from "react-redux"
import { loadQuestions, removeTagOnQuestion } from "../../../store/questions"
import './DeleteTag.css'

function DeleteTag({ setShowModal, tag, question }) {
    const dispatch = useDispatch();

    const currentTag = question.question_tags.find(questionTag => questionTag.tag_id === tag.id)

    console.log("CURRENT TAG: ", currentTag)
    console.log("THIS IS THE TAG: ", tag)
    console.log("THIS IS current question: ", question)

    const removeTag = () => {

        const payload = {
            question_tag_id: currentTag.id
        }

        dispatch(removeTagOnQuestion(payload))
        dispatch(loadQuestions())
        setShowModal(false)
    }

    return (
        <div className="DeleteTag">
            <div id='add-tag-cancel-div' onClick={() => setShowModal(false)}>
                <i className="fas fa-times" />
            </div>
            <div className="DeleteAlert">
                Alert
            </div>
            <p style={{ padding: '0 10px', fontWeight: 'bold' }}>Do want to remove this tag from this question?</p>
            <div className="DeleteTagButtonDiv">
                <button className="RemoveTagButton" onClick={removeTag}>Remove</button>
                {/* <button onClick={() => setShowModal(false)}>Cancel</button> */}
            </div>
        </div>
    )
}

export default DeleteTag
