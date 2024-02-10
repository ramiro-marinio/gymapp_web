import { React, useState, useEffect } from 'react';
import Article from './components/article';
import Loading from '../../general/loading';

function HomePage(){
  // const context = useContext(FirebaseContext);
  const [loading,setLoading] = useState(true);
  const [data,setData] = useState([]);
  useEffect(()=>{
    if(loading){
      fetch('https://getlocalnews-e2zma6cdba-uc.a.run.app?language=en',).then((response)=>{
        return response.json();
      }).then(data=>{
        setLoading(false);
        setData(data['data']);
      })
    }
  },[loading]);
  if(loading){
    return <Loading/>
  }
  return (
    <div>
      <h1 align="center">Welcome to TrainGuru</h1>
      {data.map((article)=>{
        return <Article key={Math.random().toString()} article={article}/>
      })}
    </div>
  )
}

export default HomePage