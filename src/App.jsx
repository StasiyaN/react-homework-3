import { useState } from "react"

function Counter() {
  const [count, setCount] = useState(0)

  function increase() {
    setCount((prevState) => prevState + 1)
  }

  function decrease() {
    setCount((prevState) => (prevState > 0 ? prevState - 1 : 0))
  }

  return (
      <div>
        <button onClick={decrease}>-</button>
        <span> Счёт: {count} </span>
        <button onClick={increase}>+</button>

        {count === 0 && (
            <p style={{ color: "red" }}>
              пожалуйста, измените количество, оно не может быть равно 0
            </p>
        )}
      </div>
  )
}

function PostFinder() {
  const [postId, setPostId] = useState("")
  const [post, setPost] = useState(null)
  const [error, setError] = useState("")

  const getPost = async () => {
    setError("")
    setPost(null)

    try {
      const response = await fetch(
          `https://jsonplaceholder.typicode.com/posts/${postId}`
      )
      if (!response.ok) {
        throw new Error("Пост не найден")
      }
      const data = await response.json()
      setPost(data)
    } catch (err) {
      setError(err.message)
    }
  }

  return (
      <div>
        <input
            type="number"
            value={postId}
            onChange={(e) => setPostId(e.target.value)}
            placeholder="Введите id поста"
        />
        <button onClick={getPost}>Получить пост</button>

        {error && <p style={{ color: "red" }}>{error}</p>}

        {post && (
            <div>
              <h2>{post.title}</h2>
              <p>{post.body}</p>
            </div>
        )}
      </div>
  )
}

function App() {
  return (
      <div>
        <h1>Homework 3</h1>
        <Counter />
        <PostFinder />
      </div>
  )
}

export default App