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


export const Dashboard: FC = () => {
    const [tasks, setTasks] = useState<Task[]>(initialTasks);
    const [parent, setParent] = useState<any>(null);
    const containers = ['A', 'B', 'C'];
    const draggableMarkup = (
        <Draggable id="draggable">Drag me</Draggable>
    );

    function handleDragEnd(event: DragEndEvent) {
       const {over} = event;
       setParent(over ? over.id : null);
    }

    return (
        <DndContext onDragEnd={handleDragEnd}>
            {parent === null ? draggableMarkup : null}

            {containers.map((id) => (
                // We updated the Droppable component so it would accept an `id`
                // prop and pass it to `useDroppable`
                <>
                    <h1>{id}</h1>
                <Droppable key={id} id={id}>
                    {parent === id ? draggableMarkup : 'Drop here'}
                </Droppable>
                </>
            ))}
        </DndContext>
    );


};

