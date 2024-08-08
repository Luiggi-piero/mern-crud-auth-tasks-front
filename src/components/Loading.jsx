import { useLoading } from "../context/LoadingContext.jsx"

function Loading() {

    const { isLoading } = useLoading();

    if (!isLoading) return;

    return (
        <div className="container-loading">
            <div className="loader">
                <span className="loader-text">loading</span>
                <span className="load"></span>
            </div>
        </div>

    )
}

export default Loading