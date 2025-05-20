
import { useParams } from 'react-router-dom';
import { NoteCard } from '@/components/NoteCard';

const NotePage = () => {
  const { id } = useParams<{ id: string }>();
  
  if (!id) {
    return <div>Invalid note ID</div>;
  }
  
  return (
    <div className="flex flex-col items-center mx-auto p-4">
      <NoteCard id={id} />
    </div>
  );
};

export default NotePage;
