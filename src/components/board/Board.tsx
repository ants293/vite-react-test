import axios from "axios";
import { useQuery } from "react-query";

interface ICard {
  name: string;
  description: string;
}

interface IColumn {
  id: string;
  name: string;
  cards: ICard[];
}

interface IBoard {
  name: string;
  columns: IColumn[];
}

export function Board() {
  const { status, data } = useQuery("boardsData", getBoards, {
    retry: 2,
  });

  return (
    <div>
      {status == "loading" && <p>Loading...</p>}
      {status == "error" && <p>Error</p>}
      {status == "success" && <p>{BoardContent(data.board)}</p>}
    </div>
  );
}

export function BoardContent(boardData: IBoard): JSX.Element {
  return (
    <div>
      <h1>{boardData.name}</h1>
      <div className="flex">
        {boardData.columns.map((column) => {
          return (
            <div key={column.id} className="flex flex-col grow">
              <h2>{column.name}</h2>
              <div className="flex flex-col">
                {column.cards.map((card) => {
                  return (
                    <div key={card.name} className="flex flex-col">
                      <p>{card.name}</p>
                      <p>{card.description}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

async function getBoards(): Promise<{ board: IBoard }> {
  try {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    // Lets put some rational api in here
    /*const response = await axios(
      "https://api.github.com/repos/tannerlinsley/react-query"
    );*/

    return {
      board: {
        name: "Board 1",
        columns: [
          {
            id: "1",
            name: "Column 1",
            cards: [{ name: "Card 1", description: "some description" }],
          },
          {
            id: "2",
            name: "Column 2",
            cards: [{ name: "Card 2", description: "some description" }],
          },
          {
            id: "3",
            name: "Column 3",
            cards: [{ name: "Card 3", description: "some description" }],
          },
          {
            id: "4",
            name: "Column 4",
            cards: [{ name: "Card 4", description: "some description" }],
          },
        ],
      },
    };
  } catch (error) {
    throw Error("Something went wrong");
  }
}
