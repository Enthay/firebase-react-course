
import { Auth } from './components/Auth';
import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from 'firebase/firestore';
import { db, auth, storage } from './config/firebase';
import { useEffect, useState } from 'react';
import { ref, uploadBytes } from 'firebase/storage';

function App() {
  
  const [movieList, setMovieList] = useState([])

  // new movie states
  const [newMovieTitle, setNewMovieTitle] = useState("");
  const [newMovieReleaseDate, setNewMovieReleaseDate] = useState(0);
  const [newMovieOscarStat, setNewMovieOscarStat] = useState(false)

  // title update state
  const [updatedTitle, setUpdatedTitle] = useState("");

  // file upload state
  const [fileUpload, setFileUpload] = useState(null)

  const movieCollectionRef = collection(db, "movies")

  const getMovieList = async () => {
    // READ THE DATA
    try{
      const data = await getDocs(movieCollectionRef);
      const filteredData = data.docs.map((doc) => ({...doc.data(), id: doc.id}))
      setMovieList(filteredData);
    } catch (err) {
      console.error(err)
    }
  }
   
  const deleteMovie = async (id) => {
    try{
      const movieDoc = doc(db, 'movies', id);
     await deleteDoc(movieDoc);
    } catch (err) {
      console.error(err)
    }
  }

  const updateMovieTitle = async (id) => {
    try{
      const movieDoc = doc(db, 'movies', id);
     await updateDoc(movieDoc, {title: updatedTitle});
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    
    getMovieList();
  }, []);

  const movieSubmit = async () => {
    try {
      await addDoc(movieCollectionRef, {
        title: newMovieTitle,
        releaseDate: newMovieReleaseDate,
        wonOscar: newMovieOscarStat,
        userId: auth?.currentUser?.uid
      });
      getMovieList();
    } catch (err) {
      console.error(err);
    }
  }

  const uploadFile = async () => {
    if (!fileUpload) return;
    const filesFolderRef = ref(storage, `projectFiles/${fileUpload.name}`);
    try {
      await uploadBytes(filesFolderRef, fileUpload)
      console.log('file uploaded succesfully')
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className="App">
      <h1>firebase course</h1>

      <Auth />
      <div>
        <input
         type="text"
         placeholder='movie title...'
         onChange={(e) => setNewMovieTitle(e.target.value)}
         required 
        />
        <input
         type="number" 
         placeholder='release date'
         onChange={(e) => setNewMovieReleaseDate(e.target.value)}
         required
        />
        <input
         type="checkbox" 
         name="oscar"
         checked={newMovieOscarStat}
         onChange={(e) => setNewMovieOscarStat(e.target.checked)}
        />
        <label htmlFor="oscar">Recieved an Oscar</label>
        <button onClick={movieSubmit}>Submit Movie</button>
      </div>
      <div>
        {movieList.map((movie) => (
          <div key={movie.id}>
            <h1 style={{color: movie.wonOscar ? "green" : "red"}}>{movie.title}</h1>
            <p>Date: {movie.releaseDate}</p>
            <button onClick={() => deleteMovie(movie.id)}>delete this movie</button>
            <input type="text" placeholder='new title' onChange={(e) => setUpdatedTitle(e.target.value)} />
            <button onClick={() => updateMovieTitle(movie.id)}>update title</button>
          </div>
        ))}
      </div>
      <div>
        <h1>storage</h1>
        <input type="file" onChange={(e) => setFileUpload(e.target.files[0])} />
        <button onClick={uploadFile}>upload file</button>
      </div>
    </div>
  );
}

export default App;
