import React, {FC} from 'react';
import {useDraggable} from '@dnd-kit/core';

interface props {
    children?: React.ReactNode;
    id: string;
}
export const Draggable: FC<props> = (props) => {
    const {attributes, listeners, setNodeRef, transform} = useDraggable({
        id: props.id
    });
    const style = transform ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
        cursor: 'move',
        background: '#4CAF50',
        color: 'white',
        padding: '10px',
        borderRadius: '5px',
        boxShadow: '0px 1px 5px 0px rgba(0,0,0,0.25)',
    } : undefined;



    return (
        <button ref={setNodeRef} style={style} {...listeners} {...attributes}>
            {props.children}
        </button>
    );
}