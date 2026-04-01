import { useEffect, useState } from "react"
import {data, useParams} from 'react-router'

const PostDetail = () =>{

    const {id} = useParams()
    const [post, setPost] = useState(null)


    useEffect(()=>{
        fetch(`http://localhost:3000/post/${id}`)
        .then(res => res.json())
        .then(data => setPost(data))
    }, [id])

    if(!post) return <div> Carregando...</div>


    return(
        <div className='p-4'>
            <h1 className='text-xl font-bold'>{post.title}</h1>
            <h2>{post.views}</h2>
            <p>{post.description}</p>
        </div>
    )
}

export default PostDetail