import { Link } from "react-router-dom";
import { useTasks } from "../context/TasksContext";

import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
dayjs.extend(utc)

// eslint-disable-next-line react/prop-types
function TaskCard({ task }) {

    const { deleteTask } = useTasks()

    return (
        <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md">
            <header className="flex justify-between">
                {/* eslint-disable-next-line react/prop-types */}
                <h1 className="text-2xl font-bold">{task.title}</h1>
                <div className="flex gap-x-2 items-center">
                    <button
                        className='bg-red-500 hover:bg-red-600 text-while px-4 py-2 rounded-md'
                        onClick={() => {
                            // eslint-disable-next-line react/prop-types
                            deleteTask(task._id);
                        }}>Delete</button>
                    <Link
                        className='bg-blue-500 hover:bg-blue-600 text-while px-4 py-2 rounded-md'
                        //  eslint-disable-next-line react/prop-types
                        to={`/tasks/${task._id}`}
                    >
                        Edit
                    </Link>
                </div>
            </header>
            {/* eslint-disable-next-line react/prop-types */}
            <p className="text-slate-300">{task.description}</p>
            <p>
                {/* eslint-disable-next-line react/prop-types */}
                {dayjs(task.date).utc().format("DD/MM/YYYY")}
            </p>
        </div>
    )
}

export default TaskCard