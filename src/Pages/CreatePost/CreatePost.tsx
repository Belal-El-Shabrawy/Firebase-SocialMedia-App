import { CreateForm } from "./CreateForm"

export const CreatePost = () => {
    return (
        <div className="create-post-page">
            <div className="card form-card">
                <h2>Create Post</h2>
                <CreateForm/>
            </div>
        </div>
    )
}