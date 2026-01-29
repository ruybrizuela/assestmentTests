import React from "react";

const FeedbackSystem = () => {
  const [cards, setCards] = React.useState([{
    id:0,
    title: 'Readability',
    upVotes: 0,
    downVotes: 0
  },{
    id:1,
    title: 'Performance',
    upVotes: 0,
    downVotes: 0
  },{
    id:2,
    title: 'Security',
    upVotes: 0,
    downVotes: 0
  },{
    id:3,
    title: 'Documentation',
    upVotes: 0,
    downVotes: 0
  },{
    id:4,
    title: 'Testing',
    upVotes: 0,
    downVotes: 0
  }])
  const upvote = (cardId) => {
    setCards(prev =>
      prev.map(card =>
        card.id === cardId ? { ...card, upVotes: card.upVotes + 1 } : card
      )
    );
  };
  const downvote = (cardId) => {
    setCards(prev =>
      prev.map(card =>
        card.id === cardId ? { ...card, downVotes: card.downVotes + 1 } : card
      )
    );
  };
  return (
    
    <div className="my-0 mx-auto text-center w-mx-1200">
      { cards.map((card)=>(
      <div className="flex wrap justify-content-center mt-30 gap-30">
        <div className="pa-10 w-300 card">
          <h2>{card.title}</h2>
          <div className="flex my-30 mx-0 justify-content-around">
            <button className="py-10 px-15" data-testid={`upvote-btn-${card.id}`} onClick={() => upvote(card.id)}>
              👍 Upvote
            </button>
            <button className="py-10 px-15 danger" data-testid={`downvote-btn-${card.id}`} onClick={() => downvote(card.id)}>
              👎 Downvote
            </button>
          </div>
          <p className="my-10 mx-0" data-testid={`upvote-count-${card.id}`}>
            Upvotes: <strong>{card.upVotes}</strong>
          </p>
          <p className="my-10 mx-0" data-testid={`downvote-count-${card.id}`}>
            Downvotes: <strong>{card.downVotes}</strong>
          </p>
        </div>
      </div>
      ))}
    </div>
  );
};

export default FeedbackSystem;
