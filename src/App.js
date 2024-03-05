import { useState } from "react";


function App() {
  const initialFriends = [
    {
      id: 118836,
      name: "Clark",
      image: "https://i.pravatar.cc/48?u=118836",
      balance: -7,
    },
    {
      id: 933372,
      name: "Sarah",
      image: "https://i.pravatar.cc/48?u=933372",
      balance: 20,
    },
    {
      id: 499476,
      name: "Anthony",
      image: "https://i.pravatar.cc/48?u=499476",
      balance: 0,
    },
  ];
  
  return (
    <div className="App">
      <FriendList list={initialFriends} />
    </div>
  );
}

export default App;

function FriendList({list}){

  const [addfriend,setAddFriend] = useState(false);
  const [openBill,SetOpenBill] = useState(true);

  function addNewFriend(){
    addfriend ? setAddFriend(false) : setAddFriend(true);
  }

  function openSplitBill(){
    openBill ? SetOpenBill(false) : SetOpenBill(true);
  }

  return(
    <div className="app">
      <ul className="sidebar">
        {list.map((friends)=> <Friend friend = {friends} key={friends.id} openBill={openSplitBill} />)}
        {!addfriend && (
        <li>
          <Button onclick={addNewFriend} >Add friend</Button>
        </li>
        )}
        <>
        <AddFriend addfriend={addfriend} />
        {addfriend && (<li><Button onclick={addNewFriend} >Close</Button></li>)}
        </>
      </ul>
      {openBill && <FormSplitBill />}
    </div>
  );
}

function Friend({friend,openBill}){
  return(
    <ul >
    <li>
      <img src={friend.image} alt={friend.name} />
      <h3>{friend.name}</h3>
      {friend.balance < 0 && (
        <p className="red">You owe {friend.name} ${Math.abs(friend.balance)}</p>
      )}
      {friend.balance > 0 && (
        <p className="green">{friend.name} ows you ${Math.abs(friend.balance)}</p>
      )}
      {friend.balance === 0 && (
        <p>You and {friend.name} are even</p>
      )}
      <Button onclick={openBill} >Select</Button>
    </li>
    </ul>
  )
}

function Button({onclick, children}){
  return (
    <button className="button" onClick={onclick} >{children}</button>
  )
}

function AddFriend({addfriend}){
  const [name, setName] = useState('');
  const [image, setImage] = useState('');
  

  function handleSubmit(e){
    e.preventDefault();

    const id = crypto.randomUUID();
    const newFriend = {
      id,
      name,
      image: `${image}?=${id}`,
      balance: 0,
    }
    console.log(newFriend);
  }

  return(
    <div>
    {addfriend && (
      <form className="form-add-friend" onSubmit={handleSubmit}>
        <label>👩🏻‍🤝‍👩🏻Friend Name</label>
        <input type="text" value={name} onChange={e=>setName(e.target.value)} ></input>
        <label>📷Image URL</label>
        <input type="text" value={image} onChange={e=>setImage(e.target.value)} ></input>
        <Button>Add</Button>
      </form>)}
    </div>
  )
}

function FormSplitBill(){
  return(
      <form className="form-split-bill">
        <h2>SPLIT A BILL WITH NAME</h2>
        <label>📄Bill Value</label>
        <input type="text"></input>
        <label>🕴Your expense</label>
        <input type="text"></input>
        <label>🕺Name's expense</label>
        <input type="text" disabled></input>
        <label>😜Who's paying the bill ?</label>
        <select>
          <option>You</option>
          <option>Name</option>
        </select>
        <Button>Split bill</Button>
      </form>
  )
}
