import React, {FC} from 'react';
import {useDroppable} from '@dnd-kit/core';

interface props {
    children?: React.ReactNode;
    id: string;
}
export const Droppable: FC<props> = (props) => {
    const {isOver, setNodeRef} = useDroppable({
        id: props.id,
    });
    const style = {
        backgroundColor: isOver ? 'green' : 'blue',
        border: '2px solid #ddd',
        padding: '100px',
        marginBottom: '10px',
    };


    return (
        <div ref={setNodeRef} style={style}>
            {props.children}
        </div>
    );
}