import { DndContext, DragEndEvent } from '@dnd-kit/core';
import React, {FC, useState} from "react";
import {Droppable} from "./Droppable";
import {Draggable} from "./Draggable";
interface Task {
    id: string;
    title: string;
    description: string;
    status: string;
}

const initialTasks: Task[] = [
    {
        id: 'task-1',
        title: 'Task 1',
        description: 'This is task 1',
        status: 'Not-Started'
    },
    {
        id: 'task-2',
        title: 'Task 2',
        description: 'This is task 2',
        status: 'Not-Started'
    },
    {
        id: 'task-3',
        title: 'Task 3',
        description: 'This is task 3',
        status: 'In-Progress'
    },
    {
        id: 'task-4',
        title: 'Task 4',
        description: 'This is task 4',
        status: 'In-Progress'
    },
    {
        id: 'task-5',
        title: 'Task 5',
        description: 'This is task 5',
        status: 'Completed'
    },
];
interface MyComponentProps {
    children?: React.ReactNode;
    id?: string;
    style?: React.CSSProperties;
}

// Successful DnD created in Typescript
// In summary, there are three containers and based on the containers, the tasks are displayed
// in the containers based on their status
export const Dashboard: FC = () => {
    const [tasks, setTasks] = useState<Task[]>(initialTasks);
    const [parent, setParent] = useState<string | null>(null);
    const containers = ['Not-Started', 'In-Progress', 'Completed'];
    // Creates a draggable for each task
    // const draggableMarkup = tasks.map((item) => (
    //     <Draggable id={item.id}>{item.title}</Draggable>
    // ));

    // Handles the drag end event
    function handleDragEnd(event: DragEndEvent) {
        const {over} = event;
        console.log('over is ', over);
        if (over) {
            // Find the task that was dragged
            console.log('event id is ', event.active.id)
            const draggedTask = tasks.find((task) => task.id === event.active.id);
            console.log('dragged task was ', draggedTask)
            if (draggedTask) {
                // The task's status is updated using the container's id which is either Not-Started
                // In-Progress, or Completed
                const newTasks = tasks.map((task) => {
                    if (task.id === draggedTask.id) {
                        return {...task, status: String(over.id)};
                    }
                    return task;
                });
                setTasks(newTasks);
            }
            setParent(String(over.id));
        } else {
            setParent(null);
        }
    }


    console.log(parent +' parent type' + typeof parent);

    // In this updated code, we're mapping over the tasks array for each container, and returning a Draggable component
    // only if the task's status matches the current container id. If the status property of a task matches a container's id,
    // the Draggable is rendered within that Droppable, otherwise it's not rendered at all.
    return (
        <DndContext onDragEnd={handleDragEnd}>
            {containers.map((id) => (
                <div key={id}>
                    <h1>{id}</h1>
                    <Droppable id={id}>
                        {tasks.map((task) => {
                            if (task.status === id) {
                                return <Draggable key={task.id} id={task.id}>{task.title}</Draggable>;
                            }
                            return null;
                        })}
                    </Droppable>
                </div>
            ))}
        </DndContext>
    );



};

