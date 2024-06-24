import { useEffect } from "react"
import { useTasks } from "../context/TasksContext"
import TaskCard from "../components/TaskCard"
import { ChevronLeft, ChevronRight } from '../components/Icons';

function TasksPage() {

  const { getTasks, tasks, paginationDetail } = useTasks()

  useEffect(() => {
    getTasks()
  }, [])

  if (tasks.length === 0) return (<h1>No tasks</h1>)

  return (
    <>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-2">
        {
          tasks.map(task => (
            <TaskCard key={task._id} task={task} />
          ))
        }
      </div>
      <div className="flex justify-center mt-5">
        <div className="flex gap-x-2">
          <button
            className="cursor-pointer"
            onClick={() => getTasks(paginationDetail.currentPage - 1)}
            disabled={paginationDetail.prev === null}
          >
            <ChevronLeft />
          </button>
          <span>{paginationDetail.currentPage} of {paginationDetail.pages}</span>
          <button
            className="cursor-pointer"
            onClick={() => getTasks(paginationDetail.currentPage + 1)}
            disabled={paginationDetail.next === null}
          >
            <ChevronRight />
          </button>
        </div>
      </div>
    </>
  )
}

export default TasksPage