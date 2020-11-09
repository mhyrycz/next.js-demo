/**
 * The paths returned as argument will be build at build time.
 */
export const getStaticPaths = async () => {

    // Define all paths to be pre-render 
    // The slug is an array 
    // The slug name is slug because this is the name of the file `...slug.js`

    const questions = [{ examId: "1", questionId: "2" }, { examId: "3", questionId: "4" }]

    const paths = questions
        .map(question => ({
            params: { slug: [question.examId, question.questionId] },
        }))

    // { fallback: false } means other routes should 404.
    return { paths, fallback: false }
}

export const getStaticProps = async ({ params }) => {

    try {
        const slug = params.slug
        const examId = Number(slug[0]);
        const questionId = Number(slug[1]);

        return {
            props: {
                examId,
                questionId
            }
        }
    } catch (err) {
        return { props: { errors: err.message } }
    }
}


export default function QuestionPage(props) {
    console.log(props)
    const { examId, questionId, errors } = props;

    if (errors) {
        return (
            <Page title={`Error`}>
                <p>
                    <span style={{ color: 'red' }}>Error:</span> {errors}
                </p>
            </Page>
        )
    }
    return (
        <div>
            <h1>Question {questionId} from Exam {examId}</h1>
        </div>

    )
}