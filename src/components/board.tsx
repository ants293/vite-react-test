import axios from 'axios';
import { useMemo, useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useQuery } from 'react-query';
import { BoardColumns } from './boardColumns';
import { Card } from './card';

export enum ItemTypes {
  CARD = 'card',
  BOARD = 'board',
}

export interface IBoard {
  name: string;
  columns: IColumn[];
}

export interface IColumn {
  id: string;
  name: string;
  cards: ICard[];
  accepts: ItemTypes[];
}

export interface ICard {
  id: string;
  name: string;
  description: string;
  type: ItemTypes.CARD;
}

export interface IBoard {
  name: string;
  columns: IColumn[];
}

export interface IBoardRawData {
  name: string;
  columns: {
    id: string;
    name: string;
    cards: {
      id: string;
      name: string;
      description: string;
    }[];
  }[];
}

export function Board() {
  const { status, data } = useQuery('boardsData', getBoard, {
    retry: 2,
  });

  const formattedData = useMemo(() => {
    if (data) {
      return formatBoard(data);
    }
  }, [data]);

  return (
    <div>
      {status == 'loading' && <p>Loading...</p>}
      {status == 'error' && <p>Error</p>}
      {status == 'success' && formattedData && (
        <DndProvider backend={HTML5Backend}>
          <BoardColumns boardData={formattedData} />
        </DndProvider>
      )}
    </div>
  );
}

function formatBoard(data: IBoardRawData): IBoard {
  const columns: IColumn[] = data.columns.map((rawColumn) => {
    return {
      id: rawColumn.id,
      name: rawColumn.name,
      cards: rawColumn.cards.map((rawCard) => {
        return {
          id: rawCard.id,
          name: rawCard.name,
          description: rawCard.description,
          type: ItemTypes.CARD,
        };
      }),
      accepts: [ItemTypes.CARD],
    };
  });

  return {
    name: data.name,
    columns,
  };
}

async function getBoard(): Promise<IBoardRawData> {
  try {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    // Lets put some rational api in here
    /*const response = await axios(
      "https://api.github.com/repos/tannerlinsley/react-query"
    );*/

    const response = JSON.parse(`{
      board: {
        name: 'Board 1',
        columns: [
          {
            id: '1',
            name: 'Column 1',
            cards: [
              {
                id: '121212',
                name: 'Card 1',
                description: 'some description',
              },
            ],
          },
          {
            id: '2',
            name: 'Column 2',
            cards: [
              {
                id: '234435345',
                name: 'Card 2',
                description: 'some description',
              },
            ],
          },
          {
            id: '3',
            name: 'Column 3',
            cards: [
              {
                id: '3876867867',
                name: 'Card 3',
                description: 'some description',
              },
            ],
          },
          {
            id: '4',
            name: 'Column 4',
            cards: [
              {
                id: '4090+09+',
                name: 'Card 4',
                description: 'some description',
              },
            ],
          },
        ],
      },
    }`) as { board: IBoardRawData };

    return response.board;
  } catch (error) {
    throw Error('Something went wrong');
  }
}
