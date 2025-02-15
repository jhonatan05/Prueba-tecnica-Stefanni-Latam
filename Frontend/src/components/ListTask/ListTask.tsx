import React, { useEffect, useState } from 'react'
import Task from '../task/Task'
import { useNavigate } from 'react-router-dom'
import './ListTask.scss'

const ListTask = (): any => {
  const navigate = useNavigate()
  const [task, setTask] = useState([])

  useEffect(() => {
    const listTask = fetch(`http://localhost:8080/tasks`)
    listTask.then((resp) => {
      resp.json().then((data) => {
        setTask(data)
      })
    })
  }, [])

  const handleClick = (id: number) => {
    const listTask = fetch(`http://localhost:8080/task/${id}`, { method: 'DELETE' })
    listTask.then((resp) => {
      resp.json().then((data) => {
        setTask(data)
      })
    })

    navigate('/')
  }

  return (
    <div className="list-task">
      <div className="list-task__colums">
        <span>Id</span>
        <span>Titulo</span>
        <span>Descripcion</span>
        <span>Fecha Creación</span>
        <span>Eliminar</span>
      </div>
      <div className="scroll-container">
        {task.map((list) => {
          const { id, title, description, createdAt } = list
          return (
            <Task title={title} id={id} description={description} createdAt={createdAt} handleclick={handleClick} />
          )
        })}
      </div>
    </div>
  )
}

export default ListTask
