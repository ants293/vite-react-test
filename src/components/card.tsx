import { useDrag } from 'react-dnd';
import { ItemTypes } from './board';

export function Card({
  id,
  name,
  description,
}: {
  id: string;
  name: string;
  description: string;
}): JSX.Element {
  const [{ opacity }, dragRef] = useDrag(
    () => ({
      type: ItemTypes.CARD,
      item: { id, name },
      collect: (monitor) => ({
        opacity: monitor.isDragging() ? 0.5 : 1,
      }),
      end: (item, monitor) => {
        console.log(`ok ${item.name}`);
        const dropResult = monitor.getDropResult();
        if (item && dropResult) {
          alert(`You dropped BLA into BLA!`);
        }
      },
    }),
    []
  );

  return (
    <div
      key={id}
      ref={dragRef}
      style={{ opacity }}
      className="flex flex-col rounded-lg p-3 bg-red-500"
    >
      <h3>{name}</h3>
      <p>{description}</p>
    </div>
  );
}
