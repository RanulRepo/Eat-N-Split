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

// -----------------------------------FriendList-----------------------------------------------

function FriendList({list}){

  const [friends, setFriends ] = useState(list);

  console.log(friends);

  const [openFriend,setOpenFriend] = useState(false);
  const [openBill,SetOpenBill] = useState(true);

  function openNewFriend(){
    openFriend ? setOpenFriend(false) : setOpenFriend(true);
  }

  function openSplitBill(){
    openBill ? SetOpenBill(false) : SetOpenBill(true);
  }

  function addNewFriend(friend){
    setFriends((friends)=> [...friends, friend]);
    setOpenFriend(false);
  }

  return(
    <div className="app">
      <ul className="sidebar">
        {friends.map((friends)=> <Friend friend = {friends} key={friends.id} openBill={openSplitBill} />)}
        {!openFriend && (
        <li>
          <Button onclick={openNewFriend} >Add friend</Button>
        </li>
        )}
        <>
        <AddFriend openFriend={openFriend} addNewFriend={addNewFriend}/>
        {openFriend && (<li><Button onclick={openNewFriend} >Close</Button></li>)}
        </>
      </ul>
      {openBill && <FormSplitBill />}
    </div>
  );
}

// ---------------------------------------Friend-------------------------------------------

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

// -------------------------------------Button---------------------------------------------

function Button({onclick, children}){
  return (
    <button className="button" onClick={onclick} >{children}</button>
  )
}

// --------------------------------------AddFriend--------------------------------------------

function AddFriend({openFriend, addNewFriend}){
  const [name, setName] = useState('');
  const [image, setImage] = useState("https://i.pravatar.cc/48");
  

  function handleSubmit(e){
    e.preventDefault();

    if(!name || !image) return;

    const id = crypto.randomUUID();
    const newFriend = {
      id,
      name,
      image: `${image}?=${id}`,
      balance: 0,
    }
    addNewFriend(newFriend);
    setName('');
    setImage("https://i.pravatar.cc/48");
  }

  return(
    <div>
    {openFriend && (
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

// --------------------------------------FormSplitBill--------------------------------------------

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
