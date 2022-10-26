import React, { useState, useEffect } from 'react';
import './App.css';
import Post from './Post';
// import { collection, getDocs, doc, onSnapshot } from "@firebase/firestore";
import { db, auth } from './firebase';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Input from '@mui/material/Input';
import ImageUpload from './ImageUpload';
// import { IGEmbed } from 'react-ig-embed';
// import { makeStyles } from '@material-ui/core/styles';
// import Modal from '@material-ui/core/Modal';

// function getModalStyle() {
//   const top = 50;
//   const left = 50;

//   return {
//     top: `${top}%`,
//     left: `${left}%`,
//     transform: `translate(-${top}%, -${left}%)`,
//   };
// }

// const useStyles = makeStyles((theme) => ({
//   paper: {
//     position: 'absolute',
//     width: 400,
//     backgroundColor: theme.palette.background.paper,
//     border: '2px solid #000',
//     boxShadow: theme.shadows[5],
//     padding: theme.spacing(2, 4, 3),
//   },
// }));


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

function App() {
  // const classes = useStyles();
  // const [modalStyle] = React.useState(getModalStyle);
  const [posts, setPosts] = useState([]);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [openSignIn, setOpenSignIn] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [user, setUser] = useState(null);


  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
      //  user has logged in..
        console.log(authUser);
        setUser(authUser);
      } else {
      //  user has logged out..
        setUser(null);
      }
    });

    return () => {
      // if the useEffect fires again then perform some cleanup actions ..
      unsubscribe();
    };

  }, [user,username]);

  // const [open, setOpen] = useState(false);

  //  {
  //   username:"cleverqazi",
  //    caption:"wow it works", 
  //    imageUrl:"https://reactjs.org/logo-og.png"
  //  },
  //  {
  //   username:"nitin",
  //   caption:"here we go", 
  //   imageUrl:"https://static.toiimg.com/thumb/msid-87782984,imgsize-65975,width-400,resizemode-4/87782984.jpg"
  //  },
  //  {
  //   username:"kunal",
  //   caption:"this going to be a fun project", 
  //   imageUrl:"https://images.indianexpress.com/2022/01/V-instagram-post-17-M-likes.jpg"
  //  }

  

// useEffect -> runs the peice if code based in specific condition


  useEffect(() => {
    
  // this is where the code runs 
   db.collection('posts').orderBy('timestamp', 'desc').onSnapshot(snapshot => {
      setPosts(snapshot.docs.map(doc => ({
        id: doc.id,
        post: doc.data()})));
   })
  //  every time a new post is added , this code just fires...
  }, []);
  
  // const handleClose = () => {
  //  setOpen(false);
  // };

  const signUp = (event) => {
     event.preventDefault();

     auth
      .createUserWithEmailAndPassword(email, password)
      .then((authUser) => {
       return authUser.user.updateProfile({
          displayName: username
        })
      })
      .catch((error) => alert(error.message));
     
      setOpen(false);
  }

  const signIn = (event) => { 
    event.preventDefault();
    auth
      .signInWithEmailAndPassword(email, password)
      .catch((error) => alert(error.message));

    setOpenSignIn(false);
  };

  return (
    <div className="app">
      {/* <h1>hey there iam bulding instagram clone today 🚀</h1> */}

      

      
      
      <Modal
        open={open}
        onClose={handleClose}
      
      >
        <Box sx={style}>
           
          <form className="app__signup">
          <center>
          
          <img 
          className="app__headerImage"
          src="https://www.instagram.com/static/images/web/mobile_nav_type_logo-2x.png/1b47f9d0e595.png"
          alt=""
         />
         </center>
         <Input
              type="text"
              placeholder="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <Input
              placeholder="email"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              placeholder="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
             <Button type="submit" onClick={signUp}>Sign up</Button>
             </form>
        </Box>
      </Modal>


      <Modal
        open={openSignIn}
        onClose={() => setOpenSignIn(false)}
      
      >
        <Box sx={style}>
           
          <form className="app__signup">
          <center>
          
          <img 
          className="app__headerImage"
          src="https://www.instagram.com/static/images/web/mobile_nav_type_logo-2x.png/1b47f9d0e595.png"
          alt=""
         />
         </center>
            <Input
              placeholder="email"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              placeholder="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
             <Button type="submit" onClick={signIn}>Sign In</Button>
             </form>
        </Box>
      </Modal>
     
     
      {/* <Modal
        open={open}
        onClose={handleClose}
        
      >
        <div style={modalStyle} className={classes.paper}>
      <h2> iam a modal</h2>
        </div>
      </Modal> */}

   <div className="app__header">
   <img 
   className="app__headerImage"
    src="https://www.instagram.com/static/images/web/mobile_nav_type_logo-2x.png/1b47f9d0e595.png"
    alt=""
   />
    {user ? (
         <Button onClick={() => auth.signOut()}>Logout</Button>
      ) : (
        <div className="app__loginContainer">
         <Button onClick={() => setOpenSignIn(true)}>Sign In</Button>
         <Button onClick={handleOpen}>Sign up</Button>
        </div>
        
      )}
   </div>
  
     <div className="app__posts">
   <div className="app__postsLeft">

   {
    posts.map(({id, post}) =>(
      <Post key={id} postId={id} user={user} username={post.username} caption={post.caption} imageUrl={post.imageUrl}/>
    ))
  }

   </div>
  

     </div>
  
     
  {/* <InstagramEmbed url="https://www.instagram.com/p/CUbHfhpswxt/" width={328} /> */}

  {/* <IGEmbed
  clientAccessToken='<appId>|<clientToken>'
  url='https://instagr.am/p/Zw9o4/'
  maxWidth={375}
  hideCaption={false}
  containerTagName='div'
  injectScript
  protocol=''
  onLoading={() => {}}
  onSuccess={() => {}}
  onAfterRender={() => {}}
  onFailure={() => {}}
/> */}

 

  
  {/* <Post username="cleverqazi" caption="wow it works" imageUrl="https://reactjs.org/logo-og.png"/>
  <Post username="nitin" caption="here we go" imageUrl="https://static.toiimg.com/thumb/msid-87782984,imgsize-65975,width-400,resizemode-4/87782984.jpg"/>
  <Post username="kunal" caption="this going to be a fun project" imageUrl="https://images.indianexpress.com/2022/01/V-instagram-post-17-M-likes.jpg"/> */}
   
   {user?.displayName ? (
       <ImageUpload username={user.displayName} />
      ) : (
        <h3>Sorry you need to login to upload</h3>
      )}
   
    </div>
  );
}

export default App;
