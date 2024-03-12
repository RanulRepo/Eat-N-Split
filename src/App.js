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
  const [selectedFriend,setSelectedFriend] = useState(null);

  function openNewFriend(){
    openFriend ? setOpenFriend(false) : setOpenFriend(true);
  }

  function handleSelection(friend){
    setSelectedFriend((cur) => cur?.id === friend.id ? null : friend);
    setOpenFriend(false);
  }

  function addNewFriend(friend){
    setFriends((friends)=> [...friends, friend]);
    setOpenFriend(false);
  }

  function handleSplitBill(value){
    setFriends((friends)=> friends.map(friend => friend.id === selectedFriend.id ? {...friend, balance: friend.balance + value} : friend));

    setSelectedFriend(null);

  }

  return(
    <div className="app">
      <ul className="sidebar">
        {friends.map((friends)=> <Friend friend = {friends} key={friends.id} onSelection={handleSelection} selectedFriend={selectedFriend} />)}
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
      {selectedFriend && <FormSplitBill selectedFriend={selectedFriend} onSplitBill={handleSplitBill} />}
    </div>
  );
}

// ---------------------------------------Friend-------------------------------------------

function Friend({friend,onSelection, selectedFriend}){
  const isSelected = selectedFriend?.id === friend.id;
  return(
    <ul >
    <li className={isSelected ? "selected" : ""} >
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
      <Button onclick={()=> onSelection(friend)} >{isSelected ? "Close" : "Select"}</Button>
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

function FormSplitBill({selectedFriend, onSplitBill}){
  const [bill, setBill] = useState("");
  const [paidByUser, setPaidByUser] = useState("");
  const paidByFriend = bill ? bill - paidByUser : "";
  const [whoIsPaying, setWhoIsPaying] = useState("user");

  console.log(bill + paidByUser);

  function handleSubmit(e){
    e.preventDefault();

    if (!bill || !paidByUser) return;

    onSplitBill(whoIsPaying === 'user' ? paidByFriend : -paidByUser);
  }

  return(
      <form className="form-split-bill" onSubmit={handleSubmit} >
        <h2>SPLIT A BILL WITH {selectedFriend.name}</h2>
        <label>📄Bill Value</label>
        <input type="text" value={bill} onChange={(e)=>setBill(Number(e.target.value))} ></input>
        <label>🕴Your expense</label>
        <input type="text" value={paidByUser} onChange={(e)=>setPaidByUser(Number(e.target.value) > bill ? paidByUser : Number(e.target.value))} ></input>
        <label>🕺{selectedFriend.name}'s expense</label>
        <input type="text" disabled value={paidByFriend} ></input>
        <label>😜Who's paying the bill ?</label>
        <select value={whoIsPaying} onChange={(e)=>setWhoIsPaying(e.target.value)}>
          <option value="user">You</option>
          <option value="friend">{selectedFriend.name}</option>
        </select>
        <Button>Split bill</Button>
      </form>
  )
}
