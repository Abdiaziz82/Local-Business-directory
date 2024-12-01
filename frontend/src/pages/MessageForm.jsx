import { useParams } from 'react-router-dom';

const MessageForm = () => {
  const { businessId } = useParams(); // Access the businessId from the URL

  return (
    <div>
      <h2>Message Form for Business {businessId}</h2>
      {/* Form for sending a message to the business */}
    </div>
  );
};

export default MessageForm;
