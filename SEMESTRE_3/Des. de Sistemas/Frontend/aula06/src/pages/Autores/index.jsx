import { useEffect, useState } from "react"
import { Link } from "react-router"


const Autores = () => {

    const [posts, setPosts] = useState([])

    useEffect(() => {
        fetch("http://localhost:3000/autores")
            .then(res => res.json())
            .then(data => {
                setPosts(data)
            })
    }, [])

    return (
        <>
            <div className="flex flex-wrap gap-2 px-2 py-2">
                {
                    posts.map(post => (
                        <div key={post.id} className="bg-gray-900 text-white rounded-2xl overflow-hidden w-72 shadow-lg hover:scale-105 transition duration-300">
                            <div className="relative">

                                <img src={post.foto} alt={post.nome} className="w-full aspect-[4/3] object-cover opacity-80"/>

                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                                <h2 className="absolute bottom-2 left-3 text-lg font-bold">{post.nome}</h2>

                            </div>

                            <div className="p-4 flex flex-col gap-2">

                                <h3 className="text-sm text-gray-300">{post.descricao}</h3>
                                <p className="text-xs text-gray-400">Nascimento: {post.cidade}</p>

                                <Link to={`/post/${post.id}`} className="mt-2 bg-white text-gray-900 text-sm px-3 py-1 rounded-lg text-center font-semibold hover:bg-gray-200 transition">
                                    Ver mais....
                                </Link>
                            </div>
                        </div>
                    )
                    )
                }
            </div>
        </>
    )
}

export default Autores