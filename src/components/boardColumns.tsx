import { useMemo, useState } from 'react';
import { DndProvider, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { IBoard, ICard, IColumn } from './board';
import { Card } from './card';

export function BoardColumns(props: { boardData: IBoard }): JSX.Element {
  /*const [{ isOver, canDrop }, drop] = useDrop({
    accept,
    drop: () => {},
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });*/

  return (
    <div className="mx-6">
      <h1 className="text-center pb-5">{props.boardData.name}</h1>
      <div className="flex gap-3">
        {props.boardData.columns.map((column: IColumn) => {
          return (
            <div
              key={column.id}
              className="flex flex-col grow rounded-lg px-5 py-3 bg-slate-100"
            >
              <h2 className="p-3">{column.name}</h2>
              <div className="flex flex-col">
                {column.cards.map((card: ICard) => {
                  return <Card key={card.id} {...card} />;
                })}
                <button>+ Add a card</button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
