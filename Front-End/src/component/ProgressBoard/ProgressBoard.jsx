import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { TicketData, UpdateTicketStatus } from '../../getData/TicketData';

const KanbanBoard = () => {
    const [tickets, setTickets] = useState([]);
    const [columns, setColumns] = useState({
        'open': {
            name: 'Open',
            items: [],
        },
        'to do': {
            name: 'To Do',
            items: [],
        },
        'in progress': {
            name: 'In Progress',
            items: [],
        },
        'done': {
            name: 'Done',
            items: [],
        },
    });

    useEffect(() => {
        const fetchTickets = async () => {
            try {
                await TicketData()
                    .then(res => {
                        console.log('Fetched tickets:', res);
                        if( res && Array.isArray(res)) {
                            setTickets(res);
                            const newColumns = { ...columns };
                            res.forEach(ticket => {
                                if (newColumns[ticket.status]) {
                                    newColumns[ticket.status].items.push(ticket);
                                }
                            });
                            setColumns(newColumns);
                        }
                    })
                    .catch(err => console.error(err));
                    console.log(tickets);

            } catch (error) {
                console.error('Error fetching tickets:', error);
            }
        };
        fetchTickets();
    }, []);

    const onDragEnd = (result) => {
        const { source, destination, draggableId } = result;

        if (!destination) {
            return;
        }

        if (source.droppableId === destination.droppableId &&
            source.index === destination.index) {
            return;
        }

        const draggedTicket = columns[source.droppableId].items.find(
            (item) => item._id === draggableId
        );

        if (!draggedTicket) {
            return;
        }

        const startColumn = columns[source.droppableId];
        const endColumn = columns[destination.droppableId];

        if (startColumn === endColumn) {
            const newItems = Array.from(startColumn.items);
            const [removed] = newItems.splice(source.index, 1);
            newItems.splice(destination.index, 0, removed);

            setColumns({
                ...columns,
                [startColumn.name]: {
                    ...startColumn,
                    items: newItems,
                },
            });
        } else {
            const startItems = Array.from(startColumn.items);
            const [removed] = startItems.splice(source.index, 1);
            const endItems = Array.from(endColumn.items);
            endItems.splice(destination.index, 0, removed);

            setColumns({
                ...columns,
                [source.droppableId]: {
                    ...startColumn,
                    items: startItems,
                },
                [destination.droppableId]: {
                    ...endColumn,
                    items: endItems,
                },
            });

            UpdateTicketStatus(draggableId, destination.droppableId);
        }
    };

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <div className="flex space-x-4 p-4 mt-18">
                {Object.entries(columns).map(([columnId, column], index) => (
                    <Droppable droppableId={columnId} key={columnId || index}>
                        {(provided, snapshot) => (
                            <div
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                                className={`bg-gray-100 p-4 rounded-lg shadow-md w-1/3 min-h-[300px] ${snapshot.isDraggingOver ? 'bg-blue-100' : ''
                                    }`}
                            >
                                <h2 className="text-xl font-semibold mb-4 text-gray-800">{column.name}</h2>
                                {column.items.map((item, itemIndex) => (
                                    <Draggable key={item._id} draggableId={item._id} index={itemIndex}>
                                        {(provided, snapshot) => (
                                            <div
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                                className={`bg-white p-3 mb-3 rounded-md shadow-sm border border-gray-200 cursor-grab ${snapshot.isDragging ? 'border-blue-500 shadow-lg' : ''
                                                    }`}
                                            >
                                                <h3 className="font-medium text-gray-900">{item.title}</h3>
                                                <p className="text-sm text-gray-600">Priority: {item.priority}</p>
                                                <p className="text-sm text-gray-600">Assignee: {item.assignee?.name || 'N/A'}</p>
                                            </div>
                                        )}
                                    </Draggable>
                                ))}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                ))}
            </div>
        </DragDropContext>
    );
};

export default KanbanBoard;